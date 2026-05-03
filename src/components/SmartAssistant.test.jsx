import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ElectionProvider } from '../context/ElectionContext';
import SmartAssistant from './SmartAssistant';

// Mock the entire gemini service to avoid real API calls in tests
vi.mock('../services/geminiService', () => ({
  askElectionAssistant: vi.fn().mockResolvedValue('The current turnout is 42.8%.'),
}));

const renderWithProvider = (ui) =>
  render(<ElectionProvider>{ui}</ElectionProvider>);

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
    fireEvent.change(input, { target: { value: 'Phase 1 turnout?' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText(/Consulting Election Database/i)).toBeInTheDocument();
  });

  it('does not submit when input is empty', () => {
    renderWithProvider(<SmartAssistant />);
    const button = screen.getByRole('button', { name: /Send message/i });
    expect(button).toBeDisabled();
  });

  it('send button is disabled while loading', async () => {
    renderWithProvider(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Ask about live turnout/i);
    fireEvent.change(input, { target: { value: 'Test query' } });
    fireEvent.submit(input.closest('form'));
    const button = screen.getByRole('button', { name: /Send message/i });
    expect(button).toBeDisabled();
  });

  it('displays AI response after successful send', async () => {
    renderWithProvider(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Ask about live turnout/i);
    fireEvent.change(input, { target: { value: 'What is the turnout?' } });
    fireEvent.submit(input.closest('form'));
    await waitFor(() => {
      expect(screen.getByText(/42.8%/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('displays an error message when AI call fails', async () => {
    const { askElectionAssistant } = await import('../services/geminiService');
    askElectionAssistant.mockRejectedValueOnce(new Error('429 Rate limit'));

    renderWithProvider(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Ask about live turnout/i);
    fireEvent.change(input, { target: { value: 'Will this fail?' } });
    fireEvent.submit(input.closest('form'));

    await waitFor(() => {
      expect(screen.getByText(/Rate limit exceeded/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('has a message log with aria-live for screen readers', () => {
    renderWithProvider(<SmartAssistant />);
    const log = screen.getByRole('log');
    expect(log).toHaveAttribute('aria-live', 'polite');
  });
});
