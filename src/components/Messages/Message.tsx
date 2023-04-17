import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Message = ({message}) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)



  return (
    <div>
        {/* <div>
            <img src={} alt="" />
            <span>{}</span>
        </div>
        <div>
            <h3>{}</h3>
            <img src={} alt="" />
        </div> */}
    </div>
  )
}

export default Message