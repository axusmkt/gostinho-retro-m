export interface Song {
  id: string;
  title: string;
  artist: string;
  year: number;
  lyricsSnippet: string;
  spotifyUri?: string;
}

export interface Season {
  year: string;
  title: string;
  couple: string;
  villain: string;
  theme: string;
  fact: string;
  tagline: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: Record<string, number>; // e.g., { cabecao: 3, natasha: 1 }
  }[];
}

export interface CharacterResult {
  key: string;
  name: string;
  role: string;
  description: string;
  catchphrase: string;
  imageTheme: string; // colors
}

export interface Plan {
  id: string;
  name: string;
  badge?: string;
  priceOriginal: string;
  priceCurrent: string;
  installments?: string;
  description: string;
  features: { text: string; included: boolean }[];
  ctaText: string;
  popular: boolean;
  highlightText?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  age: number;
  location: string;
  avatarSeed: string;
  text: string;
  favoriteSeason: string;
}

export interface Message {
  id: string;
  author: string;
  avatarSeed: string;
  badge?: string;
  text: string;
  time: string;
  likes: number;
}
