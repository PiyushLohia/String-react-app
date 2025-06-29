import React from 'react';
import Sidebar from '../components/Sidebar';
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from '../stateStore/chatStore';

const HomePage = () => {
  const { selectedUser } = useChatStore(); 

  return (
    <div className="h-screen bg-[#1e3c2f] ">
      <div className="flex h-screen items-center justify-center relative ">
        <div className=" bg-base-100 rounded-lg shadow-cl top- w-full max-w-screen h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
