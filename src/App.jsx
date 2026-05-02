import { useState } from 'react';
import Timeline from './components/Timeline';
import Guide from './components/Guide';
import SmartAssistant from './components/SmartAssistant';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div className="app-container">
      <header className="header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>🗳️ Election IQ</h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className={`btn ${activeTab === 'timeline' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </button>
            <button 
              className={`btn ${activeTab === 'guide' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('guide')}
            >
              Step-by-Step Guide
            </button>
            <button 
              className={`btn ${activeTab === 'assistant' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('assistant')}
            >
              Smart Assistant
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content container animate-fade-in">
        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'guide' && <Guide />}
        {activeTab === 'assistant' && <SmartAssistant />}
      </main>
      
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Built for Hack2Skill | Empowering Voters through Technology</p>
      </footer>
    </div>
  );
}

export default App;
