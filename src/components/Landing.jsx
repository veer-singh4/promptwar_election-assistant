import { User, ShieldCheck, CheckCircle, Map, Zap } from 'lucide-react';

export default function Landing({ setRole }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(90deg, var(--accent-saffron), var(--accent-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Empowering Every Vote
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Welcome to Bharat Election IQ. Experience the world's largest democratic process through AI-powered guidance and high-security digital verification.
        </p>
      </section>

      {/* Role Selection */}
      <section style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div 
          className="card" 
          style={{ width: '380px', cursor: 'pointer', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', borderBottom: '4px solid var(--accent-green)' }}
          onClick={() => setRole('voter')}
        >
          <div style={{ padding: '1.5rem', background: 'rgba(19, 136, 8, 0.1)', borderRadius: '2rem' }}>
            <User size={48} color="var(--accent-green)" />
          </div>
          <div>
            <h3 style={{ color: 'var(--accent-green)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Voter Portal</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Find your booth, verify your ID, and generate your secure digital entry pass in seconds.
            </p>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%' }}>Access Portal</button>
        </div>

        <div 
          className="card" 
          style={{ width: '380px', cursor: 'pointer', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', borderBottom: '4px solid var(--accent-saffron)' }}
          onClick={() => setRole('officer')}
        >
          <div style={{ padding: '1.5rem', background: 'rgba(251, 140, 0, 0.1)', borderRadius: '2rem' }}>
            <ShieldCheck size={48} color="var(--accent-saffron)" />
          </div>
          <div>
            <h3 style={{ color: 'var(--accent-saffron)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Officer Command</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Advanced security dashboard for polling officers to verify voters and manage live station metrics.
            </p>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>Login to Console</button>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', padding: '2rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
          <Zap size={20} color="var(--accent-saffron)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Powered by Gemini 2.5 Flash</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
          <Map size={20} color="var(--accent-blue)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Google Maps Integrated</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
          <CheckCircle size={20} color="var(--accent-green)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Zero-Touch Digital Passes</span>
        </div>
      </section>

    </div>
  );
}

