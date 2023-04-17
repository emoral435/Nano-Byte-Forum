import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Messages from "../Messages/Messages";
import ChatInput from "../ChatInput/ChatInput";


const ShowChat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className="flex flex-col">
      <header className=" min-h-[4.55rem] bg-[#78909b]">
        {data.user?.displayName}
      </header>
      <Messages />
      <ChatInput />
    </div>
  )
}

export default ShowChat