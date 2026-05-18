import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import LoginGate from './components/LoginGate';
import Layout from './components/Layout';
import Celebration from './pages/Celebration';
import WishStation from './pages/WishStation';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-warm-400">Memuat...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/celebration" replace />;
  return children;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={!user ? <LoginGate /> : <Navigate to="/celebration" replace />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/celebration" element={<Celebration />} />
          <Route path="/wishes" element={<WishStation />} />
          <Route path="/admin/letters" element={<ProtectedRoute adminOnly><Celebration /></ProtectedRoute>} />
          <Route path="/admin/wishes" element={<ProtectedRoute adminOnly><WishStation /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<Navigate to={user ? "/celebration" : "/login"} replace />} />
      </Routes>
    </AnimatePresence>
  );
}