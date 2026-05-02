import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  ShieldCheck, AlertTriangle, Users, Clock, LogOut, 
  Scan, Fingerprint, Database, CheckCircle2 
} from 'lucide-react';
import { useElection } from '../context/ElectionContext';

const COLORS = ['#fb8c00', '#ffffff', '#4caf50'];

export default function OfficerPortal() {
  const { telemetry, addAlert, setUserRole } = useElection();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scanState, setScanState] = useState('idle');
  const [scannedData, setScannedData] = useState(null);

  // Analytics Data derived from Context
  const chartData = useMemo(() => telemetry.booths.map(b => ({
    name: b.id,
    Load: b.load,
    Wait: b.waitTime
  })), [telemetry.booths]);

  const turnoutData = [
    { name: 'Voted', value: telemetry.totalTurnout },
    { name: 'Remaining', value: 100 - telemetry.totalTurnout }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const simulateScan = (type) => {
    setScanState(`scanning_${type}`);
    setTimeout(() => {
      const mockData = { name: "Rahul Sharma", idNumber: "ABC1234567" };
      setScannedData(mockData);
      const isDuplicate = Math.random() > 0.85; 
      if (isDuplicate) {
        setScanState('duplicate');
        addAlert(`SECURITY ALERT: Potential duplicate vote attempt at ST-101`);
      } else {
        setScanState('verified');
      }
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <main className="card animate-fade-in" style={{ maxWidth: '400px', margin: '4rem auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <ShieldCheck size={48} color="var(--accent-saffron)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ color: 'var(--accent-saffron)' }}>Officer Authentication</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Secure biometric gateway</p>
        </header>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <input type="text" placeholder="Badge ID (e.g. PO-8921)" required className="form-input" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Passcode" required className="form-input" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Enter Control Center
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '4rem' }}>
      
      {/* Top Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <Users color="var(--accent-saffron)" />
          <div>
            <small style={{ color: 'var(--text-secondary)', display: 'block' }}>Live Turnout</small>
            <strong style={{ fontSize: '1.2rem' }}>{telemetry.totalTurnout}%</strong>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <Clock color="var(--accent-green)" />
          <div>
            <small style={{ color: 'var(--text-secondary)', display: 'block' }}>Avg. Wait Time</small>
            <strong style={{ fontSize: '1.2rem' }}>14 mins</strong>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <ShieldCheck color="var(--accent-saffron)" />
          <div>
            <small style={{ color: 'var(--text-secondary)', display: 'block' }}>Security Status</small>
            <strong style={{ fontSize: '1.2rem', color: 'var(--accent-green)' }}>ACTIVE</strong>
          </div>
        </div>
        <button onClick={() => { setIsLoggedIn(false); setUserRole(null); }} className="btn btn-secondary" style={{ padding: '0.5rem' }}>
          <LogOut size={20} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        
        {/* Verification Terminal */}
        <section className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '450px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Database size={20} color="var(--accent-saffron)" />
            <h3 style={{ margin: 0 }}>Identity Terminal</h3>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            {scanState === 'idle' && (
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button onClick={() => simulateScan('qr')} className="btn btn-primary" style={{ padding: '2rem', flexDirection: 'column', gap: '0.5rem', width: '160px' }}>
                  <Scan size={32} />
                  QR Scan
                </button>
                <button onClick={() => simulateScan('finger')} className="btn btn-secondary" style={{ padding: '2rem', flexDirection: 'column', gap: '0.5rem', width: '160px' }}>
                  <Fingerprint size={32} />
                  Biometric
                </button>
              </div>
            )}

            {(scanState === 'scanning_qr' || scanState === 'scanning_finger') && (
              <div className="animate-pulse">
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📡</div>
                <h3 style={{ color: 'var(--accent-saffron)' }}>Verifying...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Querying Central Database</p>
              </div>
            )}

            {scanState === 'verified' && (
              <div className="animate-fade-in">
                <CheckCircle2 size={64} color="var(--accent-green)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--accent-green)' }}>Verified Successfully</h3>
                <div style={{ background: 'rgba(76,175,80,0.1)', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0' }}>
                  <p><strong>Voter:</strong> {scannedData.name}</p>
                  <p><strong>ID:</strong> {scannedData.idNumber}</p>
                </div>
                <button onClick={() => setScanState('idle')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Next Entry</button>
              </div>
            )}

            {scanState === 'duplicate' && (
              <div className="animate-bounce">
                <AlertTriangle size={64} color="#ff3e3e" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: '#ff3e3e' }}>DUPLICATE DETECTED</h3>
                <p style={{ background: 'rgba(255,62,62,0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #ff3e3e' }}>
                  UID: {scannedData.idNumber} - Already Voted at 10:15 AM
                </p>
                <button onClick={() => setScanState('idle')} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Reset Alarm</button>
              </div>
            )}
          </div>
        </section>

        {/* Real-time Analytics */}
        <section className="card" style={{ minHeight: '450px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Database size={20} color="var(--accent-green)" />
            <h3 style={{ margin: 0 }}>Booth Metrics (Live)</h3>
          </div>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                  itemStyle={{ color: 'var(--accent-saffron)' }}
                />
                <Bar dataKey="Load" fill="var(--accent-saffron)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Wait" fill="var(--accent-green)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

    </main>
  );
}

