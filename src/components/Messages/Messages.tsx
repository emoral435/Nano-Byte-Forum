import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'

const Messages = () => {
    const [messages, setMessages] = useState<any>([])
    const {data} = useContext(ChatContext)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data())
        })

        return () => {
            unsub()
        }
    }, [])

  return (
    <div>
        
    </div>
  )
}

export default Messages