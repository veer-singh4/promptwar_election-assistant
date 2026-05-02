import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
  // Simulated Real-Time Election Telemetry
  const [telemetry, setTelemetry] = useState({
    totalTurnout: 42.8,
    lastUpdate: new Date().toISOString(),
    booths: [
      { id: 'ST-101', name: 'KV School, Gole Market', status: 'Optimal', waitTime: 8, load: 45 },
      { id: 'ST-102', name: 'Municipal Center, CP', status: 'Busy', waitTime: 25, load: 82 },
      { id: 'ST-103', name: 'Public Library, RK Puram', status: 'Moderate', waitTime: 12, load: 58 }
    ],
    alerts: [
      { id: 1, type: 'info', message: 'Phase 2 voting extension confirmed until 6:00 PM.' }
    ]
  });

  const [userRole, setUserRole] = useState(null);

  // Simulate live updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        totalTurnout: +(prev.totalTurnout + Math.random() * 0.2).toFixed(2),
        lastUpdate: new Date().toISOString(),
        booths: prev.booths.map(b => ({
          ...b,
          waitTime: Math.max(5, b.waitTime + Math.floor(Math.random() * 5 - 2)),
          load: Math.min(100, Math.max(10, b.load + Math.floor(Math.random() * 10 - 5)))
        }))
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const addAlert = useCallback((msg) => {
    setTelemetry(prev => ({
      ...prev,
      alerts: [{ id: Date.now(), type: 'warning', message: msg }, ...prev.alerts].slice(0, 5)
    }));
  }, []);

  return (
    <ElectionContext.Provider value={{ telemetry, addAlert, userRole, setUserRole }}>
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = () => {
  const context = useContext(ElectionContext);
  if (!context) throw new Error('useElection must be used within an ElectionProvider');
  return context;
};
