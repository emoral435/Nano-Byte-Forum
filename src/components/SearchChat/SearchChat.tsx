// import { Search } from "@mui/icons-material"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { collection, query, where, getDoc, getDocs, DocumentData, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase/firebase-config';
import { auth } from '../../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import AllChats from '../AllChats/AllChats';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const SearchInput = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<DocumentData | null>(null)
  const [err, setErr] = useState(false)


  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setUser(null);
      setErr(true);
    } else {
      querySnapshot.forEach((doc) => {
        setErr(false)
        setUser(doc.data());
      })
    }
    
  };

  const handleKey = (e: any) => {
    if (username == "") {
      setUser(null);
    } else {
      e.code === "Enter" && handleSearch();
    }
  };
  
  const handleSelect = async () => {
    // check if the chat between the user and the selected user is already made, else create a new one
    onAuthStateChanged(auth, async (currentUser) => {
      const combinedId = currentUser!.uid > user!.uid 
        ? currentUser!.uid + user!.uid 
        : user!.uid + currentUser!.uid;
      const res = await getDoc(doc(db, "chats", combinedId))
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser!.uid), {
          [combinedId + ".userInfo"]: {
            uid: user!.uid,
            displayName: user!.displayName,
            photoURL: user!.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user!.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser!.uid,
            displayName: currentUser!.displayName,
            photoURL: currentUser!.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      setUser(null)
      setUsername("")
    })
  }

  return (  
      <div className='flex flex-col gap-4'>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              sx={{width: "100%"}}
            />
        </Search>
        {err && <span className='flex justify-center w-full h-full p-2'>User not found. Use email or display name.</span>}
        {user &&  
          <div className='flex justify-center items-center gap-4 mt-0.5 h-full w-full p-2 hover:bg-[#4c646e]' onClick={handleSelect}>
            <div>{user.displayName}</div>
            <img src={user.photoURL} alt="" className='w-20 h-20 rounded-full'/>
          </div>}
      </div>
  )
}

const SearchChat = () => {
  return (
    <div className='h-full w-full p-4 flex flex-col gap-4'>
      <SearchInput />
      <div className='border border-white'></div>
      <AllChats />
    </div>
  )
}

export default SearchChat
