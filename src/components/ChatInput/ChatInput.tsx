import React, { useState } from 'react'
import attach from '/src/assets/attach.svg'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { db, storage } from '../../firebase/firebase-config'
import { Timestamp, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'

const ChatInput = () => {
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        if (img) {

            const storageRef = ref(storage, uuid())
            const uploadTask = uploadBytesResumable(storageRef, img)

            uploadTask.on(
                (error: any) => {
                  //TODO:Handle Error
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
                })
            })
        }
    }

  return (
    <div>
        <input type="text" placeholder='Send a text or image...' onChange={ e => setText(e.target.value) } />
        <div>
            <img src={attach} alt="" className='w-16 h-16' />
            <input type="file" style={{ display: "none" }} id='file' onChange={ e => setImg(e.target.files[0]) }/>
            <label htmlFor="file">
                <img src="" alt="" />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default ChatInput