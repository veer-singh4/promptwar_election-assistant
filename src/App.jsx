import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Home, ClipboardList, Map as MapIcon, BookOpen, Bot, Shield, User as UserIcon } from 'lucide-react';
import { useElection } from './context/ElectionContext';
import './index.css';

// Efficiency: Code Splitting with React.lazy
const Landing = lazy(() => import('./components/Landing'));
const VoterPortal = lazy(() => import('./components/VoterPortal'));
const OfficerPortal = lazy(() => import('./components/OfficerPortal'));
const Timeline = lazy(() => import('./components/Timeline'));
const Guide = lazy(() => import('./components/Guide'));
const SmartAssistant = lazy(() => import('./components/SmartAssistant'));

function App() {
  const { userRole, setUserRole, telemetry } = useElection();
  const [activeTab, setActiveTab] = useState('portal');
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setUserRole(role);
    setActiveTab('portal');
  };

  return (
    <div className="app-container">
      <header className="header" role="banner">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div 
            role="button" 
            aria-label="Home - Bharat Election IQ" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} 
            onClick={() => { setUserRole(null); navigate('/'); }}
          >
            <div style={{ background: 'var(--accent-saffron)', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <Shield color="white" size={24} />
            </div>
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Bharat Election IQ</h1>
          </div>
          
          {userRole === 'voter' && (
            <nav aria-label="Main Navigation" style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
              <button 
                className={`btn-nav ${activeTab === 'portal' ? 'active' : ''}`} 
                onClick={() => setActiveTab('portal')}
              >
                <UserIcon size={18} />
                <span>My Portal</span>
              </button>
              <button 
                className={`btn-nav ${activeTab === 'timeline' ? 'active' : ''}`} 
                onClick={() => setActiveTab('timeline')}
              >
                <ClipboardList size={18} />
                <span>Timeline</span>
              </button>
              <button 
                className={`btn-nav ${activeTab === 'guide' ? 'active' : ''}`} 
                onClick={() => setActiveTab('guide')}
              >
                <BookOpen size={18} />
                <span>ECI Guide</span>
              </button>
              <button 
                className={`btn-nav ${activeTab === 'assistant' ? 'active' : ''}`} 
                onClick={() => setActiveTab('assistant')}
              >
                <Bot size={18} />
                <span>AI Help</span>
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="main-content container animate-fade-in" role="main">
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '5rem', color: 'var(--accent-saffron)' }}>🇮🇳 Optimizing Election IQ...</div>}>
          {!userRole && <Landing setRole={handleRoleSelection} />}
          
          {userRole === 'officer' && <OfficerPortal />}
          
          {userRole === 'voter' && activeTab === 'portal' && <VoterPortal />}
          {userRole === 'voter' && activeTab === 'timeline' && <Timeline />}
          {userRole === 'voter' && activeTab === 'guide' && <Guide />}
          {userRole === 'voter' && activeTab === 'assistant' && <SmartAssistant />}
        </Suspense>
      </main>
      
      <footer role="contentinfo" style={{ textAlign: 'center', padding: '3rem 2rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Official Digital Platform for Indian Election Management</p>
        <small style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>Powered by Google Gemini 2.5 Flash & Google Cloud Run</small>
      </footer>
    </div>
  );
}

export default App;
