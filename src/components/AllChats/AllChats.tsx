import { useState, useEffect, useContext } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const AllChats = () => {
    const [chats, setChats] = useState<any>([])
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
                console.log(chats)
            });
    
            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])

    console.log(Object.entries(chats))

  return (
    <div className="flex flex-col justify-center items-center gap-2">
        <div>All Chats</div>
        {Object.entries(chats)?.map((chat): any => {
            <motion.div whileHover={{scale: 1.2}} className="flex w-full justify-start gap-2" key={chat[0]} onClick={console.log(chat[1])}>
                <motion.img src={chat[1].userInfo.photoURL}></motion.img>
                <div className="flex">
                    <div>{chat[1].userInfo.displayName}</div>
                    <div>{chat[1].userInfo.lastMessage?.text}</div>
                </div>
            </motion.div>
        })}
        <div>what</div>
    </div>
  )
}

export default AllChats