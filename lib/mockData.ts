export type PetSpecies = 'Dog' | 'Cat' | 'Both';

export type UserPet = {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: number;
  bio: string;
  photo: string;
  personalityTags: string[];
  lookingForWalks: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  photo: string;
  city: string;
  pets: UserPet[];
};

export type WalkInvite = {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  date: string;
  time: string;
  location: string;
  status: 'Pending' | 'Accepted' | 'Declined';
};

export type Match = {
  id: string;
  userId1: string;
  userId2: string;
  pet1: UserPet;
  pet2: UserPet;
  timestamp: Date;
};

// Mock Potential Matches
export const MOCK_DISCOVERY_PROFILES: {
  id: string;
  name: string;
  photo: string;
  city: string;
  distanceKm: number;
  pet: UserPet;
}[] = [
  {
    id: "mock_u1",
    name: "Alex",
    photo: "https://picsum.photos/seed/alex/200",
    city: "San Francisco",
    distanceKm: 1.2,
    pet: {
      id: "mock_p1",
      name: "Bella",
      species: "Dog",
      breed: "Golden Retriever",
      age: 2,
      bio: "Loves chasing tennis balls and long walks in the park.",
      photo: "https://picsum.photos/seed/dog1/600/800",
      personalityTags: ["Playful", "Energetic", "Friendly"],
      lookingForWalks: true,
    }
  },
  {
    id: "mock_u2",
    name: "Sarah",
    photo: "https://picsum.photos/seed/sarah/200",
    city: "San Francisco",
    distanceKm: 2.5,
    pet: {
      id: "mock_p2",
      name: "Luna",
      species: "Cat",
      breed: "Siamese Mix",
      age: 4,
      bio: "Will judge you quietly. Might swat, might purr.",
      photo: "https://picsum.photos/seed/cat1/600/800",
      personalityTags: ["Calm", "Shy", "Independent"],
      lookingForWalks: true,
    }
  },
  {
    id: "mock_u3",
    name: "David",
    photo: "https://picsum.photos/seed/david/200",
    city: "San Francisco",
    distanceKm: 0.8,
    pet: {
      id: "mock_p3",
      name: "Charlie",
      species: "Dog",
      breed: "Corgi",
      age: 3,
      bio: "Short legs, big heart. Professional splooter.",
      photo: "https://picsum.photos/seed/dog2/600/800",
      personalityTags: ["Funny", "Energetic", "Vocal"],
      lookingForWalks: true,
    }
  },
  {
    id: "mock_u4",
    name: "Emily",
    photo: "https://picsum.photos/seed/emily/200",
    city: "San Francisco",
    distanceKm: 4.2,
    pet: {
      id: "mock_p4",
      name: "Oliver",
      species: "Cat",
      breed: "Orange Tabby",
      age: 1,
      bio: "Has never had a single thought in his life.",
      photo: "https://picsum.photos/seed/cat2/600/800",
      personalityTags: ["Playful", "Derpy", "Cuddly"],
      lookingForWalks: false,
    }
  },
  {
    id: "mock_u5",
    name: "Michael",
    photo: "https://picsum.photos/seed/michael/200",
    city: "San Francisco",
    distanceKm: 8.5,
    pet: {
      id: "mock_p5",
      name: "Max & Bailey",
      species: "Dog",
      breed: "Mixed Rescues",
      age: 5,
      bio: "A bonded pair of goofballs looking for trail buddies.",
      photo: "https://picsum.photos/seed/dog3/600/800",
      personalityTags: ["Protective", "Active", "Loyal"],
      lookingForWalks: true,
    }
  }
];
