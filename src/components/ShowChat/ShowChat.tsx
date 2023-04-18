import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import Messages from "../Messages/Messages";
import ChatInput from "../ChatInput/ChatInput";


const ShowChat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className="flex flex-col h-full">
      <header className="basis-[10%] bg-[#78909b] text-2xl text-white flex justify-center items-center">
        {data.user?.displayName}
      </header>
      <div className="md:basis-[80%] md:h-full h-[60vh] overflow-scroll scroll-m-1 bg-[#cccccc] ">
        <Messages />
      </div>
      <ChatInput />
    </div>
  )
}

export default ShowChat