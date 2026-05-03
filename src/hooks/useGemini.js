import { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';
import { askElectionAssistant } from '../services/geminiService';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Namaste! I am your Bharat Election Smart Assistant. I have live access to polling station telemetry. How can I help you today?',
};

const ERROR_MESSAGES = {
  API_KEY_MISSING: 'System Error: AI Key missing. Ensure VITE_GEMINI_API_KEY is set in GitHub Secrets.',
  EMPTY_RESPONSE: 'Namaste! The AI could not generate a response. This may be due to safety filters. Please rephrase your query.',
  '403': 'Error 403: Access Denied. Ensure the Generative Language API is enabled in GCP.',
  '429': 'Error 429: Rate limit exceeded. Please wait a moment and try again.',
  safety: 'Namaste! I cannot answer that query due to safety guidelines. Please ask about election logistics.',
  default: 'Namaste! I encountered an issue processing your request. Please try again.',
};

function getErrorMessage(error) {
  const str = error.message + error.toString();
  if (str.includes('API_KEY_MISSING')) return ERROR_MESSAGES.API_KEY_MISSING;
  if (str.includes('EMPTY_RESPONSE')) return ERROR_MESSAGES.EMPTY_RESPONSE;
  if (str.includes('403') || str.includes('PERMISSION_DENIED')) return ERROR_MESSAGES['403'];
  if (str.includes('429')) return ERROR_MESSAGES['429'];
  if (str.includes('safety') || str.includes('SAFETY')) return ERROR_MESSAGES.safety;
  return ERROR_MESSAGES.default;
}

export function useGemini(telemetry) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (rawInput) => {
      const sanitizedInput = DOMPurify.sanitize(rawInput.trim());
      if (!sanitizedInput || isLoading) return;

      setMessages((prev) => [...prev, { role: 'user', content: sanitizedInput }]);
      setIsLoading(true);

      try {
        const responseText = await askElectionAssistant(sanitizedInput, telemetry);
        // Sanitize AI response before display to prevent XSS
        const safeResponse = DOMPurify.sanitize(responseText);
        setMessages((prev) => [...prev, { role: 'assistant', content: safeResponse }]);
      } catch (error) {
        console.error('Bharat Election IQ — AI Error:', error);
        setMessages((prev) => [...prev, { role: 'assistant', content: getErrorMessage(error) }]);
      } finally {
        setIsLoading(false);
      }
    },
    [telemetry, isLoading]
  );

  return { messages, isLoading, sendMessage };
}
