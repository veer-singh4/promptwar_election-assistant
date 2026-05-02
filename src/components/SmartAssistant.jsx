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
