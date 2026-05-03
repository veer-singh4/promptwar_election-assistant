import { GoogleGenerativeAI } from '@google/generative-ai';

let genAIInstance = null;

/**
 * Returns a singleton GoogleGenerativeAI instance.
 * Avoids re-instantiating the SDK on every call.
 */
function getGenAI() {
  if (!genAIInstance) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey.length < 10) {
      throw new Error('API_KEY_MISSING');
    }
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
}

/**
 * Asks the Bharat Election Smart Assistant a question with live telemetry context.
 * @param {string} query - The user's sanitized question.
 * @param {object} telemetry - Live election telemetry from ElectionContext.
 * @returns {Promise<string>} - The AI's response text.
 */
export async function askElectionAssistant(query, telemetry) {
  const genAI = getGenAI();
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const boothStatus = telemetry.booths
    .map((b) => `${b.name}: ${b.status} (${b.waitTime}m wait, ${b.load}% load)`)
    .join('; ');

  const fullPrompt = `
You are the 'Bharat Election Smart Assistant', an official AI for the Indian Election Commission.

LIVE TELEMETRY (as of ${telemetry.lastUpdate}):
- National Voter Turnout: ${telemetry.totalTurnout}%
- Polling Booth Status: ${boothStatus}

INSTRUCTIONS:
- Be non-partisan, accurate, and encouraging.
- If a booth is 'Busy', suggest visiting an 'Optimal' booth instead.
- Keep responses concise and helpful for first-time voters.
- Never discuss politics, candidates, or parties.

VOTER QUERY: ${query}
  `.trim();

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = response.text();

  if (!text) {
    throw new Error('EMPTY_RESPONSE');
  }

  return text;
}
