import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { STATUS_COLORS } from '../utils/constants';

export default function HopeBoard() {
  const { isAdmin } = useAuth();
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setWishes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWishes();

    const channel = supabase.channel('wishes-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'wishes' }, () => fetchWishes())
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    const { error } = await supabase.from('wishes').update({ status: newStatus }).eq('id', id);
    if (!error) fetchWishes();
    setUpdatingId(null);
  };

  if (loading) return <p className="text-warm-400 text-center py-8">Memuat harapan...</p>;

  return (
    <div className="space-y-4">
      {wishes.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl">
          <span className="text-4xl">🌸</span>
          <p className="text-warm-400 mt-3">Belum ada harapan. Mulai tulis yang pertama!</p>
        </div>
      ) : (
        wishes.map((wish, i) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-panel p-5 md:p-6 rounded-2xl border-l-4 border-l-rose-gold/30"
          >
            <p className="text-warm-700 text-lg leading-relaxed">{wish.wish_text}</p>
            <div className="flex items-center justify-between mt-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[wish.status] || STATUS_COLORS['Menunggu Waktu']}`}>
                {wish.status}
              </span>
              {isAdmin && (
                <select
                  value={wish.status}
                  onChange={e => updateStatus(wish.id, e.target.value)}
                  disabled={updatingId === wish.id}
                  className="bg-white/60 border border-warm-200 rounded-lg px-3 py-1 text-sm text-warm-700 focus:outline-none focus:ring-2 focus:ring-rose-gold/30"
                >
                  <option value="Menunggu Waktu">Menunggu Waktu</option>
                  <option value="Sedang Diusahakan">Sedang Diusahakan</option>
                  <option value="Terwujud ✨">Terwujud ✨</option>
                </select>
              )}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}