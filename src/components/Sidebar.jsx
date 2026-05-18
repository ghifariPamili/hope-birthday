import { NavLink } from 'react-router-dom';
import { Heart, Star, Crown, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { isAdmin, profile } = useAuth();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-72 bg-white/50 backdrop-blur-xl border-r border-warm-100/50 flex-col p-8 z-40">
      <div className="mb-12">
        <h1 className="font-serif text-4xl text-warm-900">hope.</h1>
        <p className="text-warm-400 text-sm mt-1 font-light">untuk Ninang ✨</p>
      </div>

      <div className="flex-1 space-y-2">
        <NavLink to="/celebration" className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-rose-gold/10 text-rose-gold' : 'text-warm-600 hover:bg-warm-50'}`
        }>
          <Heart className="w-5 h-5" />
          <span className="font-medium">The Celebration</span>
        </NavLink>

        <NavLink to="/wishes" className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-rose-gold/10 text-rose-gold' : 'text-warm-600 hover:bg-warm-50'}`
        }>
          <Star className="w-5 h-5" />
          <span className="font-medium">The Wish Station</span>
        </NavLink>

        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-warm-100">
            <p className="text-xs text-warm-400 uppercase tracking-wider mb-3 px-4">Admin</p>
            <NavLink to="/admin/letters" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-sage/10 text-sage' : 'text-warm-600 hover:bg-warm-50'}`
            }>
              <Crown className="w-5 h-5" />
              <span className="font-medium">Kelola Surat</span>
            </NavLink>
            <NavLink to="/admin/wishes" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-sage/10 text-sage' : 'text-warm-600 hover:bg-warm-50'}`
            }>
              <User className="w-5 h-5" />
              <span className="font-medium">Kelola Harapan</span>
            </NavLink>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-warm-100">
        <p className="text-xs text-warm-300">© 2026 hope</p>
      </div>
    </aside>
  );
}