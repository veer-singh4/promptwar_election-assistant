import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

export default function VoterPortal() {
  const [file, setFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [voterData, setVoterData] = useState(null);

  const MAP_ID = 'DEMO_MAP_ID'; // Using demo ID for basic markers
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsExtracting(true);

    // Simulate Google Cloud Vision API / Gemini OCR
    setTimeout(() => {
      // Mock Extracted Data
      setVoterData({
        name: "Rahul Sharma",
        idNumber: "ABC1234567",
        state: "Delhi",
        constituency: "New Delhi",
        pollingBooth: "KV School, Gole Market",
        location: { lat: 28.6328, lng: 77.2015 } // Correct format for Google Maps
      });
      setIsExtracting(false);
    }, 2500);
  };

  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {!voterData ? (
        <section className="card text-center animate-fade-in" aria-labelledby="verification-title">
          <h2 id="verification-title" style={{ color: 'var(--accent-saffron)', marginBottom: '1rem' }}>Digital Voter Verification</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Upload your Aadhaar or Voter ID. Our AI will securely extract your details to assign your polling booth and generate your Digital Entry Pass.
          </p>
          
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div 
              role="presentation"
              style={{ 
                border: '2px dashed var(--border-color)', 
                padding: '3rem', 
                borderRadius: 'var(--radius-md)',
                width: '100%',
                maxWidth: '500px',
                backgroundColor: 'var(--bg-primary)'
              }}
            >
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                aria-label="Upload Voter ID Image"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!file || isExtracting}
              aria-label={isExtracting ? 'Analyzing your ID card' : 'Verify ID Card'}
              style={{ width: '200px' }}
            >
              {isExtracting ? 'Analyzing ID...' : 'Verify ID'}
            </button>
          </form>
        </section>
      ) : (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Digital Pass Section */}
          <section className="card text-center" aria-labelledby="pass-title" style={{ borderTop: '4px solid var(--accent-green)' }}>
            <h3 id="pass-title" style={{ color: 'var(--accent-green)', marginBottom: '1rem' }}>Digital Entry Pass</h3>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem' }}>
              <QRCodeSVG 
                value={JSON.stringify(voterData)} 
                size={200} 
                aria-label="QR Code containing your voter registration details"
              />
            </div>
            <div style={{ textAlign: 'left', padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
              <p><strong>Name:</strong> {voterData.name}</p>
              <p><strong>Voter ID:</strong> {voterData.idNumber}</p>
              <p><strong>State:</strong> {voterData.state}</p>
              <p><strong>Constituency:</strong> {voterData.constituency}</p>
            </div>
            <p style={{ color: 'var(--warning)', marginTop: '1rem', fontSize: '0.9rem' }}>
              Show this QR code at the polling booth for rapid verification.
            </p>
          </section>

          {/* Map Section */}
          <section className="card" aria-labelledby="map-title" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 id="map-title" style={{ color: 'var(--accent-saffron)', marginBottom: '1rem' }}>Your Polling Booth</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              📍 <strong>{voterData.pollingBooth}</strong>
            </p>
            <div style={{ flex: 1, borderRadius: 'var(--radius-md)', overflow: 'hidden', minHeight: '300px', border: '1px solid var(--border-color)' }}>
              <APIProvider apiKey={API_KEY}>
                <Map
                  defaultCenter={voterData.location}
                  defaultZoom={15}
                  mapId={MAP_ID}
                  fullscreenControl={false}
                  streetViewControl={true}
                  aria-label="Interactive Map showing your polling booth location"
                >
                  <AdvancedMarker position={voterData.location} title={voterData.pollingBooth}>
                    <Pin background={'#fb8c00'} glyphColor={'#fff'} borderColor={'#e65100'} />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            </div>
          </section>
          
        </div>
      )}
    </main>
  );
}
