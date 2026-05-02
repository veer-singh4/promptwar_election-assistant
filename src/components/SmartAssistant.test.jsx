import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ElectionProvider } from '../context/ElectionContext';
import SmartAssistant from './SmartAssistant';

const renderWithProvider = (ui) => {
  return render(
    <ElectionProvider>
      {ui}
    </ElectionProvider>
  );
};

describe('SmartAssistant Component', () => {
  it('renders the initial assistant message', () => {
    renderWithProvider(<SmartAssistant />);
    expect(screen.getByText(/Bharat Election Smart Assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Election Command/i)).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    renderWithProvider(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Ask about live turnout/i);
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    expect(input.value).toBe('How do I vote?');
  });

  it('shows loading state when sending a message', async () => {
    renderWithProvider(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Ask about live turnout/i);
    const form = screen.getByRole('textbox').closest('form');
    
    fireEvent.change(input, { target: { value: 'Phase 1 turnout?' } });
    fireEvent.submit(form);

    expect(screen.getByText(/Consulting Election Database/i)).toBeInTheDocument();
  });
});
