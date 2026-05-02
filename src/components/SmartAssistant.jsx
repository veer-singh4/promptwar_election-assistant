import { useState, useRef, useEffect, memo } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DOMPurify from 'dompurify';
import { useElection } from '../context/ElectionContext';
import { Bot, User, Send, Loader2 } from 'lucide-react';

const SmartAssistant = memo(function SmartAssistant() {
  const { telemetry } = useElection();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am your Bharat Election Smart Assistant. I have live access to polling station telemetry. How can I help you today?' }
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
    const sanitizedInput = DOMPurify.sanitize(input.trim());
    if (!sanitizedInput) return;

    const userMessage = { role: 'user', content: sanitizedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const genAI = new GoogleGenerativeAI(apiKey);
      
      // CONTEXT INJECTION: Give Gemini live telemetry
      const contextString = `
        CURRENT ELECTION STATE:
        - Total Turnout: ${telemetry.totalTurnout}%
        - Last Update: ${telemetry.lastUpdate}
        - Booth Status: ${telemetry.booths.map(b => `${b.name}: ${b.status} (${b.waitTime}m wait)`).join(', ')}
      `;

      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: `You are the 'Bharat Election Smart Assistant'. Use the following LIVE TELEMETRY to answer voter queries: ${contextString}. 
        Always be non-partisan, encouraging, and accurate. If a booth is 'Busy', suggest the voter wait or check if other booths are 'Optimal'.`
      });

      const result = await model.generateContent(sanitizedInput);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      setIsLoading(false);
      
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Namaste! I encountered an issue. Please try again.` }]);
      setIsLoading(false);
    }
  };

  return (
    <section className="card" style={{ maxWidth: '900px', margin: '0 auto', height: '700px', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)' }}>
      <header style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(251,140,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Bot color="var(--accent-saffron)" size={32} />
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>AI Election Command</h2>
            <small style={{ color: 'var(--accent-green)' }}>Live Telemetry Active • Gemini 2.5 Flash</small>
          </div>
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            gap: '1rem', 
            flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
            alignItems: 'flex-start'
          }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', 
              background: m.role === 'user' ? 'var(--accent-saffron)' : 'var(--bg-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {m.role === 'user' ? <User size={18} color="white" /> : <Bot size={18} color="var(--accent-saffron)" />}
            </div>
            <div style={{ 
              maxWidth: '75%',
              padding: '1rem',
              borderRadius: '1rem',
              background: m.role === 'user' ? 'var(--accent-saffron)' : 'var(--bg-primary)',
              color: m.role === 'user' ? 'white' : 'var(--text-primary)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              lineHeight: '1.5'
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <Loader2 className="animate-spin" size={18} />
            <span>Consulting Election Database...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about live turnout, booth wait times, or voting rules..."
          style={{ flex: 1, padding: '0.8rem 1.2rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }}
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', width: '50px', height: '50px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Send size={20} />
        </button>
      </form>
    </section>
  );
});

export default SmartAssistant;

