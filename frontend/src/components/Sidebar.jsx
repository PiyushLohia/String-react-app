import { useEffect, useState } from "react";
import { useChatStore } from "../stateStore/chatStore";
import { authStore } from "../stateStore/authStore";
import SidebarSkeleton from "../../src/components/Skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import defaultUserPic from "../assets/defaultUser.png";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading
  } = useChatStore();

  const { onlineUsers = [] } = authStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-[#49d19c] bg-gradient-to-b from-[#162c22] via-[#1e3c2f] to-[#1a3e2e] text-[#b4f0a7] flex flex-col transition-all duration-200 backdrop-blur-md shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#49d19c] w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-[#49d19c]" />
          <span className="font-semibold hidden lg:block text-lg">Contacts</span>
        </div>
        <div className=" hidden lg:flex items-center justify-between">
          <span className="text-xs text-[#90e8ad]">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto overflow-x-hidden w-full py-3 flex flex-col items-center justify-center scrollbar-thin scrollbar-thumb-[#49d19c]/60 scrollbar-track-transparent">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 mx-2 mb-2 rounded-xl transition-all
              ${
                selectedUser?._id === user._id
                  ? "bg-[#264d36]/80 ring-2 ring-[#49d19c] scale-[1.02]"
                  : "hover:bg-[#2f5b44]/60 hover:scale-[1.01]"
              }
              duration-200 ease-in-out
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || defaultUserPic}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border border-[#49d19c] shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full ring-2 ring-[#1e3c2f] animate-ping" />
              )}
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-[#1e3c2f]" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-[#e0ffe0]">{user.fullName}</div>
              <div className="text-sm text-[#90e8ad]">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-[#90e8ad] py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
