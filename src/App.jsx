import { useState } from 'react';
import Landing from './components/Landing';
import VoterPortal from './components/VoterPortal';
import OfficerPortal from './components/OfficerPortal';
import Timeline from './components/Timeline';
import Guide from './components/Guide';
import SmartAssistant from './components/SmartAssistant';
import './index.css';

function App() {
  const [role, setRole] = useState(null); // 'voter', 'officer', null
  const [activeTab, setActiveTab] = useState('portal'); // 'portal', 'timeline', 'guide', 'assistant'

  return (
    <div className="app-container">
      <header className="header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => setRole(null)}>
            <h1>🇮🇳 Bharat Election IQ</h1>
            {role && <span style={{ padding: '0.2rem 0.6rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: role === 'voter' ? 'var(--accent-green)' : 'var(--accent-saffron)' }}>
              {role === 'voter' ? 'Voter Mode' : 'Officer Mode'}
            </span>}
          </div>
          
          {role === 'voter' && (
            <nav style={{ display: 'flex', gap: '0.5rem' }}>
              <button className={`btn ${activeTab === 'portal' ? 'btn-active-tab' : 'btn-secondary'}`} onClick={() => setActiveTab('portal')}>
                My Portal
              </button>
              <button className={`btn ${activeTab === 'timeline' ? 'btn-active-tab' : 'btn-secondary'}`} onClick={() => setActiveTab('timeline')}>
                Timeline
              </button>
              <button className={`btn ${activeTab === 'guide' ? 'btn-active-tab' : 'btn-secondary'}`} onClick={() => setActiveTab('guide')}>
                ECI Guide
              </button>
              <button className={`btn ${activeTab === 'assistant' ? 'btn-active-tab' : 'btn-secondary'}`} onClick={() => setActiveTab('assistant')}>
                AI Help
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="main-content container animate-fade-in">
        {!role && <Landing setRole={(r) => { setRole(r); setActiveTab('portal'); }} />}
        
        {role === 'officer' && <OfficerPortal />}
        
        {role === 'voter' && activeTab === 'portal' && <VoterPortal />}
        {role === 'voter' && activeTab === 'timeline' && <Timeline />}
        {role === 'voter' && activeTab === 'guide' && <Guide />}
        {role === 'voter' && activeTab === 'assistant' && <SmartAssistant />}
      </main>
      
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Built for Hack2Skill | Empowering Indian Democracy</p>
      </footer>
    </div>
  );
}

export default App;
