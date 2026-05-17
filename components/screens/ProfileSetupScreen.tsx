'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Plus } from 'lucide-react';
import { UserProfile, UserPet } from '@/lib/mockData';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

export function ProfileSetupScreen({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [city, setCity] = useState('');
  
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'Dog' | 'Cat'>('Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState('');

  const handleNext = () => {
    if (step === 1 && userName && city) setStep(2);
    else if (step === 2 && petName && breed && age) {
      const newPet: UserPet = {
        id: `my_pet_${Date.now()}`,
        name: petName,
        species,
        breed,
        age: parseInt(age) || 1,
        bio,
        photo: species === 'Dog' ? 'https://picsum.photos/seed/mydog/600/800' : 'https://picsum.photos/seed/mycat/600/800',
        personalityTags: tags.split(',').map(t => t.trim()).filter(Boolean),
        lookingForWalks: true,
      };
      
      const newProfile: UserProfile = {
        id: `user_${Date.now()}`,
        name: userName,
        photo: 'https://picsum.photos/seed/myowner/200',
        city,
        pets: [newPet],
      };
      
      onComplete(newProfile);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFF9F2] p-6 text-[#2D3436] overflow-y-auto pb-20">
      <div className="flex justify-between items-center mb-8 mt-4">
        <h2 className="text-2xl font-bold text-[#FF6B6B]">Profile Setup</h2>
        <span className="text-sm font-medium text-gray-400">Step {step} of 2</span>
      </div>

      <div className="flex-1">
        {step === 1 ? (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
            <div className="flex flex-col section items-center mb-8">
              <div className="w-24 h-24 bg-white rounded-full border-2 border-dashed border-[#FFD166] flex items-center justify-center text-[#FFD166] mb-4">
                <Camera className="w-8 h-8" />
              </div>
              <p className="text-sm text-[#636E72] font-medium">Add Your Photo</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 uppercase tracking-wide">Your Name</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={e => setUserName(e.target.value)}
                  placeholder="e.g. Alex" 
                  className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 shadow-sm focus:ring-2 focus:ring-[#FFD166] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2D3436] mb-2 uppercase tracking-wide">City</label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={e => setCity(e.target.value)}
                  placeholder="e.g. San Francisco" 
                  className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 shadow-sm focus:ring-2 focus:ring-[#FFD166] focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Tell us about your pet 🐾</h3>
            
            <div className="flex gap-4 mb-4">
              <button 
                type="button"
                onClick={() => setSpecies('Dog')}
                className={`flex-1 py-3 rounded-2xl font-semibold border-2 transition-colors ${species === 'Dog' ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white' : 'border-gray-200 bg-white text-gray-500'}`}
              >
                Dog
              </button>
              <button 
                type="button"
                onClick={() => setSpecies('Cat')}
                className={`flex-1 py-3 rounded-2xl font-semibold border-2 transition-colors ${species === 'Cat' ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white' : 'border-gray-200 bg-white text-gray-500'}`}
              >
                Cat
              </button>
            </div>

            <div>
              <input type="text" placeholder="Pet's Name" value={petName} onChange={e => setPetName(e.target.value)} className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 shadow-sm focus:ring-2 focus:ring-[#FFD166] focus:outline-none" />
            </div>
            <div className="flex gap-4">
              <input type="text" placeholder="Breed" value={breed} onChange={e => setBreed(e.target.value)} className="w-2/3 bg-white border border-gray-200 rounded-2xl py-4 px-4 shadow-sm focus:ring-2 focus:ring-[#FFD166] focus:outline-none" />
              <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} className="w-1/3 bg-white border border-gray-200 rounded-2xl py-4 px-4 shadow-sm focus:ring-2 focus:ring-[#FFD166] focus:outline-none" />
            </div>
            <div>
              <textarea placeholder="Short bio (what do they love?)" rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 shadow-sm focus:ring-2 focus:ring-[#FFD166] focus:outline-none" />
            </div>
            <div>
              <input type="text" placeholder="Tags (comma separated, e.g. Playful, Shy)" value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-white border border-gray-200 rounded-2xl py-4 px-4 shadow-sm focus:ring-2 focus:ring-[#FFD166] focus:outline-none" />
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8">
        <button 
          onClick={handleNext}
          disabled={step === 1 ? (!userName || !city) : (!petName || !breed || !age)}
          className="w-full bg-[#FF6B6B] disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-2xl py-4 font-semibold text-lg shadow-md hover:bg-[#ff5252] transition-colors"
        >
          {step === 1 ? 'Next: Add Pet' : 'Complete Setup'}
        </button>
      </div>
    </div>
  );
}
