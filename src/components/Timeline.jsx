import { useState } from 'react';

const events = [
  { id: 1, date: 'January - June', title: 'Primaries & Caucuses', desc: 'States hold primaries or caucuses to vote for their preferred party nominee.' },
  { id: 2, date: 'July - August', title: 'National Conventions', desc: 'Parties finalize their presidential nominee and vice-presidential pick.' },
  { id: 3, date: 'September - October', title: 'Presidential Debates', desc: 'Candidates debate key issues on national television before the general election.' },
  { id: 4, date: 'First Tuesday of November', title: 'Election Day', desc: 'Citizens across the country cast their votes for the President.' },
  { id: 5, date: 'Mid-December', title: 'Electoral College Vote', desc: 'Electors cast their official votes for President and Vice President.' },
  { id: 6, date: 'January 20th', title: 'Inauguration Day', desc: 'The President-elect is officially sworn into office.' },
];

export default function Timeline() {
  const [activeEvent, setActiveEvent] = useState(events[0]);

  return (
    <div className="card" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px' }}>
        <h2>Election Timeline</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Follow the journey from primaries to the Oval Office.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {events.map((evt) => (
            <div 
              key={evt.id}
              onClick={() => setActiveEvent(evt)}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeEvent.id === evt.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderLeft: `4px solid ${activeEvent.id === evt.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)'}`,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <h4 style={{ color: activeEvent.id === evt.id ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{evt.title}</h4>
              <small style={{ color: 'var(--text-secondary)' }}>{evt.date}</small>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ flex: '2 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          padding: '3rem', 
          backgroundColor: 'rgba(15, 23, 42, 0.5)', 
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>{activeEvent.title}</h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>{activeEvent.desc}</p>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', fontSize: '0.9rem' }}>
            🗓️ {activeEvent.date}
          </div>
        </div>
      </div>
    </div>
  );
}
