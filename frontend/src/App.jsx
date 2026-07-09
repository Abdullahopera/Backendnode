import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [searchParams] = useSearchParams();

  const handleAuth = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) handleAuth(urlToken);
  }, [searchParams]);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register onAuth={handleAuth} />} />
      <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login onAuth={handleAuth} />} />
      <Route path="/dashboard" element={token ? <Dashboard token={token} onLogout={handleLogout} /> : <Navigate to="/login" />} />
    </Routes>
  );
}
