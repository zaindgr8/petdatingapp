'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { MapPin, Info, X, Heart } from 'lucide-react';

interface DiscoverTabProps {
  profiles: any[];
  onSwipe: (profileId: string, direction: 'left' | 'right') => void;
}

export function DiscoverTab({ profiles, onSwipe }: DiscoverTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    onSwipe(profiles[currentIndex].id, direction);
    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#FFF9F2]">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <PawPrintIcon className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-[#2D3436] mb-2">No more pets nearby</h3>
        <p className="text-[#636E72]">Expand your search radius or check back later for new playful buddies!</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#FFF9F2] overflow-hidden flex flex-col pt-4">
      {/* Top Bar filtering mocked */}
      <div className="px-6 flex justify-between items-center z-10 mb-2">
        <h2 className="text-2xl font-bold text-[#FF6B6B]">Discover</h2>
        <div className="bg-white px-3 py-1.5 rounded-full shadow-sm text-sm font-semibold flex items-center gap-1 text-[#2D3436]">
          <MapPin className="w-4 h-4 text-[#FFD166]" /> 5km
        </div>
      </div>

      <div className="flex-1 relative w-full px-4 pb-20 mt-2">
        <AnimatePresence>
          {profiles.slice(currentIndex, currentIndex + 2).reverse().map((profile, index) => (
            <SwipeCard 
              key={profile.id} 
              profile={profile} 
              isFront={index === profiles.slice(currentIndex, currentIndex + 2).length - 1} 
              onSwipe={handleSwipeComplete} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PawPrintIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 18c-3.3 0-6-2.7-6-6 0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6z"/>
      <path d="M6 12c-2.2 0-4-1.8-4-4 0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4z"/>
      <path d="M18 12c2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4z"/>
      <circle cx="12" cy="5" r="2"/>
    </svg>
  );
}

interface SwipeCardProps {
  profile: any;
  isFront: boolean;
  onSwipe: (dir: 'left' | 'right') => void;
}

function SwipeCard({ profile, isFront, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-[calc(100%-80px)] px-4 pb-4"
      style={{ x, rotate, opacity: isFront ? 1 : opacity }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={isFront ? { scale: 0.95 } : { scale: 0.9, y: 10 }}
      animate={{ scale: isFront ? 1 : 0.95, y: isFront ? 0 : 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden relative flex flex-col pointer-events-auto border border-gray-100">
        
        {/* Like/Nope Overlays */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-20 transform -rotate-12 border-4 border-[#FF6B6B] rounded-xl px-4 py-1">
          <span className="text-4xl font-bold text-[#FF6B6B] tracking-widest uppercase">Like</span>
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-20 transform rotate-12 border-4 border-gray-400 rounded-xl px-4 py-1">
          <span className="text-4xl font-bold text-gray-400 tracking-widest uppercase">Pass</span>
        </motion.div>

        {/* Pet Image Area - Flex grow to take up most of the space */}
        <div className="relative flex-grow bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <img 
            src={profile.pet.photo} 
            alt={profile.pet.name} 
            className="absolute p-2 inset-0 w-full h-full object-cover rounded-[1.5rem]" 
            draggable={false}
          />
          
          <div className="absolute bottom-4 left-6 right-6 z-20 text-white">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                  {profile.pet.name}, {profile.pet.age} 
                  {profile.pet.lookingForWalks && <PawPrintIcon className="w-6 h-6 text-[#FFD166]" />}
                </h1>
                <p className="text-white/90 text-sm font-medium">{profile.pet.breed}</p>
                <p className="text-white/75 text-sm flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" /> {profile.distanceKm} km away • {profile.name}'s pet
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Area - Fixed height from bottom */}
        <div className="bg-white p-5 pt-4 rounded-b-3xl shrink-0">
          <p className="text-[#636E72] text-sm line-clamp-2 leading-relaxed mb-4">
            "{profile.pet.bio}"
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.pet.personalityTags.map((tag: string, i: number) => (
              <span key={i} className="bg-[#FFF9F2] text-[#FF6B6B] text-xs font-semibold px-3 py-1 rounded-full border border-[#ffe0e0]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
