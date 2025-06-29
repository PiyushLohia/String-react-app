import React, { useState } from "react";
import { authStore } from "../stateStore/authStore";
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = authStore();

  const validateForm = () => {
    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!fullName) {
      toast.error("Full name required");
      return false;
    }
    if (!email) {
      toast.error("Email required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid Email Format");
      return false;
    }
    if (!password) {
      toast.error("Password required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    await signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2f] to-[#264d36] px-4">
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl bg-[#1b3529] shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-center text-[#b4f0a7] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create your account
        </motion.h2>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="text-[#b4f0a7] block mb-1 font-semibold">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 -translate-y-1/2 text-[#b4f0a7]" />
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-transparent text-[#b4f0a7] placeholder-[#b4f0a7] border border-[#49d19c] focus:ring-2 focus:ring-[#49d19c] outline-none transition"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label className="text-[#b4f0a7] block mb-1 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-[#b4f0a7]" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 rounded-md placeholder-[#b4f0a7] bg-transparent text-[#b4f0a7] border border-[#49d19c] focus:ring-2 focus:ring-[#49d19c] outline-none transition"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label className="text-[#b4f0a7] block mb-1 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#b4f0a7]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-md placeholder-[#b4f0a7] bg-transparent text-[#b4f0a7] border border-[#49d19c] focus:ring-2 focus:ring-[#49d19c] outline-none transition"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#b4f0a7] hover:opacity-80 transition"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full bg-[#49d19c] hover:bg-[#3cb78b] text-white py-2 rounded-md font-semibold transition duration-200 flex items-center justify-center"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </motion.form>

        <motion.div 
          className="flex justify-center items-center text-[#90e8ad] py-2 gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span>Already have an account?</span>
          <Link to='/login' className="text-blue-400 underline">Login</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
