import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase/firebase-config'
import Message from './Message'

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
  
    useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
  
      return () => {
        unSub();
      };
    }, [data.chatId]);
  
    return (
      <div className='messages'>
        {messages.map((m) => (
          <div className='m-8' key={m.id}>
              <Message message={m} />
          </div>
        ))}
      </div>
    );
  };

export default Messages