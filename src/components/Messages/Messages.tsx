import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import Message from './Message'

const Messages = () => {
    const [messages, setMessages] = useState<any>([])
    const {data} = useContext(ChatContext)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub()
        }
    }, [data.chatId])

  return (
    <div>
        {messages.map( (m: any) => {
           <Message message={m} key={m.id}/> 
        })}
    </div>
  )
}

export default Messages