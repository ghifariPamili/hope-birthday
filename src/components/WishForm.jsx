import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WishForm({ onWishSent }) {
  const { user } = useAuth();
  const [wish, setWish] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wish.trim() || !user) return;

    setIsLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('wishes')
        .insert([{ wish_text: wish.trim(), created_by: user.id }]);

      if (dbError) throw dbError;

      setSuccess(true);
      setWish('');
      onWishSent?.();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Gagal mengirim harapan. Coba lagi ya.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-2xl mb-8"
    >
      <h3 className="font-serif text-2xl text-warm-800 mb-1">Tulis Harapanmu ✨</h3>
      <p className="text-warm-400 text-sm mb-4">Apa yang kamu inginkan tahun ini?</p>

      <textarea
        value={wish} onChange={e => setWish(e.target.value)}
        placeholder="Aku berharap..."
        className="input-elegant min-h-[120px] resize-none"
        maxLength={500}
      />

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-warm-300">{wish.length}/500</span>
        <button type="submit" disabled={isLoading || !wish.trim()} className="btn-primary flex items-center gap-2">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Kirim Harapan
        </button>
      </div>

      {error && <p className="text-terracotta text-sm mt-3">{error}</p>}
      {success && (
        <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sage text-sm mt-3 font-medium">
          ✓ Harapan berhasil dikirim!
        </motion.p>
      )}
    </motion.form>
  );
}