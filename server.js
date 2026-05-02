import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { VertexAI } from '@google-cloud/vertexai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Vertex AI Configuration
const project = 'gen-ai-academy-491610';
const location = 'us-central1';
const vertexAI = new VertexAI({ project: project, location: location });

const generativeModel = vertexAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction: {
    role: 'system',
    parts: [{ text: "You are the 'Bharat Election Smart Assistant'. Provide accurate, helpful, and non-partisan information about the Indian democratic process (Lok Sabha, Rajya Sabha, EVMs, VVPATs, polling phases, voter rights). Be respectful and encourage participation." }]
  }
});

// API Endpoint for Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chat = generativeModel.startChat();
    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.candidates[0].content.parts[0].text;

    res.json({ text });
  } catch (error) {
    console.error('Error in Vertex AI chat:', error);
    res.status(500).json({ error: 'Failed to communicate with AI service', details: error.message });
  }
});

// Fallback to serve index.html for SPA routing (must be last)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
