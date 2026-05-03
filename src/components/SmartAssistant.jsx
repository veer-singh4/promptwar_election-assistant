import { useState, useRef, useEffect, memo } from 'react';
import { useElection } from '../context/ElectionContext';
import { useGemini } from '../hooks/useGemini';
import { Bot, User, Send, Loader2 } from 'lucide-react';

const SmartAssistant = memo(function SmartAssistant() {
  const { telemetry } = useElection();
  const { messages, isLoading, sendMessage } = useGemini(telemetry);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <section
      className="card"
      aria-labelledby="ai-assistant-title"
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        height: '700px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-color)',
      }}
    >
      <header
        style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(251,140,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Bot color="var(--accent-saffron)" size={32} aria-hidden="true" />
          <div>
            <h2 id="ai-assistant-title" style={{ margin: 0, fontSize: '1.25rem' }}>
              AI Election Command
            </h2>
            <small style={{ color: 'var(--accent-green)' }}>
              Live Telemetry Active • Gemini 2.5 Flash
            </small>
          </div>
        </div>
      </header>

      {/* aria-live="polite" ensures screen readers announce new messages */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation with AI Election Assistant"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '1rem',
              flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                flexShrink: 0,
                background: m.role === 'user' ? 'var(--accent-saffron)' : 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {m.role === 'user' ? (
                <User size={18} color="white" />
              ) : (
                <Bot size={18} color="var(--accent-saffron)" />
              )}
            </div>
            <div
              style={{
                maxWidth: '75%',
                padding: '1rem',
                borderRadius: '1rem',
                background: m.role === 'user' ? 'var(--accent-saffron)' : 'var(--bg-primary)',
                color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div
            role="status"
            aria-label="Loading AI response"
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)' }}
          >
            <Loader2 className="animate-spin" size={18} aria-hidden="true" />
            <span>Consulting Election Database...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: '1.5rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          gap: '1rem',
        }}
      >
        <label htmlFor="ai-chat-input" className="sr-only">
          Ask the AI Election Assistant
        </label>
        <input
          id="ai-chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about live turnout, booth wait times, or voting rules..."
          autoComplete="off"
          style={{
            flex: 1,
            padding: '0.8rem 1.2rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn btn-primary"
          aria-label="Send message to AI assistant"
          style={{
            borderRadius: 'var(--radius-full)',
            width: '50px',
            height: '50px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Send size={20} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
});

export default SmartAssistant;
