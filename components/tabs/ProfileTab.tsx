'use client';

import React from 'react';
import { Settings, Edit3 } from 'lucide-react';
import { UserProfile } from '@/lib/mockData';

interface ProfileTabProps {
  currentUser: UserProfile;
}

export function ProfileTab({ currentUser }: ProfileTabProps) {
  const pet = currentUser.pets[0]; // Assuming 1 pet for prototype

  return (
    <div className="flex flex-col h-full bg-[#FFF9F2] pt-4 overflow-y-auto pb-20">
      <div className="flex justify-between items-center px-6 mb-6">
        <h2 className="text-2xl font-bold text-[#2D3436]">Profile</h2>
        <button className="p-2 text-gray-500 bg-white rounded-full shadow-sm">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center">
        {/* Owner Profile */}
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden relative mb-4">
          <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 right-0 bg-[#FFD166] p-1.5 rounded-full border-2 border-white">
            <Edit3 className="w-3 h-3 text-[#2D3436]" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#2D3436]">{currentUser.name}</h3>
        <p className="text-gray-500 text-sm mb-8">{currentUser.city}</p>

        {/* Pet Profile Card */}
        <div className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 relative">
          <div className="absolute -top-10 left-1/2 -px-4 -translate-x-1/2">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10">
               <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF6B6B] rounded-full flex items-center justify-center shadow-sm z-20 border-2 border-white">
              <span className="text-white text-[10px]">🐾</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h4 className="text-2xl font-bold text-[#2D3436] mb-1">{pet.name}, {pet.age}</h4>
            <p className="text-[#FF6B6B] font-medium text-sm mb-4">{pet.breed} • {pet.species}</p>
            
            <p className="text-[#636E72] text-sm leading-relaxed mb-6 italic">
              "{pet.bio}"
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {pet.personalityTags.map((tag, i) => (
                <span key={i} className="bg-[#FFF9F2] text-[#FFD166] text-xs font-bold px-3 py-1.5 rounded-full border border-[#ffe199]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-semibold text-[#2D3436]">Looking for walks</span>
              <div className="w-12 h-6 bg-[#FF6B6B] rounded-full relative cursor-pointer shadow-inner">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-white border border-gray-200 text-[#FF6B6B] font-bold rounded-2xl mt-6 shadow-sm hover:bg-gray-50 transition-colors">
          Add Another Pet
        </button>
      </div>
    </div>
  );
}
