import { useState } from 'react';

const steps = [
  { id: 1, title: 'Check Name on Electoral Roll', content: 'Visit the NVSP (National Voter\'s Service Portal) or ECI website to ensure your name is registered in the voter list for your constituency.' },
  { id: 2, title: 'Get Your EPIC Card', content: 'Ensure you have your Voter ID card (EPIC). If not, you can apply online via Form 6. You can also use alternatives like Aadhaar or PAN card if your name is on the roll.' },
  { id: 3, title: 'Research Candidates & NOTA', content: 'Know your candidates by reviewing their affidavits on the KYC (Know Your Candidate) app. Remember, you also have the option to press NOTA (None of the Above).' },
  { id: 4, title: 'Find Your Polling Booth', content: 'Use the Voter Helpline App or the "Polling Stations" tab to find your exact booth location before election day.' },
  { id: 5, title: 'Understand EVMs & VVPATs', content: 'At the booth, press the blue button on the EVM against your chosen candidate. Check the VVPAT slip through the glass window for 7 seconds to verify your vote.' },
];

export default function Guide() {
  const [expanded, setExpanded] = useState(1);

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--accent-green)' }}>Voter's Step-by-Step Guide</h2>
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
                backgroundColor: expanded === step.id ? 'rgba(19, 136, 8, 0.05)' : 'var(--bg-secondary)',
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
                <span style={{ color: 'var(--accent-saffron)', marginRight: '1rem' }}>{step.id}.</span>
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
