import { NavLink } from 'react-router-dom';
import { Heart, Star, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/celebration', icon: Heart, label: 'Celebration' },
  { to: '/wishes', icon: Star, label: 'Wishes' },
];

export default function BottomNav({ isAdmin }) {
  const { logout, profile } = useAuth();

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-warm-100/50">
        <div className="flex items-center justify-around py-3 px-4">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${isActive ? 'text-rose-gold' : 'text-warm-400'}`
            }>
              {({ isActive }) => (
                <>
                  {isActive && <motion.div layoutId="navDot" className="w-1 h-1 bg-rose-gold rounded-full" />}
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
          <button onClick={logout} className="flex flex-col items-center gap-1 px-4 py-1 text-warm-300 hover:text-terracotta transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Keluar</span>
          </button>
        </div>
      </nav>

      {/* Desktop Top Bar */}
      <div className="hidden md:flex fixed top-0 right-0 left-72 h-16 items-center justify-between px-8 glass-panel border-b border-warm-100/50 z-30">
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl text-warm-800">hope.</span>
          <span className="text-warm-300">/</span>
          <span className="text-warm-400 text-sm">{isAdmin ? 'Admin' : profile?.display_name || 'Ninang'}</span>
        </div>
        <button onClick={logout} className="text-sm text-warm-400 hover:text-terracotta transition-colors">
          Keluar
        </button>
      </div>
    </>
  );
}