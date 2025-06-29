import { useChatStore } from '../stateStore/chatStore';
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../components/Skeletons/MessageSkeletons";
import { authStore } from "../stateStore/authStore";
import { formatMessageTime } from "../lib/utils";
import defaultUserPic from "../assets/defaultUser.png";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = authStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className=" flex-1 flex flex-col overflow-auto bg-[#1e3c2f] text-[#b4f0a7]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-[#49d19c]/40">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isOwn = message.senderId === authUser._id;
            return (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`w-full flex ${isOwn ? "justify-end" : "justify-start"}`}
                ref={messageEndRef}
              >
                <div className={`flex ${isOwn ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}>
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border-2 border-[#49d19c] ring ring-offset-2 ring-[#264d36]">
                      <img
                        src={
                          isOwn
                            ? authUser.profilePic || defaultUserPic
                            : selectedUser.profilePic || defaultUserPic
                        }
                        alt="profile"
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="chat-header mb-1 text-xs text-[#90e8ad]">
                      <time className="opacity-50">
                        {formatMessageTime(message.createdAt)}
                      </time>
                    </div>

                    <div className="bg-[#2f5b44] text-[#e6ffe4] px-4 py-2 rounded-2xl shadow-md break-words whitespace-pre-wrap inline-block max-w-[80vw]">
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="rounded-lg mb-2 max-h-52 w-auto object-cover border border-[#49d19c]"
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
