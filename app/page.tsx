'use client';

import React, { useState, useEffect } from 'react';
import { PawPrint, MessageCircleHeart, CalendarHeart, Map, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Models & Mock Data
import { UserProfile, Match, WalkInvite, MOCK_DISCOVERY_PROFILES } from '@/lib/mockData';

// Screens & Overlays
import { LoginScreen } from '@/components/screens/LoginScreen';
import { ProfileSetupScreen } from '@/components/screens/ProfileSetupScreen';
import { DiscoverTab } from '@/components/tabs/DiscoverTab';
import { MatchCelebration } from '@/components/MatchCelebration';
import { MatchesTab } from '@/components/tabs/MatchesTab';
import { ChatScreen } from '@/components/screens/ChatScreen';
import { WalksTab } from '@/components/tabs/WalksTab';
import { MapTab } from '@/components/tabs/MapTab';
import { ProfileTab } from '@/components/tabs/ProfileTab';

type ScreenState = 'LOGIN' | 'SETUP' | 'MAIN';
type TabState = 'DISCOVER' | 'MATCHES' | 'WALKS' | 'MAP' | 'PROFILE';

export default function PawDateApp() {
  const [screen, setScreen] = useState<ScreenState>('LOGIN');
  const [currentTab, setCurrentTab] = useState<TabState>('DISCOVER');
  const [activeChatMatch, setActiveChatMatch] = useState<Match | null>(null);

  // App Data State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [walkInvites, setWalkInvites] = useState<WalkInvite[]>([]);
  
  // Pending match celebration
  const [latestMatch, setLatestMatch] = useState<Match | null>(null);

  const handleLogin = (email: string) => {
    // If they were already using it or mock login
    setScreen('SETUP');
  };

  const handleSetupComplete = (profile: UserProfile) => {
    setCurrentUser(profile);
    setScreen('MAIN');
  };

  const handleSwipe = (profileId: string, direction: 'left' | 'right') => {
    if (direction === 'right' && currentUser && currentUser.pets.length > 0) {
      // 50% chance of matching for prototype demonstration
      const isMatch = Math.random() > 0.5;
      
      if (isMatch) {
        const potentialUser = MOCK_DISCOVERY_PROFILES.find(p => p.id === profileId);
        if (potentialUser) {
          const newMatch: Match = {
            id: `match_${Date.now()}`,
            userId1: currentUser.id,
            userId2: potentialUser.id,
            pet1: currentUser.pets[0],
            pet2: potentialUser.pet,
            timestamp: new Date(),
          };
          setMatches(prev => [...prev, newMatch]);
          setLatestMatch(newMatch);
        }
      }
    }
  };

  const closeCelebration = () => setLatestMatch(null);
  
  const openChatFromCelebration = () => {
    const match = latestMatch;
    setLatestMatch(null);
    if (match) {
      setCurrentTab('MATCHES');
      setActiveChatMatch(match);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] sm:bg-gray-100 flex items-center justify-center sm:p-8 font-sans">
      {/* Mobile Device Wrapper */}
      <div className="relative w-full h-[100dvh] sm:h-[844px] sm:w-[390px] sm:rounded-[3rem] bg-white overflow-hidden shadow-2xl sm:border-[8px] sm:border-gray-900 flex flex-col">
        
        {/* Dynamic Screen Rendering */}
        <AnimatePresence mode="wait">
          {screen === 'LOGIN' && (
            <motion.div key="login" className="absolute inset-0 z-10 bg-[#FFF9F2]" exit={{ opacity: 0 }}>
              <LoginScreen onLogin={handleLogin} />
            </motion.div>
          )}

          {screen === 'SETUP' && (
            <motion.div key="setup" className="absolute inset-0 z-10 bg-[#FFF9F2]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProfileSetupScreen onComplete={handleSetupComplete} />
            </motion.div>
          )}

          {screen === 'MAIN' && currentUser && (
            <motion.div key="main" className="absolute inset-0 flex flex-col bg-[#FFF9F2] z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              
              {/* Main App Content Area */}
              <div className="flex-1 overflow-hidden relative">
                {currentTab === 'DISCOVER' && (
                  <DiscoverTab profiles={MOCK_DISCOVERY_PROFILES} onSwipe={handleSwipe} />
                )}
                {currentTab === 'MATCHES' && (
                  <MatchesTab 
                    matches={matches} 
                    onOpenChat={(match) => setActiveChatMatch(match)} 
                  />
                )}
                {currentTab === 'WALKS' && (
                  <WalksTab 
                    invites={walkInvites} 
                    matches={matches} 
                    currentUser={currentUser}
                    onUpdateInvite={(id, status) => {
                      setWalkInvites(prev => prev.map(inv => inv.id === id ? { ...inv, status } as WalkInvite : inv));
                    }}
                  />
                )}
                {currentTab === 'MAP' && (
                  <MapTab profiles={MOCK_DISCOVERY_PROFILES} onOpenProfile={() => setCurrentTab('DISCOVER')} />
                )}
                {currentTab === 'PROFILE' && (
                  <ProfileTab currentUser={currentUser} />
                )}
                
                {/* Chat Overlay */}
                <AnimatePresence>
                  {activeChatMatch && (
                    <ChatScreen 
                      key="chat"
                      match={activeChatMatch} 
                      currentUser={currentUser}
                      onBack={() => setActiveChatMatch(null)} 
                      onScheduleWalk={(invite) => {
                        setWalkInvites(prev => [...prev, invite]);
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Navigation Bar */}
              <div className="h-20 bg-white border-t border-gray-100 flex justify-around items-center px-4 pb-4 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-40 relative shrink-0">
                <NavButton icon={PawPrint} label="Discover" isActive={currentTab === 'DISCOVER'} onClick={() => { setCurrentTab('DISCOVER'); setActiveChatMatch(null); }} />
                <NavButton icon={Map} label="Map" isActive={currentTab === 'MAP'} onClick={() => { setCurrentTab('MAP'); setActiveChatMatch(null); }} />
                
                <div className="relative">
                  <NavButton icon={MessageCircleHeart} label="Matches" isActive={currentTab === 'MATCHES'} onClick={() => { setCurrentTab('MATCHES'); setActiveChatMatch(null); }} />
                  {matches.length > 0 && currentTab !== 'MATCHES' && (
                    <span className="absolute top-0 right-2 w-3 h-3 bg-[#FF6B6B] rounded-full border-2 border-white" />
                  )}
                </div>
                
                <div className="relative">
                  <NavButton icon={CalendarHeart} label="Walks" isActive={currentTab === 'WALKS'} onClick={() => { setCurrentTab('WALKS'); setActiveChatMatch(null); }} />
                  {walkInvites.filter(i => i.status === 'Pending' && i.receiverId === currentUser.id).length > 0 && (
                    <span className="absolute top-0 right-2 w-3 h-3 bg-[#FFD166] rounded-full border-2 border-white" />
                  )}
                </div>

                <NavButton icon={User} label="Profile" isActive={currentTab === 'PROFILE'} onClick={() => { setCurrentTab('PROFILE'); setActiveChatMatch(null); }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Overlays */}
        {latestMatch && (
          <MatchCelebration 
            match={latestMatch} 
            onClose={closeCelebration} 
            onSendMessage={openChatFromCelebration} 
          />
        )}

      </div>
    </div>
  );
}

function NavButton({ icon: Icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${isActive ? 'text-[#FF6B6B]' : 'text-gray-400 hover:text-gray-600'}`}>
      <motion.div animate={{ scale: isActive ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 300 }}>
        <Icon className={`w-6 h-6 ${isActive ? 'fill-current opacity-20 relative' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
        {isActive && <Icon className="w-6 h-6 absolute top-0 left-0" strokeWidth={2.5} />}
      </motion.div>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
