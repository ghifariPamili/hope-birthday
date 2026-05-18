import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import AudioPlayer from './AudioPlayer';
import { AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { isAdmin, logout, user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ivory flex">
      <Sidebar />
      
      <main className="flex-1 min-h-screen pb-24 md:pb-8 md:pl-72 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>
      </main>

      <BottomNav isAdmin={isAdmin} />
      <AudioPlayer src="/audio/backsound.mp3" />
    </div>
  );
}