import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#1e3c2f] text-[#b4f0a7]">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#2f5b44] border border-[#49d19c] flex items-center justify-center animate-bounce shadow-lg">
            <MessageSquare className="w-8 h-8 text-[#49d19c]" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to String!</h2>
        <p className="text-[#a3f5c9]/70">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
