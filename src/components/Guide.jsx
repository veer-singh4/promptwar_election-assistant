import { useState } from 'react';

const steps = [
  { id: 1, title: 'Check Eligibility', content: 'Ensure you are a US citizen, meet your state\'s residency requirements, and are 18 years old on or before Election Day.' },
  { id: 2, title: 'Register to Vote', content: 'Register online, by mail, or in person. Deadlines vary by state, so check your local election office.' },
  { id: 3, title: 'Research Candidates', content: 'Look up the candidates on your ballot. Read their platforms, watch debates, and check their voting records.' },
  { id: 4, title: 'Find Your Polling Place', content: 'Locate your designated polling place or request an absentee/mail-in ballot if you cannot vote in person.' },
  { id: 5, title: 'Vote!', content: 'Bring necessary ID if your state requires it, and cast your ballot. Make your voice heard!' },
];

export default function Guide() {
  const [expanded, setExpanded] = useState(1);

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Voter's Step-by-Step Guide</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {steps.map((step) => (
          <div 
            key={step.id}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              transition: 'var(--transition)'
            }}
          >
            <button
              onClick={() => setExpanded(expanded === step.id ? null : step.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expanded === step.id ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.1rem',
                fontWeight: '600',
                textAlign: 'left'
              }}
            >
              <span>
                <span style={{ color: 'var(--accent-primary)', marginRight: '1rem' }}>{step.id}.</span>
                {step.title}
              </span>
              <span>{expanded === step.id ? '−' : '+'}</span>
            </button>
            
            {expanded === step.id && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
                {step.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
