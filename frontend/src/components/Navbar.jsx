import { Link } from "react-router-dom";
import { authStore } from "../stateStore/authStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { authUser, logout } = authStore();

  return (
    <motion.header
      className="bg-gradient-to-br from-[#1e3c2f] to-[#264d36] text-[#b4f0a7] border-b border-[#49d19c] fixed w-full top-0 z-40 backdrop-blur-lg backdrop-saturate-150"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="container mx-auto px-4 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <motion.div
            className="flex items-center gap-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <MessageSquare className="text-[#49d19c] w-6 h-6" />
              <h1 className="text-3xl font-bold text-[#b4f0a7]">String</h1>
            </Link>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/settings"
              className="flex items-center px-2 py-2 rounded-md bg-transparent hover:bg-[#3cb78b]/20 hover:shadow-md text-[#b4f0a7] text-sm font-medium transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-2 py-2 rounded-md bg-transparent hover:bg-[#3cb78b]/20 hover:shadow-md text-[#b4f0a7] text-sm font-medium transition-all duration-200"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <motion.button
                  onClick={logout}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center  px-2 py-2 rounded-lg bg-transparent hover:bg-[#3cb78b]/20 hover:shadow-md text-[#b4f0a7] text-sm font-semibold transition-all duration-200"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
