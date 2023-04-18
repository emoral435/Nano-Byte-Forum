import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { lightFormat } from 'date-fns'

const Message = ({message} : any) => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const timestamp = lightFormat(new Date(message.date.seconds * 1000), "MM-dd")
  return (
    <div
      ref={ref}
      className={`w-full flex items-center gap-8 ${message?.senderId === currentUser?.uid && "flex-row-reverse"}`}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="" className='rounded-full h-20 w-20'
        />
        <span className='text-sm'>{timestamp}</span>
      </div>
      <div className="flex flex-col-reverse gap-4">
        <p className='w-full flex justify-center p-4 bg-[#1982FC] text-white text-lg rounded-full'>{message.text}</p>
        {message.img && <img src={message.img} alt="" className='h-32 w-32'/>}
      </div>
    </div>
  );

}

export default Message