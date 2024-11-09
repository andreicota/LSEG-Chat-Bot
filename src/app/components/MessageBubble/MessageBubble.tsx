import "./messageBubble.scss";
import { Option } from "@/app/utils/types";
import Logo from "@/app/assets/chatbot-icon.svg";

const MessageBubble = ({
  isAnswer = false,
  title,
  options,
  handleMessageClick,
}: {
  isAnswer?: boolean;
  title: string;
  options?: Option[];
  handleMessageClick: (option: Option) => void;
}) => {
  return (
    <div className='bubble'>
      {!isAnswer && <Logo />}
      <div
        className={`bubble__container ${
          isAnswer && "bubble__container--answer"
        }`}
      >
        <div className='bubble__container--message'>{title}</div>
        {options?.map((option) => (
          <div
            key={option.code}
            className='bubble__container--option'
            onClick={(e) => {
              e.preventDefault();
              handleMessageClick(option);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBubble;
