import { useState } from 'react';
import { Search, IdCard, UserCheck, MapPin, Activity, CheckCircle2, Circle } from 'lucide-react';

const steps = [
  { id: 1, icon: Search, title: 'Check Electoral Roll', content: 'Visit the NVSP (National Voter\'s Service Portal) or ECI website to ensure your name is registered in the voter list for your constituency.' },
  { id: 2, icon: IdCard, title: 'Secure Your EPIC Card', content: 'Ensure you have your Voter ID card (EPIC). You can also use alternatives like Aadhaar or PAN card if your name is on the roll.' },
  { id: 3, icon: UserCheck, title: 'Know Your Candidates', content: 'Know your candidates by reviewing their affidavits on the KYC (Know Your Candidate) app. Review their history and promises.' },
  { id: 4, icon: MapPin, title: 'Locate Your Booth', content: 'Use the Voter Helpline App or the "Polling Stations" tab to find your exact booth location before election day.' },
  { id: 5, icon: Activity, title: 'EVM & VVPAT Protocol', content: 'At the booth, press the blue button on the EVM. Check the VVPAT slip through the glass for 7 seconds to verify your vote.' },
];

export default function Guide() {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expanded, setExpanded] = useState(1);

  const toggleComplete = (id, e) => {
    e.stopPropagation();
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--accent-green)', fontSize: '2rem' }}>Interactive Voter Journey</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Complete these 5 steps to be election-ready.</p>
        
        {/* Progress Bar */}
        <div style={{ marginTop: '2rem', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${(completedSteps.length / steps.length) * 100}%`, 
            background: 'linear-gradient(90deg, var(--accent-saffron), var(--accent-green))',
            transition: 'width 0.5s ease'
          }} />
        </div>
        <small style={{ marginTop: '0.5rem', display: 'block', color: 'var(--text-secondary)' }}>
          {completedSteps.length} of {steps.length} steps completed
        </small>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isExpanded = expanded === step.id;

          return (
            <div 
              key={step.id}
              onClick={() => setExpanded(isExpanded ? null : step.id)}
              className="card"
              style={{
                padding: 0,
                cursor: 'pointer',
                border: `1px solid ${isExpanded ? 'var(--accent-green)' : 'var(--border-color)'}`,
                background: isExpanded ? 'rgba(19, 136, 8, 0.02)' : 'var(--bg-secondary)',
                opacity: isCompleted && !isExpanded ? 0.7 : 1,
                transition: 'var(--transition)'
              }}
            >
              <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', 
                  background: isCompleted ? 'var(--accent-green)' : 'var(--bg-tertiary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <step.icon color={isCompleted ? 'white' : 'var(--text-secondary)'} size={24} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, color: isCompleted ? 'var(--accent-green)' : 'var(--text-primary)', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                    {step.title}
                  </h4>
                </div>

                <button 
                  onClick={(e) => toggleComplete(step.id, e)}
                  style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}
                >
                  {isCompleted ? <CheckCircle2 color="var(--accent-green)" /> : <Circle color="var(--border-color)" />}
                </button>
              </div>
              
              {isExpanded && (
                <div className="animate-fade-in" style={{ padding: '0 1.5rem 1.5rem 5.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <p>{step.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {completedSteps.length === steps.length && (
        <div className="card animate-bounce" style={{ marginTop: '3rem', textAlign: 'center', background: 'rgba(19, 136, 8, 0.1)', borderColor: 'var(--accent-green)' }}>
          <h3 style={{ color: 'var(--accent-green)', margin: 0 }}>🎉 You're officially ready to vote!</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Don't forget to take your ID card to the booth.</p>
        </div>
      )}
    </div>
  );
}

