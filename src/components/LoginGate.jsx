import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginGate() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Password salah. Coba lagi ya 💭');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ivory to-warm-50 px-4"
    >
      <motion.div 
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-6xl md:text-7xl text-warm-900 tracking-tight">hope.</h1>
          <p className="mt-3 text-warm-400 text-sm tracking-wide font-light">sesuatu yang indah untukmu</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-3xl space-y-6">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-terracotta/10 border border-terracotta/20 text-warm-800 px-4 py-3 rounded-xl text-sm">
              {error}
            </motion.div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-warm-500 ml-1 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input-elegant pl-11" placeholder="email@contoh.com" required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-warm-500 ml-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <input 
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="input-elegant pl-11" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-warm-300 text-xs mt-8">© 2026 hope — dibuat dengan sepenuh hati</p>
      </motion.div>
    </motion.div>
  );
}