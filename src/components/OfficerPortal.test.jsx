import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ElectionProvider } from '../context/ElectionContext';
import OfficerPortal from './OfficerPortal';

const renderWithProvider = (ui) => {
  return render(
    <ElectionProvider>
      {ui}
    </ElectionProvider>
  );
};

describe('OfficerPortal Component', () => {
  it('renders the officer login initially', () => {
    renderWithProvider(<OfficerPortal />);
    expect(screen.getByText(/Officer Authentication/i)).toBeInTheDocument();
  });

  it('allows login with any badge ID (simulated)', async () => {
    renderWithProvider(<OfficerPortal />);
    const input = screen.getByPlaceholderText(/Badge ID/i);
    const form = screen.getByRole('textbox').closest('form');
    
    fireEvent.change(input, { target: { value: 'PO-8921' } });
    fireEvent.submit(form);
    
    expect(await screen.findByText(/Booth Metrics \(Live\)/i, {}, { timeout: 4000 })).toBeInTheDocument();
  });

  it('handles scanning simulation', async () => {
    renderWithProvider(<OfficerPortal />);
    // Login first
    const input = screen.getByPlaceholderText(/Badge ID/i);
    const form = screen.getByRole('textbox').closest('form');
    fireEvent.change(input, { target: { value: 'PO-8921' } });
    fireEvent.submit(form);

    // Start Scan
    const scanBtn = await screen.findByText(/QR Scan/i, {}, { timeout: 4000 });
    fireEvent.click(scanBtn);
    expect(await screen.findByText(/Verifying.../i, {}, { timeout: 4000 })).toBeInTheDocument();

    // Verification result should appear
    await waitFor(() => {
      const isVerified = screen.queryByText(/Verified Successfully/i);
      const isDuplicate = screen.queryByText(/DUPLICATE DETECTED/i);
      expect(isVerified || isDuplicate).toBeTruthy();
    }, { timeout: 4000 });
  });
});
