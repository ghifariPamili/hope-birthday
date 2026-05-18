import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { X, Loader2, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLetterModal({ letter, onClose, onRefresh }) {
  const { user } = useAuth();
  const [title, setTitle] = useState(letter?.title || '');
  const [content, setContent] = useState(letter?.content || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const isEdit = !!letter;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isEdit) {
        const { error } = await supabase.from('letters').update({ title, content }).eq('id', letter.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('letters').insert([{ title, content, created_by: user.id }]);
        if (error) throw error;
      }
      onRefresh();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus surat ini?')) return;
    setIsLoading(true);
    const { error } = await supabase.from('letters').delete().eq('id', letter.id);
    if (!error) { onRefresh(); onClose(); }
    setIsLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-ivory max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl text-warm-900">{isEdit ? 'Edit Surat' : 'Surat Baru'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-warm-100 rounded-full"><X className="w-5 h-5 text-warm-400" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul surat..." className="input-elegant" required />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Isi surat..." className="input-elegant min-h-[200px] resize-none" required />

          {error && <p className="text-terracotta text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            {isEdit && (
              <button type="button" onClick={handleDelete} className="btn-secondary flex items-center gap-2 text-red-400 hover:text-red-500 hover:border-red-200">
                <Trash2 className="w-4 h-4" /> Hapus
              </button>
            )}
            <button type="submit" disabled={isLoading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isEdit ? 'Simpan Perubahan' : 'Buat Surat'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}