import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ElectionProvider, useElection } from './ElectionContext';

// Test consumer component
function TestConsumer() {
  const { telemetry, addAlert } = useElection();
  return (
    <div>
      <p data-testid="turnout">{telemetry.totalTurnout}</p>
      <p data-testid="booth-count">{telemetry.booths.length}</p>
      <p data-testid="alert-count">{telemetry.alerts.length}</p>
      <button onClick={() => addAlert('Test alert message')}>Add Alert</button>
    </div>
  );
}

function BrokenConsumer() {
  useElection();
  return null;
}

describe('ElectionContext', () => {
  it('provides initial telemetry data', () => {
    render(
      <ElectionProvider>
        <TestConsumer />
      </ElectionProvider>
    );
    expect(parseFloat(screen.getByTestId('turnout').textContent)).toBeGreaterThan(0);
    expect(screen.getByTestId('booth-count').textContent).toBe('3');
  });

  it('addAlert adds a new alert to telemetry', async () => {
    render(
      <ElectionProvider>
        <TestConsumer />
      </ElectionProvider>
    );
    const initialCount = parseInt(screen.getByTestId('alert-count').textContent, 10);
    await act(async () => {
      screen.getByText('Add Alert').click();
    });
    expect(parseInt(screen.getByTestId('alert-count').textContent, 10)).toBe(initialCount + 1);
  });

  it('addAlert keeps a maximum of 5 alerts', async () => {
    render(
      <ElectionProvider>
        <TestConsumer />
      </ElectionProvider>
    );
    await act(async () => {
      for (let i = 0; i < 6; i++) {
        screen.getByText('Add Alert').click();
      }
    });
    expect(parseInt(screen.getByTestId('alert-count').textContent, 10)).toBeLessThanOrEqual(5);
  });

  it('throws an error when used outside ElectionProvider', () => {
    const consoleError = console.error;
    console.error = () => {};
    expect(() => render(<BrokenConsumer />)).toThrow('useElection must be used within an ElectionProvider');
    console.error = consoleError;
  });
});
