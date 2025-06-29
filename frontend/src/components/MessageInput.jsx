import { useRef, useState } from "react";
import { useChatStore } from '../stateStore/chatStore';
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 border-t border-[#49d19c] bg-[#1e3c2f]">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-[#49d19c]"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#2f5b44] border border-[#49d19c] text-white flex items-center justify-center shadow"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex justify-between items-centre  gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 bg-[#2f5b44] border border-[#49d19c] text-[#a3f5c9] rounded-xl hover:bg-[#3b6651] transition shadow-md"
          title="Attach a file"
        >
          <Image size={18} />
        </button>

        {/* Message Input */}
        <textarea
          placeholder="Type a message..."
          rows={1}
          className="flex-1 px-4 py-2 rounded-xl bg-[#2f5b44] text-[#e6ffe4] border border-[#49d19c] focus:outline-none focus:ring-2 focus:ring-[#49d19c] resize-none shadow-md placeholder:text-[#a3f5c9] placeholder:italic"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 bg-[#49d19c] text-[#1e3c2f] rounded-xl font-semibold hover:bg-[#3cbf8f] transition-all shadow-md disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
