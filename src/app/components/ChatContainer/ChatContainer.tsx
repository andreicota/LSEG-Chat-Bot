"use client";
import "./chatContainer.scss";
import MessageBubble from "@/app/components/MessageBubble/MessageBubble";
import mockData from "@/app/utils/Chatbot - stock data.json";
import {
  Chat,
  Exchange,
  Messages,
  NavigationCodes,
  Option,
} from "@/app/utils/types";
import { useEffect, useRef, useState } from "react";

const finalOptions = [
  { code: NavigationCodes.MENU, label: "Main menu" },
  { code: NavigationCodes.BACK, label: "Go Back" },
];

const defaultChat = [
  {
    title: Messages.EXCHANGE_SELECT,
    options: mockData?.map((exchange) => ({
      code: exchange.code,
      label: exchange.stockExchange,
    })),
    isAnswer: false,
  },
];

const ChatContainer = () => {
  const lastMessage = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExchange, setSelectedExchange] = useState<Exchange>();
  const [currentChat, setCurrentChat] = useState<Chat[]>([
    { title: Messages.WELCOME, options: [], isAnswer: false },
    ...defaultChat,
  ]);

  const handleMessageClick = (option: Option) => {
    const filteredExchange = mockData?.filter(
      (exchange) => exchange.code === option.code
    );
    switch (currentStep) {
      case 1:
        if (filteredExchange.length) {
          setCurrentChat((prev) => [
            ...prev,
            { title: option.label, options: [], isAnswer: true },
            {
              title: Messages.STOCK_SELECT,
              options: filteredExchange[0].topStocks.map((stock) => ({
                code: stock.code,
                label: stock.stockName,
              })),
              isAnswer: false,
            },
          ]);
          setSelectedExchange(filteredExchange[0]);
          setCurrentStep((prev) => prev + 1);
        }
        break;

      case 2:
        if (selectedExchange) {
          const filteredStock = selectedExchange.topStocks.filter(
            (stock) => stock.code === option.code
          );

          if (filteredStock.length) {
            setCurrentChat((prev) => [
              ...prev,
              { title: option.label, options: [], isAnswer: true },
              {
                title: Messages.STOCK_PRICE.replace(
                  "{{stock}}",
                  filteredStock[0].stockName
                ).replace("{{price}}", filteredStock[0].price.toString()),
                options: finalOptions,
                isAnswer: false,
              },
            ]);
            setCurrentStep((prev) => prev + 1);
          }
        }
        break;

      case 3:
        switch (option.code) {
          case NavigationCodes.MENU:
            setCurrentChat((prev) => [...prev, ...defaultChat]);
            setCurrentStep(1);
            break;
          case NavigationCodes.BACK:
            if (selectedExchange) {
              setCurrentChat((prev) => [
                ...prev,
                { title: option.label, options: [], isAnswer: true },
                {
                  title: Messages.STOCK_SELECT,
                  options: selectedExchange.topStocks.map((stock) => ({
                    code: stock.code,
                    label: stock.stockName,
                  })),
                  isAnswer: false,
                },
              ]);
              setCurrentStep((prev) => prev - 1);
            }
            break;
          default:
            break;
        }
        break;

      default:
        setCurrentChat((prev) => [
          ...prev,
          { title: Messages.ERROR, options: [], isAnswer: false },
          ...defaultChat,
        ]);
        break;
    }
  };

  useEffect(() => {
    if (lastMessage?.current) {
      lastMessage.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentChat?.length]);

  return (
    <div className='conversation'>
      {mockData?.length ? (
        currentChat.map((chat, index) => (
          <MessageBubble
            key={index}
            title={chat.title}
            isAnswer={chat.isAnswer}
            options={chat.options}
            handleMessageClick={handleMessageClick}
          />
        ))
      ) : (
        <p>No stock options found.</p>
      )}

      <div ref={lastMessage} />
    </div>
  );
};
export default ChatContainer;
