import { useState } from 'react';
import { Calendar, Users, Vote, BarChart, Flag, ChevronRight, Info } from 'lucide-react';

const events = [
  { id: 1, icon: Calendar, date: 'March', title: 'Announcement of Schedule', desc: 'The Election Commission of India (ECI) announces the polling dates and enforces the Model Code of Conduct (MCC) across the country.' },
  { id: 2, icon: Users, date: 'April - May', title: 'Multi-Phase Polling', desc: 'Voting takes place in 7 phases across different states and Union Territories due to the vast geography and population.' },
  { id: 3, icon: Vote, date: 'During Polling', title: 'State Assembly Elections', desc: 'Several states like Andhra Pradesh, Odisha, Sikkim, and Arunachal Pradesh hold their Vidhan Sabha elections simultaneously.' },
  { id: 4, icon: BarChart, date: 'Early June', title: 'Counting Day', desc: 'Votes cast via EVMs (Electronic Voting Machines) are counted and results are declared for all 543 constituencies.' },
  { id: 5, icon: Flag, date: 'Mid June', title: 'Government Formation', desc: 'The party or coalition with a majority (272+ seats) is invited by the President to form the new government.' },
];

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
      
      {/* Interactive Stepper */}
      <section className="card" style={{ padding: '2rem' }}>
        <h2 style={{ color: 'var(--accent-saffron)', marginBottom: '0.5rem' }}>Election Roadmap</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>Click each stage to explore the democratic journey.</p>
        
        <div style={{ position: 'relative', paddingLeft: '1rem' }}>
          {/* Connector Line */}
          <div style={{ position: 'absolute', left: '26px', top: '20px', bottom: '20px', width: '2px', background: 'var(--border-color)', zIndex: 0 }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {events.map((evt, idx) => (
              <button 
                key={evt.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  backgroundColor: activeIndex === idx ? 'var(--accent-saffron)' : 'var(--bg-tertiary)',
                  border: `2px solid ${activeIndex === idx ? 'var(--accent-saffron)' : 'var(--border-color)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'var(--transition)'
                }}>
                  <evt.icon size={16} color={activeIndex === idx ? 'white' : 'var(--text-secondary)'} />
                </div>
                <div>
                  <h4 style={{ color: activeIndex === idx ? 'var(--accent-saffron)' : 'var(--text-primary)', margin: 0, transition: 'var(--transition)' }}>{evt.title}</h4>
                  <small style={{ color: 'var(--text-secondary)' }}>{evt.date}</small>
                </div>
                {activeIndex === idx && <ChevronRight size={18} color="var(--accent-saffron)" style={{ marginLeft: 'auto' }} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detail View */}
      <section className="card animate-fade-in" style={{ 
        position: 'sticky', top: '100px',
        padding: '3rem', 
        backgroundColor: 'rgba(251,140,0,0.03)', 
        border: '1px solid var(--accent-saffron)',
        display: 'flex', flexDirection: 'column', gap: '1.5rem'
      }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '1rem', background: 'var(--accent-saffron)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(255,153,51,0.2)' }}>
          {(() => {
            const ActiveIcon = events[activeIndex].icon;
            return <ActiveIcon size={32} color="white" />;
          })()}
        </div>
        
        <div>
          <span style={{ color: 'var(--accent-saffron)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Stage {events[activeIndex].id} • {events[activeIndex].date}</span>
          <h3 style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>{events[activeIndex].title}</h3>
        </div>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          {events[activeIndex].desc}
        </p>

        <div style={{ 
          marginTop: 'auto', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)',
          display: 'flex', gap: '1rem', alignItems: 'center'
        }}>
          <Info size={20} color="var(--accent-saffron)" />
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            Official dates and protocols are strictly governed by the ECI Constitution.
          </p>
        </div>
      </section>

    </div>
  );
}

