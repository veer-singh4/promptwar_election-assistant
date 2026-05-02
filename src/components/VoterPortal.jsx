import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet markers in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function VoterPortal() {
  const [file, setFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [voterData, setVoterData] = useState(null);

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
        coordinates: [28.6328, 77.2015] // LatLng for map
      });
      setIsExtracting(false);
    }, 2500);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {!voterData ? (
        <div className="card text-center animate-fade-in">
          <h2 style={{ color: 'var(--accent-saffron)', marginBottom: '1rem' }}>Digital Voter Verification</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Upload your Aadhaar or Voter ID. Our AI will securely extract your details to assign your polling booth and generate your Digital Entry Pass.
          </p>
          
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ 
              border: '2px dashed var(--border-color)', 
              padding: '3rem', 
              borderRadius: 'var(--radius-md)',
              width: '100%',
              maxWidth: '500px',
              backgroundColor: 'var(--bg-primary)'
            }}>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ color: 'var(--text-primary)' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!file || isExtracting}
              style={{ width: '200px' }}
            >
              {isExtracting ? 'Analyzing ID...' : 'Verify ID'}
            </button>
          </form>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Digital Pass Section */}
          <div className="card text-center" style={{ borderTop: '4px solid var(--accent-green)' }}>
            <h3 style={{ color: 'var(--accent-green)', marginBottom: '1rem' }}>Digital Entry Pass</h3>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem' }}>
              <QRCodeSVG value={JSON.stringify(voterData)} size={200} />
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
          </div>

          {/* Map Section */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: 'var(--accent-saffron)', marginBottom: '1rem' }}>Your Polling Booth</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              📍 <strong>{voterData.pollingBooth}</strong>
            </p>
            <div style={{ flex: 1, borderRadius: 'var(--radius-md)', overflow: 'hidden', minHeight: '300px' }}>
              <MapContainer center={voterData.coordinates} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={voterData.coordinates}>
                  <Popup>
                    {voterData.pollingBooth} <br /> Your assigned booth.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
