import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import EnvelopeLetter from '../components/EnvelopeLetter';
import MasonryGallery from '../components/MasonryGallery';
import AdminLetterModal from '../components/AdminLetterModal';

export default function Celebration() {
  const { isAdmin } = useAuth();
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState(null);

  const fetchLetters = async () => {
    const { data } = await supabase.from('letters').select('*').order('created_at', { ascending: false });
    if (data) setLetters(data);
    setLoading(false);
  };

  useEffect(() => { fetchLetters(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      {/* Header */}
      <div className="text-center md:text-left">
        <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-warm-900">The Celebration</motion.h2>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-warm-500 mt-2 font-light">Kumpulan surat & kenangan untukmu, Ninang</motion.p>
      </div>

      {/* Admin Button */}
      {isAdmin && (
        <button onClick={() => { setEditingLetter(null); setModalOpen(true); }}
          className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tulis Surat Baru
        </button>
      )}

      {/* Letters Grid */}
      <section>
        <h3 className="font-serif text-2xl text-warm-700 mb-6">Surat Untukmu 💌</h3>
        {loading ? (
          <p className="text-warm-400 text-center py-8">Memuat surat...</p>
        ) : letters.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-2xl">
            <span className="text-4xl">✉️</span>
            <p className="text-warm-400 mt-3">Belum ada surat. {isAdmin ? 'Mulai tulis yang pertama!' : 'Tunggu kejutan dari admin ya~'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {letters.map((l, i) => (
              <EnvelopeLetter key={l.id} letter={l} />
            ))}
          </div>
        )}
      </section>

      {/* Gallery */}
      <section>
        <h3 className="font-serif text-2xl text-warm-700 mb-6">Galeri Kilas Balik 📸</h3>
        <MasonryGallery />
      </section>

      {/* Modal */}
      {modalOpen && (
        <AdminLetterModal letter={editingLetter} onClose={() => setModalOpen(false)} onRefresh={fetchLetters} />
      )}
    </motion.div>
  );
}