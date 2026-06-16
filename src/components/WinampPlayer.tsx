import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, Disc, Heart, Radio } from "lucide-react";
import { Song } from "../types";

const SONGS_DATABASE: Song[] = [
  {
    id: "1",
    title: "Te Levar",
    artist: "Charlie Brown Jr.",
    year: 1999,
    lyricsSnippet: "Preste atenção o mundo gira rápido, o caso é sério e não tem por que... Se perder, eu quero te levar daqui!"
  },
  {
    id: "2",
    title: "Você Sempre Quis",
    artist: "Vagabanda (Natasha / Marjorie Estiano)",
    year: 2004,
    lyricsSnippet: "Vem que eu vou te mostrar que a vida que você sempre quis... Não passa de história que o seu espelho condena!"
  },
  {
    id: "3",
    title: "Teto de Vidro",
    artist: "Pitty",
    year: 2003,
    lyricsSnippet: "Quem não tem teto de vidro que atire a primeira pedra... Eu não me sinto seguro, me sinto num labirinto!"
  },
  {
    id: "4",
    title: "Como Devia Estar",
    artist: "Capital Inicial",
    year: 2002,
    lyricsSnippet: "E o vento leva tudo embora... O que ficou pra trás? De onde vem o que você quer esquecer?"
  },
  {
    id: "5",
    title: "Versos Simples",
    artist: "Chimarruts",
    year: 2008,
    lyricsSnippet: "Se cansar de tudo que a vida te deu, pensa em nós dois... Tenho tantos planos, o futuro é nosso após!"
  }
];

export default function WinampPlayer() {
  const [songs] = useState<Song[]>(SONGS_DATABASE);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(15);
  const [likeCount, setLikeCount] = useState<number>(452);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const currentSong = songs[currentIdx];

  // Simulated playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // auto-loop or play next
            handleNext();
            return 0;
          }
          return prev + 1.5;
        });
      }, 300);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentIdx]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIdx((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSelectSong = (idx: number) => {
    setProgress(0);
    setCurrentIdx(idx);
    setIsPlaying(true);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikeCount(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <div id="winamp-player-card" className="bg-gradient-to-br from-slate-900 to-indigo-950 p-5 rounded-2xl border border-white/10 shadow-2xl relative">
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-retro-pink/20 text-retro-pink text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md border border-retro-pink/30">
        <Radio className="w-3 h-3 animate-pulse" />
        HIT DO CD
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-retro-orange/20 flex items-center justify-center border border-retro-orange/30 text-retro-orange">
          <Music className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wide">Trilha Sonora Recomendada</h4>
          <p className="text-white font-display text-sm font-bold">Ouvir no Seu Ritmo</p>
        </div>
      </div>

      {/* Screen area representing classic retro player screen */}
      <div className="bg-black/80 rounded-xl p-4 border border-indigo-500/20 mb-4 rel overflow-hidden">
        <div className="flex justify-between items-start mb-2">
          <div className="max-w-[70%]">
            <span className="text-[10px] font-mono text-retro-teal bg-retro-teal/10 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider mb-1 inline-block">
              Temporada {currentSong.year}
            </span>
            <h5 className="text-white font-display text-sm font-bold truncate">
              {currentSong.title}
            </h5>
            <p className="text-gray-400 text-xs truncate">
              {currentSong.artist}
            </p>
          </div>
          
          {/* Audio Visualizer Waves (pure clean CSS, bounces beautifully when isPlaying is true) */}
          <div className="flex items-end gap-0.5 h-6 mt-1 w-10 justify-end">
            {[1, 2, 3, 4, 5].map((bar) => {
              const baseHeight = [12, 18, 22, 14, 8][bar - 1];
              return (
                <div
                  key={bar}
                  className="bg-retro-teal w-1 rounded-t transition-all duration-300"
                  style={{
                    height: isPlaying 
                      ? `${Math.max(4, Math.floor(Math.sin((progress * bar) / 10) * baseHeight + baseHeight))}px` 
                      : `2px`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Scrolling lyrics snippet container */}
        <div className="bg-slate-900/90 rounded p-2.5 border border-white/5 min-h-[56px] flex items-center justify-center">
          <p className="text-[11px] text-retro-yellow font-medium text-center italic leading-relaxed">
            &ldquo;{currentSong.lyricsSnippet}&rdquo;
          </p>
        </div>

        {/* Custom Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-1">
            <span>0:{Math.floor((progress / 100) * 45).toString().padStart(2, '0')}</span>
            <span>0:45</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full w-full overflow-hidden cursor-pointer">
            <div 
              className="h-full bg-retro-teal transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between px-2 mb-4">
        <button 
          onClick={handleLike} 
          id="song-like-btn"
          className="text-gray-400 hover:text-retro-pink transition flex items-center gap-1.5 text-xs cursor-pointer"
        >
          <Heart className={`w-4.5 h-4.5 ${hasLiked ? 'fill-retro-pink text-retro-pink' : ''}`} />
          <span className="font-mono">{likeCount} curtidas</span>
        </button>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrev} 
            id="player-prev-btn"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handlePlayPause} 
            id="player-play-btn"
            className="w-10 h-10 rounded-full bg-retro-orange hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 transition transform hover:scale-105 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          <button 
            onClick={handleNext} 
            id="player-next-btn"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Volume2 className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px]">100%</span>
        </div>
      </div>

      {/* Playlist Selector list */}
      <div className="border-t border-white/5 pt-3">
        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">Selecione para ouvir:</p>
        <div className="space-y-1.5 max-h-[175px] overflow-y-auto pr-1">
          {songs.map((song, idx) => (
            <button
              key={song.id}
              onClick={() => handleSelectSong(idx)}
              id={`song-track-${song.id}`}
              className={`w-full text-left p-2 rounded-lg text-xs flex justify-between items-center transition cursor-pointer ${
                currentIdx === idx 
                  ? "bg-slate-800 text-white font-bold border-l-2 border-retro-teal" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-[9px] text-gray-500 w-3">{idx + 1}</span>
                <span className="truncate">{song.title}</span>
              </div>
              <span className="font-mono text-[10px] text-gray-500 ml-2">{song.year}</span>
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-[10px] text-slate-500 text-center mt-3 font-mono italic">
        * No nosso arquivo do clube, você adquire a trilhas em alta definição organizadas por ano.
      </p>
    </div>
  );
}
