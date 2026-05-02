import { useState } from 'react';

const events = [
  { id: 1, date: 'March', title: 'Announcement of Schedule', desc: 'The Election Commission of India (ECI) announces the polling dates and enforces the Model Code of Conduct (MCC) across the country.' },
  { id: 2, date: 'April - May', title: 'Multi-Phase Polling', desc: 'Voting takes place in 7 phases across different states and Union Territories due to the vast geography and population.' },
  { id: 3, date: 'During Polling', title: 'State Assembly Elections', desc: 'Several states like Andhra Pradesh, Odisha, Sikkim, and Arunachal Pradesh hold their Vidhan Sabha elections simultaneously with Lok Sabha.' },
  { id: 4, date: 'Early June', title: 'Counting Day', desc: 'Votes cast via EVMs (Electronic Voting Machines) are counted and results are declared for all 543 constituencies.' },
  { id: 5, date: 'Mid June', title: 'Government Formation', desc: 'The party or coalition with a majority (272+ seats) is invited by the President to form the new government.' },
];

export default function Timeline() {
  const [activeEvent, setActiveEvent] = useState(events[0]);

  return (
    <div className="card" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px' }}>
        <h2 style={{ color: 'var(--accent-saffron)' }}>Lok Sabha Elections</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Follow the journey of the world's largest democratic exercise.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {events.map((evt) => (
            <div 
              key={evt.id}
              onClick={() => setActiveEvent(evt)}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeEvent.id === evt.id ? 'rgba(255, 153, 51, 0.1)' : 'transparent',
                borderLeft: `4px solid ${activeEvent.id === evt.id ? 'var(--accent-saffron)' : 'var(--bg-tertiary)'}`,
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <h4 style={{ color: activeEvent.id === evt.id ? 'var(--accent-saffron)' : 'var(--text-primary)' }}>{evt.title}</h4>
              <small style={{ color: 'var(--text-secondary)' }}>{evt.date}</small>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ flex: '2 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          padding: '3rem', 
          backgroundColor: 'rgba(10, 10, 10, 0.5)', 
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-green)' }}>{activeEvent.title}</h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>{activeEvent.desc}</p>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', fontSize: '0.9rem' }}>
            🗓️ {activeEvent.date}
          </div>
        </div>
      </div>
    </div>
  );
}
