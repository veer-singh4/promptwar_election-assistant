import { useState, useRef, useEffect } from 'react';

export default function SmartAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am your Bharat Election Smart Assistant, powered by Google Gemini. Ask me about the Lok Sabha, Rajya Sabha, EVMs, or polling phases!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Server error');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error communicating with AI service:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Namaste! I encountered an issue: ${error.message}. Please try again shortly.` }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', height: '600px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '2rem' }}>🤖</div>
        <div>
          <h2 style={{ margin: 0, color: 'var(--accent-saffron)' }}>Gemini Assistant</h2>
          <small style={{ color: 'var(--accent-green)' }}>Powered by Google Gemini</small>
        </div>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              borderBottomRightRadius: msg.role === 'user' ? '0' : 'var(--radius-md)',
              borderBottomLeftRadius: msg.role === 'assistant' ? '0' : 'var(--radius-md)',
              border: `1px solid ${msg.role === 'user' ? 'var(--accent-green)' : 'var(--border-color)'}`,
              maxWidth: '80%',
              lineHeight: '1.5'
            }}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', borderBottomLeftRadius: '0' }}>
            <span style={{ display: 'inline-block', animation: 'bounce 1s infinite' }}>...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Lok Sabha, EVMs, or phases..." 
          style={{ 
            flex: 1, 
            padding: '1rem', 
            borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            outline: 'none',
            fontSize: '1rem'
          }}
        />
        <button type="submit" className="btn btn-primary">
          Ask
        </button>
      </form>
    </div>
  );
}
