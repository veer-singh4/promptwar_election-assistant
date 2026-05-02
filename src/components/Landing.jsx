export default function Landing({ setRole }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent-saffron)' }}>Welcome to Bharat Election IQ</h2>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px' }}>
        The unified platform for Indian democratic processes. Please select your portal to continue.
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div 
          className="card" 
          style={{ width: '300px', cursor: 'pointer', borderTop: '4px solid var(--accent-green)' }}
          onClick={() => setRole('voter')}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧑‍🦱</div>
          <h3 style={{ color: 'var(--accent-green)' }}>Voter / Candidate</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Upload your ID, find your polling station, generate your digital QR pass, and access ECI guidelines.
          </p>
        </div>

        <div 
          className="card" 
          style={{ width: '300px', cursor: 'pointer', borderTop: '4px solid var(--accent-saffron)' }}
          onClick={() => setRole('officer')}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👮‍♂️</div>
          <h3 style={{ color: 'var(--accent-saffron)' }}>Polling Officer</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Secure login to scan digital QR passes, capture biometrics, and prevent duplicate voting at the booth.
          </p>
        </div>
      </div>
    </div>
  );
}
