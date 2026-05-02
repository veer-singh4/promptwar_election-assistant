import { useState } from 'react';

export default function OfficerPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scanState, setScanState] = useState('idle'); // idle, scanning_qr, scanning_finger, verified, duplicate
  const [scannedData, setScannedData] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const simulateScan = (type) => {
    setScanState(`scanning_${type}`);
    
    setTimeout(() => {
      // Simulate reading data
      const mockData = { name: "Rahul Sharma", idNumber: "ABC1234567" };
      setScannedData(mockData);
      
      // Simulate checking central database for duplicates (random outcome for demo)
      const isDuplicate = Math.random() > 0.7; // 30% chance to flag as duplicate
      
      if (isDuplicate) {
        setScanState('duplicate');
      } else {
        setScanState('verified');
      }
    }, 2000);
  };

  const resetScanner = () => {
    setScanState('idle');
    setScannedData(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="card animate-fade-in" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--accent-saffron)', marginBottom: '2rem' }}>Officer Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Officer ID (e.g. PO-8921)" 
            required
            style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <input 
            type="password" 
            placeholder="Secure Password" 
            required
            style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
          />
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Authenticate
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="card animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderLeft: '4px solid var(--accent-saffron)' }}>
        <div>
          <h3 style={{ margin: 0 }}>Polling Station: KV School, Gole Market</h3>
          <small style={{ color: 'var(--text-secondary)' }}>Officer ID: PO-8921 | Status: Active</small>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="btn btn-secondary">Logout</button>
      </div>

      <div className="card text-center animate-fade-in" style={{ padding: '3rem' }}>
        
        {scanState === 'idle' && (
          <>
            <h2 style={{ marginBottom: '2rem' }}>Identity Verification Terminal</h2>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <button onClick={() => simulateScan('qr')} className="btn btn-primary" style={{ padding: '1.5rem 2rem', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>📱</span>
                Scan QR Pass
              </button>
              <button onClick={() => simulateScan('finger')} className="btn btn-secondary" style={{ padding: '1.5rem 2rem', flexDirection: 'column', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>👆</span>
                Scan Fingerprint
              </button>
            </div>
          </>
        )}

        {(scanState === 'scanning_qr' || scanState === 'scanning_finger') && (
          <div style={{ padding: '4rem 0' }}>
            <h3 style={{ color: 'var(--accent-saffron)' }}>
              {scanState === 'scanning_qr' ? 'Scanning QR Code...' : 'Scanning Biometrics...'}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>Verifying against Central Election Database...</p>
          </div>
        )}

        {scanState === 'verified' && (
          <div style={{ padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', color: 'var(--accent-green)', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ color: 'var(--accent-green)' }}>Verification Successful</h2>
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', margin: '1rem 0' }}>
              <p><strong>Voter:</strong> {scannedData.name}</p>
              <p><strong>ID:</strong> {scannedData.idNumber}</p>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Voter is eligible to cast their vote.</p>
            <button onClick={resetScanner} className="btn btn-primary">Process Next Voter</button>
          </div>
        )}

        {scanState === 'duplicate' && (
          <div style={{ padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', color: 'var(--danger)', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ color: 'var(--danger)' }}>DUPLICATE VOTE ATTEMPT DETECTED</h2>
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', margin: '1rem 0', border: '1px solid var(--danger)' }}>
              <p><strong>Voter:</strong> {scannedData.name}</p>
              <p><strong>ID:</strong> {scannedData.idNumber}</p>
              <p style={{ color: 'var(--danger)', marginTop: '0.5rem' }}><strong>Record shows vote already cast at 09:42 AM today.</strong></p>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Please detain the individual and contact security.</p>
            <button onClick={resetScanner} className="btn btn-secondary">Clear Alert & Proceed</button>
          </div>
        )}
      </div>
    </div>
  );
}
