import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AudioPlayer({ src }) {
  const { user } = useAuth();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (user && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [user]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button 
        onClick={togglePlay}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:bg-white/60 transition-all active:scale-90"
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warm-700">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warm-700">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        )}
      </button>
    </>
  );
}