import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API Key is missing. Please check your environment variables.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are the 'Bharat Election Smart Assistant'. Your goal is to provide accurate, helpful, and non-partisan information about the Indian democratic process, including Lok Sabha, Rajya Sabha, EVMs, VVPATs, polling phases, and voter rights. Always be respectful and encourage democratic participation. If asked about a specific constituency that you don't have real-time data for, advise visiting the ECI website."
      });

      const result = await model.generateContent(input);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Namaste! I encountered an issue: ${error.message}. Please check the API key or model availability.` }]);
      setIsLoading(false);
    }
  };

  return (
    <section className="card" aria-labelledby="assistant-title" style={{ maxWidth: '800px', margin: '0 auto', height: '600px', display: 'flex', flexDirection: 'column' }}>
      <header style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div role="img" aria-label="Robot Icon" style={{ fontSize: '2rem' }}>🤖</div>
        <div>
          <h2 id="assistant-title" style={{ margin: 0, color: 'var(--accent-saffron)' }}>Gemini Assistant</h2>
          <small style={{ color: 'var(--accent-green)' }}>Powered by Google Gemini 2.5 Flash</small>
        </div>
      </header>

      <div 
        aria-live="polite"
        style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            backgroundColor: m.role === 'user' ? 'var(--accent-saffron)' : 'var(--card-bg)',
            color: m.role === 'user' ? 'white' : 'var(--text-color)',
            padding: '0.75rem 1rem',
            borderRadius: '1rem',
            border: m.role === 'user' ? 'none' : '1px solid var(--border-color)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--accent-green)', fontStyle: 'italic' }}>
            Assistant is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Indian elections..."
          aria-label="Election question input"
          style={{ 
            flex: 1,
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-color)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isLoading}
          aria-label="Send message"
          style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </section>
  );
}
