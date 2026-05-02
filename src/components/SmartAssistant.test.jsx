import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SmartAssistant from './SmartAssistant';

// Mock the global fetch
global.fetch = vi.fn();

describe('SmartAssistant Component', () => {
  it('renders the initial assistant message', () => {
    render(<SmartAssistant />);
    expect(screen.getByText(/Bharat Election Smart Assistant/i)).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about Indian elections/i);
    fireEvent.change(input, { target: { value: 'What is an EVM?' } });
    expect(input.value).toBe('What is an EVM?');
  });

  it('shows loading state when sending a message', async () => {
    render(<SmartAssistant />);
    const input = screen.getByPlaceholderText(/Ask anything about Indian elections/i);
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(button);

    expect(screen.getByText(/Assistant is thinking/i)).toBeInTheDocument();
  });
});
