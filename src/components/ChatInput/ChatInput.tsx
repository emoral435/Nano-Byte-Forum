import { useState } from 'react'
import attach from '/src/assets/attach.svg'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db, storage } from '../../firebase/firebase-config'
import { Timestamp, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Input } from '@mui/icons-material'
import TextField from '@mui/material/TextField';

const ChatInput = () => {
    const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.log(error.code)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };


  const handleSubmit = (e: any) => {
    if (e.code === "Enter") {
      handleSend()
    }
  }

    return (
        <div className="flex justify-between items-center p-6 basis-[10%]">
          <div className='flex gap-4 w-full items-center'>
              <Input />
              <TextField
              onKeyDown={handleSubmit}
              size='small' label='Enter a message...' variant='outlined' value={text} onChange={(e) => setText(e.target.value)} className='lg:w-[90%] w-[80%]'/>
          </div>
          <div className="flex gap-4">
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
              <img src={attach} alt="" className='h-10 w-10'/>
            </label>
            <button onClick={handleSend} className='text-lg'>Send</button>
          </div>
        </div>
      );
}

export default ChatInput