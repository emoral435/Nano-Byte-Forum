// import { Search } from "@mui/icons-material"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from '../../firebase/firebase-config';

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

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setTimeout(() => {console.log(user)}, 5000);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch()
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
            />
        </Search>
        {err && <span>User not found.</span>}
      {user &&  
        <div className='flex justify-center items-center gap-4'>
          <img src={user.photoURL} alt="" />
          <div>{user.displayName}</div>
        </div>}
      </div>
  )
}

const SearchChat = () => {
  return (
    <div className='h-full w-full p-4 flex flex-col gap-4'>
      <SearchInput />
      
      <div className='border border-white'></div>
    </div>
  )
}

export default SearchChat