import { useState, useRef, useEffect } from 'react';

export default function SmartAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your Election IQ Smart Assistant, powered by Google Gemini. Ask me anything about the election process, polling locations, or candidate research!' }
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

    // Simulate Google Gemini API call
    try {
      // In a real application, we would call the Gemini API here.
      // Example: fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY, ...)
      
      setTimeout(() => {
        const responses = [
          "That's a great question! Voter registration deadlines vary by state. You can usually check your local Secretary of State website for exact dates.",
          "The Electoral College is how we elect the President. Each state has a certain number of electoral votes based on its Congressional representation.",
          "To find your polling place, you can use the Google Civic Information API or check your state's election website.",
          "You can research candidates by looking at non-partisan websites like Vote411.org or Ballotpedia."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error communicating with Gemini", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', height: '600px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '2rem' }}>🤖</div>
        <div>
          <h2 style={{ margin: 0 }}>Smart Assistant</h2>
          <small style={{ color: 'var(--success)' }}>Powered by Google Gemini</small>
        </div>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            style={{ 
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              borderBottomRightRadius: msg.role === 'user' ? '0' : 'var(--radius-md)',
              borderBottomLeftRadius: msg.role === 'assistant' ? '0' : 'var(--radius-md)',
              maxWidth: '80%',
              lineHeight: '1.5'
            }}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', borderBottomLeftRadius: '0' }}>
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
          placeholder="Ask a question about the election..." 
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
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}
