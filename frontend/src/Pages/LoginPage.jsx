import React, { useState } from 'react';
import { authStore } from '../stateStore/authStore';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isloggingIn } = authStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const email = formData.email.trim();
    const password = formData.password.trim();
    if (!email) return toast.error('Email required');
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error('Invalid Email Format');
    if (!password) return toast.error('Password required');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    const result = await login(formData);
    if (result?.success || authStore.getState().authUser) navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2f] to-[#264d36] px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-[#2e4d3d] border border-[#3b6f56]"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-center text-[#b4f0a7] mb-8"
        >
          Welcome back, explorer 🌿
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-[#b4f0a7] block mb-1 font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-[#b4f0a7]" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-transparent text-[#b4f0a7] placeholder-[#b4f0a7] border border-[#49d19c] focus:ring-2 focus:ring-[#49d19c] outline-none transition"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="text-[#b4f0a7] block mb-1 font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 -translate-y-1/2 text-[#b4f0a7]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-md bg-transparent text-[#b4f0a7] placeholder-[#b4f0a7] border border-[#49d19c] focus:ring-2 focus:ring-[#49d19c] outline-none transition"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#b4f0a7] hover:opacity-80 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            type="submit"
            className="w-full bg-[#49d19c] hover:bg-[#38b388] text-white py-2 rounded-md font-semibold transition duration-200 flex items-center justify-center"
            disabled={isloggingIn}
          >
            {isloggingIn ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} /> Logging In...
              </>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center items-center text-[#a0d8b6] py-2 gap-1"
        >
          <span>Don’t have an account?</span>
          <Link to="/signup" className="text-[#6de9b0] underline">Sign Up</Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
