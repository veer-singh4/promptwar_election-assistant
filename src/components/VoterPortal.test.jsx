import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ElectionProvider } from '../context/ElectionContext';
import VoterPortal from './VoterPortal';

// Helper to render with the Election Context
const renderWithProvider = (ui) => {
  return render(
    <ElectionProvider>
      {ui}
    </ElectionProvider>
  );
};

// Mock the Google Maps API
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }) => <div>{children}</div>,
  Map: ({ children }) => <div data-testid="google-map">{children}</div>,
  AdvancedMarker: () => <div data-testid="map-marker" />,
  Pin: () => <div />,
}));

describe('VoterPortal Component', () => {
  it('renders the initial verification form', () => {
    renderWithProvider(<VoterPortal />);
    expect(screen.getByText(/Digital Voter Verification/i)).toBeInTheDocument();
  });

  it('shows extraction state when a file is uploaded and verified', async () => {
    renderWithProvider(<VoterPortal />);
    const file = new File(['hello'], 'id-card.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Upload Voter ID Image/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByText(/Verify ID/i));

    expect(screen.getByText(/Analyzing ID.../i)).toBeInTheDocument();
  });

  it('displays voter data and map after successful extraction', async () => {
    renderWithProvider(<VoterPortal />);
    
    const file = new File(['hello'], 'id-card.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText(/Upload Voter ID Image/i), { target: { files: [file] } });
    fireEvent.click(screen.getByText(/Verify ID/i));

    await waitFor(() => {
      expect(screen.getByText(/Digital Entry Pass/i)).toBeInTheDocument();
      expect(screen.getByText(/Rahul Sharma/i)).toBeInTheDocument();
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    }, { timeout: 4000 });
  });
});
