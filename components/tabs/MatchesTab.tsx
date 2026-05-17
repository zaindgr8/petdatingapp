'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Match } from '@/lib/mockData';

interface MatchesTabProps {
  matches: Match[];
  onOpenChat: (match: Match) => void;
}

export function MatchesTab({ matches, onOpenChat }: MatchesTabProps) {
  return (
    <div className="flex flex-col h-full bg-[#FFF9F2] pt-4">
      <div className="px-6 mb-4 shrink-0">
        <h2 className="text-2xl font-bold text-[#FF6B6B]">Your Matches</h2>
        <p className="text-sm text-[#636E72]">Start chatting to plan a playdate!</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 grayscale opacity-50">
            <h3 className="text-lg font-semibold text-[#2D3436]">No matches yet</h3>
            <p className="text-sm text-[#636E72]">Keep swiping to find new friends.</p>
          </div>
        ) : (
          matches.map((match, i) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onOpenChat(match)}
              className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="relative w-16 h-16 shrink-0">
                <img src={match.pet2.photo} alt={match.pet2.name} className="w-full h-full object-cover rounded-full border-2 border-[#FFD166]" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-[#FF6B6B] text-[10px]">🐾</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#2D3436] truncate">{match.pet2.name}</h4>
                <p className="text-sm text-[#636E72] truncate">Say hi to {match.pet2.name}!</p>
              </div>
              
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
