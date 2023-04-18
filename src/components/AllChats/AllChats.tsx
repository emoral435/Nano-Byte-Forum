import { useState, useEffect, useContext } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { ChatContext } from "../../context/ChatContext";

const AllChats = () => {
    const [chats, setChats] = useState<any>([])
    const {currentUser} = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            });
    
            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])


    const handleSelect = (u:any) => {
        dispatch({ type: "CHANGE_USER", payload: u });
      };

  return (
    <div className="flex flex-col justify-around items-center gap-8">
        <div>All Chats</div>
        {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) :any => (
            <motion.div className="flex w-full justify-center gap-8 hover:bg-[#4c646e] hover:rounded-md py-4" key={chat[0]}
             onClick={() => handleSelect(chat[1].userInfo)}>
                {chat[1].userInfo.photoURL && <motion.img src={chat[1].userInfo.photoURL} className="rounded-full"></motion.img>}
                <div className="flex flex-col justify-center items-center">
                    <div>{chat[1].userInfo.displayName}</div>
                    {chat[1].lastMessage?.text.length > 20 && <div>Click Me</div>}
                    {chat[1].lastMessage?.text.length < 20 && <div>{chat[1].lastMessage?.text}</div>}
                </div>
            </motion.div>
        ))}
    </div>
  )
}

export default AllChats