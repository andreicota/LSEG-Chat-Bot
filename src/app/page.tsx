import "./page.scss";

import ChatContainer from "@/app/components/ChatContainer/ChatContainer";
import ChatBanner from "@/app/components/ChatBanner/ChatBanner";
import ChatInput from "@/app/components/ChatInput/ChatInput";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <div className='page'>
      <main className='main'>
        <div className='main__chat'>
          <ChatBanner />
          <ChatContainer />
          <ChatInput />
        </div>
      </main>
      <Footer />
    </div>
  );
}
