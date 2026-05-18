import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function EnvelopeLetter({ letter }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(224,169,109,0.15)' }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="w-full text-left glass-panel p-6 rounded-2xl border border-warm-100/60 hover:border-rose-gold/30 transition-all group"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl text-warm-800 group-hover:text-rose-gold transition-colors">
              {letter.title}
            </h3>
            <p className="text-warm-400 text-sm mt-1 font-light">
              {new Date(letter.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <span className="text-warm-300 text-2xl group-hover:rotate-12 transition-transform duration-300">💌</span>
        </div>
        <p className="text-warm-500 text-sm mt-3 line-clamp-2">{letter.content}</p>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-ivory max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-10 shadow-2xl relative"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-warm-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-warm-400" />
              </button>
              <div className="text-center mb-6">
                <span className="text-4xl">💌</span>
                <h2 className="font-serif text-3xl text-warm-900 mt-2">{letter.title}</h2>
                <p className="text-warm-400 text-sm mt-1">
                  {new Date(letter.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="prose prose-warm max-w-none text-warm-700 leading-relaxed whitespace-pre-wrap">
                {letter.content}
              </div>
              <div className="mt-8 pt-6 border-t border-warm-100 text-center">
                <p className="font-serif text-lg text-terracotta italic">— Dengan cinta, untukmu —</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}