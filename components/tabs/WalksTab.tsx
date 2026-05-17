'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarHeart, MapPin, Clock, Check, X } from 'lucide-react';
import { WalkInvite, Match, UserProfile } from '@/lib/mockData';

interface WalksTabProps {
  invites: WalkInvite[];
  matches: Match[];
  currentUser: UserProfile;
  onUpdateInvite: (id: string, status: 'Accepted' | 'Declined') => void;
}

export function WalksTab({ invites, matches, currentUser, onUpdateInvite }: WalksTabProps) {
  const getOtherPet = (matchId: string) => {
    const match = matches.find(m => m.id === matchId);
    return match?.pet2;
  };

  return (
    <div className="flex flex-col h-full bg-[#FFF9F2] pt-4">
      <div className="px-6 mb-4 shrink-0">
        <h2 className="text-2xl font-bold text-[#FFD166]">Upcoming Walks</h2>
        <p className="text-sm text-[#636E72]">Your scheduled playdates</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {invites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 opacity-50 grayscale">
            <h3 className="text-lg font-semibold text-[#2D3436]">No walks planned</h3>
            <p className="text-sm text-[#636E72]">Chat with your matches to plan a walk!</p>
          </div>
        ) : (
          <AnimatePresence>
            {invites.map((invite) => {
              const otherPet = getOtherPet(invite.matchId);
              const isReceived = invite.receiverId === currentUser.id;

              return (
                <motion.div
                  key={invite.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: !isReceived ? 0.9 : 1 }}
                  className="bg-white p-4 rounded-3xl shadow-sm border border-[#ffe199] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-[#FFD166]/20 px-3 py-1 rounded-bl-3xl">
                    <span className={`text-xs font-bold ${invite.status === 'Accepted' ? 'text-green-600' : invite.status === 'Pending' ? 'text-[#FF6B6B]' : 'text-gray-400'}`}>
                      {invite.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-3">
                    <img src={otherPet?.photo} alt={otherPet?.name} className="w-14 h-14 object-cover rounded-2xl border border-gray-100" />
                    <div>
                      <h4 className="font-bold text-[#2D3436] text-[15px]">Walk with {otherPet?.name}</h4>
                      <p className="text-sm text-[#636E72] flex items-center gap-1 mt-1"><CalendarHeart className="w-3.5 h-3.5"/> {invite.date}</p>
                      <p className="text-sm text-[#636E72] flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {invite.time}</p>
                      <p className="text-sm text-[#636E72] flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {invite.location}</p>
                    </div>
                  </div>

                  {isReceived && invite.status === 'Pending' && (
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => onUpdateInvite(invite.id, 'Declined')}
                        className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1 font-semibold text-gray-500 bg-gray-100"
                      >
                        <X className="w-4 h-4"/> Decline
                      </button>
                      <button 
                        onClick={() => onUpdateInvite(invite.id, 'Accepted')}
                        className="flex-1 py-2 rounded-xl flex items-center justify-center gap-1 font-semibold text-[#2D3436] bg-[#FFD166]"
                      >
                        <Check className="w-4 h-4"/> Accept
                      </button>
                    </div>
                  )}
                  
                  {!isReceived && invite.status === 'Pending' && (
                    <p className="text-xs text-center text-gray-400 mt-2 italic">Waiting for response...</p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
