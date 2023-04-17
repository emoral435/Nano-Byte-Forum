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
                setTimeout(() => console.log(chats), 10)
            });
    
            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])

    console.log(Object.entries(chats))

    const handleSelect = (u:any) => {
        dispatch({ type: "CHANGE_USER", payload: u });
      };

  return (
    <div className="flex flex-col justify-around items-center gap-8">
        <div>All Chats</div>
        {Object.entries(chats)?.map((chat) :any => (
            <motion.div className="flex w-full justify-center gap-8 hover:bg-[#4c646e] py-4" key={chat[0]}
             onClick={() => handleSelect(chat[1].userInfo)}>
                <motion.img src={chat[1].userInfo.photoURL} className="rounded-full"></motion.img>
                <div className="flex justify-center items-center">
                    <div>{chat[1].userInfo.displayName}</div>
                    <div>{chat[1].userInfo.lastMessage?.text}</div>
                </div>
            </motion.div>
        ))}
    </div>
  )
}

export default AllChats