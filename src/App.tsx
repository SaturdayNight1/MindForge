import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { StudySession } from './components/StudySession';
import { DeckList } from './components/DeckList';
import { Analytics } from './components/Analytics';
import { Community } from './components/Community';
import { AITutor } from './components/AITutor';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Sidebar } from './components/Sidebar';
import { Marketplace } from './components/Marketplace';
import { Gamification } from './components/Gamification';
import { VirtualClassroom } from './components/VirtualClassroom';
import { Personalization } from './components/Personalization';
import { CollaborativeLearning } from './components/CollaborativeLearning';
import { api } from './services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get('/auth/session');
        setUser(response.data.user);
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleSignup = async (newUser: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('/auth/signup', newUser);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        {user ? (
          <Route
            path="/*"
            element={
              <div className="flex h-screen">
                <Sidebar onLogout={handleLogout} />
                <main className="flex-1 p-6 overflow-auto">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard user={user} />} />
                    <Route path="/study/:deckId" element={<StudySession deckId="" onEndSession={() => {}} />} />
                    <Route path="/decks" element={<DeckList />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/ai-tutor" element={<AITutor />} />
                    <Route path="/settings" element={<Settings user={user} />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/gamification" element={<Gamification />} />
                    <Route path="/virtual-classroom" element={<VirtualClassroom />} />
                    <Route path="/personalization" element={<Personalization />} />
                    <Route path="/collaborative-learning" element={<CollaborativeLearning />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;