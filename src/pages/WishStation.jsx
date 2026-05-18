import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import WishForm from '../components/WishForm';
import HopeBoard from '../components/HopeBoard';
import { useState, useCallback } from 'react';

export default function WishStation() {
  const { isAdmin } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const handleWishSent = useCallback(() => setRefreshKey(k => k + 1), []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <div className="text-center md:text-left">
        <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-warm-900">The Wish Station</motion.h2>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-warm-500 mt-2 font-light">Tempat harapan-harapanmu menjadi nyata</motion.p>
      </div>

      {!isAdmin && <WishForm onWishSent={handleWishSent} />}
      {isAdmin && <p className="text-warm-400 text-sm italic glass-panel p-4 rounded-xl">Mode Admin: Kamu hanya bisa mengubah status harapan di Hope Board.</p>}

      <HopeBoard key={refreshKey} />
    </motion.div>
  );
}