'use client';

import { useState } from 'react';
import { PawPrint, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onLogin: (email: string) => void;
}

export function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onLogin(email);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#FFF9F2] p-6 text-[#2D3436]">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-[#FF6B6B] shadow-lg"
      >
        <PawPrint className="w-12 h-12 text-white" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold mb-2 text-[#FF6B6B] tracking-tight"
      >
        PawDate
      </motion.h1>
      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[#636E72] mb-10 text-center text-lg"
      >
        Find the perfect playdate for your furry best friend.
      </motion.p>

      <motion.form 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit} 
        className="w-full max-w-sm space-y-4"
      >
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-transparent transition-shadow"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-transparent transition-shadow"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-[#FF6B6B] text-white rounded-2xl py-4 font-semibold text-lg shadow-md hover:bg-[#ff5252] transition-colors mt-4"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </motion.form>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <button 
          type="button" 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-[#636E72] hover:text-[#FF6B6B] transition-colors"
        >
          {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </motion.div>
    </div>
  );
}
