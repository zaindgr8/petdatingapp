'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

interface MapTabProps {
  profiles: any[];
  onOpenProfile: () => void;
}

export function MapTab({ profiles, onOpenProfile }: MapTabProps) {
  return (
    <div className="relative w-full h-full bg-[#e8f4f8] overflow-hidden">
      {/* Mock Map Background Layer */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
      </div>
      
      {/* Search Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 flex-1 shadow-sm font-semibold text-[#2D3436] border border-white">
          📍 Nearby Playdates
        </div>
      </div>

      {/* Mock Pins */}
      {profiles.map((p, i) => {
        // Generate deterministic absolute positions
        const top = 20 + (i * 15) % 60 + "%";
        const left = 10 + (i * 25) % 70 + "%";
        
        return (
          <motion.div 
            key={p.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="absolute z-20 cursor-pointer group"
            style={{ top, left }}
            onClick={onOpenProfile}
          >
            {/* The pin line */}
            <div className="w-1 h-6 bg-[#FF6B6B] mx-auto rounded-full -mb-3 opacity-80" />
            
            {/* The circular photo avatar */}
            <div className="w-14 h-14 rounded-full border-4 border-[#FF6B6B] overflow-hidden bg-white shadow-xl relative group-hover:scale-110 transition-transform">
              <img src={p.pet.photo} alt={p.pet.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Tooltip on hover */}
            <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-xl shadow-lg text-xs font-bold text-[#2D3436] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {p.pet.name} • {p.distanceKm}km
            </div>
          </motion.div>
        );
      })}

      {/* My Location indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 scale-150" />
      </div>
    </div>
  );
}
