'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Calendar } from 'lucide-react';
import { Match, UserPet } from '@/lib/mockData';

interface MatchCelebrationProps {
  match: Match | null;
  onClose: () => void;
  onSendMessage: () => void;
}

export function MatchCelebration({ match, onClose, onSendMessage }: MatchCelebrationProps) {
  if (!match) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#FF6B6B]/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-white"
      >
        <motion.div 
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="text-center w-full"
        >
          <h2 className="font-display text-5xl font-black italic tracking-tighter mb-2 text-[#FFD166]">
            It's a PawMatch!
          </h2>
          <p className="text-xl font-medium mb-10 opacity-90">
            You and {match.pet2.name}'s owner liked each other.
          </p>

          <div className="flex justify-center items-center gap-4 mb-12">
            <motion.div 
              initial={{ x: -50, rotate: -10 }}
              animate={{ x: 0, rotate: -5 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative relative w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-white"
            >
              <img src={match.pet1.photo} className="w-full h-full object-cover" alt={match.pet1.name} />
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-white rounded-full p-3 shadow-xl z-10 -mx-6"
            >
              <HeartIcon className="w-8 h-8 text-[#FF6B6B]" />
            </motion.div>

            <motion.div 
              initial={{ x: 50, rotate: 10 }}
              animate={{ x: 0, rotate: 5 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative w-32 h-32 rounded-full border-4 border-[#FFD166] overflow-hidden shadow-2xl bg-white"
            >
              <img src={match.pet2.photo} className="w-full h-full object-cover" alt={match.pet2.name} />
            </motion.div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onSendMessage}
              className="w-full bg-white text-[#FF6B6B] rounded-2xl py-4 font-bold text-lg shadow-lg hover:bg-gray-50 flex justify-center items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" /> Say Hello
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-transparent border-2 border-white/30 text-white rounded-2xl py-4 font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
