import React, { useState } from "react";
import { authStore } from "../stateStore/authStore";
import { Camera } from "lucide-react";
import defaultUserPic from "../assets/defaultUser.png";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = authStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file); 

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image); 
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2f] to-[#264d36] p-4">
      <motion.div
        className="bg-[#1b3529] p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <img
            src={selectedImage || authUser?.profilePic || defaultUserPic}
            alt="User"
            className="size-64 rounded-full object-cover border-4 border-[#49d19c]"
          />
          <label
            htmlFor="upload-avatar"
            className={`absolute bottom-2 right-2 bg-[#49d19c] p-2 rounded-full cursor-pointer transition-all duration-200
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
          >
            <Camera className="text-white size-4" />
            <input
              type="file"
              id="upload-avatar"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </motion.div>
         <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>

        <div className="flex flex-col justify-center items-center gap-5">
          <motion.h2
            className="text-[#b4f0a7] text-xl font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {authUser?.fullName || "Guest User"}
          </motion.h2>
          <motion.p
            className="text-[#90e8ad] text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {authUser?.email || "user@example.com"}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
