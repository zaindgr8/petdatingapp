'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, CalendarPlus, X } from 'lucide-react';
import { Match, UserProfile, WalkInvite } from '@/lib/mockData';

interface ChatScreenProps {
  match: Match;
  currentUser: UserProfile;
  onBack: () => void;
  onScheduleWalk: (invite: WalkInvite) => void;
}

export function ChatScreen({ match, currentUser, onBack, onScheduleWalk }: ChatScreenProps) {
  const [messages, setMessages] = useState<{id: string, text: string, senderId: string}[]>([
    { id: '1', text: `Hi! ${match.pet1.name} and ${match.pet2.name} would be great friends!`, senderId: match.userId2 } // Dummy initial message
  ]);
  const [inputText, setInputText] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  // Scheduler State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: inputText, senderId: currentUser.id }]);
    setInputText('');
  };

  const handleSendInvite = () => {
    if (!date || !time || !location) return;
    
    const invite: WalkInvite = {
      id: `walk_${Date.now()}`,
      matchId: match.id,
      senderId: currentUser.id,
      receiverId: match.userId2,
      date,
      time,
      location,
      status: 'Pending'
    };
    
    onScheduleWalk(invite);
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      text: `📅 Walk Invite Sent!\n${date} at ${time}\n📍 ${location}`, 
      senderId: currentUser.id 
    }]);
    setIsScheduling(false);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#FFF9F2] z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center shadow-sm z-10 shrink-0 border-b border-gray-100">
        <button onClick={onBack} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <img src={match.pet2.photo} alt={match.pet2.name} className="w-10 h-10 object-cover rounded-full mr-3 border border-gray-200" />
        <div className="flex-1">
          <h3 className="font-bold text-[#2D3436]">{match.pet2.name}</h3>
        </div>
        <button 
          onClick={() => setIsScheduling(true)}
          className="bg-[#FFD166] text-[#2D3436] px-3 py-1.5 rounded-xl font-semibold text-sm flex items-center gap-1 shadow-sm"
        >
          <CalendarPlus className="w-4 h-4" /> Plan Walk
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl whitespace-pre-wrap text-[15px] ${isMe ? 'bg-[#FF6B6B] text-white rounded-br-sm' : 'bg-white text-[#2D3436] border border-gray-100 shadow-sm rounded-bl-sm'}`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="bg-white p-4 shrink-0 border-t border-gray-100">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166]"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-[#FF6B6B] text-white p-3 rounded-full flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mini Scheduler Modal */}
      {isScheduling && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-end">
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            className="bg-white w-full rounded-t-[2rem] p-6 pb-12 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#2D3436]">Plan a Walk 🦮</h3>
              <button onClick={() => setIsScheduling(false)} className="text-gray-400 p-1 bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4">
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166]" />
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166]" />
              <input type="text" placeholder="Meeting Spot (e.g. Dolores Park)" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD166]" />
              
              <button 
                onClick={handleSendInvite}
                disabled={!date || !time || !location}
                className="w-full bg-[#FFD166] text-[#2D3436] rounded-xl py-3 font-bold text-lg disabled:opacity-50 mt-2"
              >
                Send Invite
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
