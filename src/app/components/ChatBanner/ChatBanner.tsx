import "./chatBanner.scss";
import Logo from "@/app/assets/chatbot-icon.svg";

const ChatBanner = () => {
  return (
    <div className='chatBanner'>
      <Logo />
      <span>LSEG chatbot</span>
    </div>
  );
};

export default ChatBanner;
