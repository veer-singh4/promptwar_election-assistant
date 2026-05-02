# Bharat Election IQ - Hack2Skill Submission

Welcome to **Bharat Election IQ**, a Universal Election Super App designed to empower Indian citizens and secure the voting process. 

This project is a final submission for the **Hack2Skill** challenge.

## 🎯 Chosen Vertical
**Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.**

*We expanded this vertical to create a "Two-Face" application that handles both the Voter's journey and the Polling Officer's security protocol.*

## 💡 Approach and Logic
Our approach was to build an end-to-end election platform. The logic is split into two distinct portals:
1. **Voter / Candidate Portal**: Citizens need to know where to vote and need to verify their identity. We simulated a Google Cloud Vision OCR flow where a user uploads their ID, the AI extracts their constituency, and automatically plots their polling booth on an interactive map using `react-leaflet`. It then generates a unique QR Digital Entry Pass.
2. **Polling Officer Portal**: Security is paramount. We built a mock officer dashboard where officials can scan the Voter's QR pass or fingerprint. The logic cross-references a simulated central database to prevent duplicate voting ("One Person, One Vote").

## ⚙️ How the Solution Works
- **Architecture**: Single Page Application (SPA) built using **React** and **Vite**.
- **Performance & Size**: To maintain a repository size under 10 MB, we used optimized libraries like `qrcode.react` and `leaflet`.
- **Google Services Integration**: The application integrates **Google Gemini 1.5 Flash** for smart chat assistance.
- **Aesthetic**: A premium dark mode featuring a patriotic Saffron, White, and Green theme.

---

## 🛠️ Deployment & Environment
This app is deployed on **Google Cloud Run** using a GitHub Actions CI/CD pipeline.

### Environment Variables
- `VITE_GEMINI_API_KEY`: Required for the AI Smart Assistant (Gemini 1.5 Flash).

---

## ✅ Verification & Testing Guide
Follow these steps to test the "Two-Face" architecture:

### 1. Voter / Candidate Portal
*   **Navigate:** Click "Voter / Candidate" card.
*   **ID Verification:** Upload any image file (simulated OCR).
*   **Result:** System generates a **Digital QR Entry Pass** and loads an interactive **Leaflet Map** with your booth location.
*   **AI Assistant:** Use the "Assistant" tab to ask questions (e.g., *"What is VVPAT?"*).

### 2. Polling Officer Portal
*   **Navigate:** Click "Polling Officer" card.
*   **Login:** Click "Authenticate".
*   **Verification:** Click "Scan QR Pass".
*   **Result:** "Verification Successful" message confirms the secure entry protocol.

---

## 🏗️ Technical Stack
- **Frontend:** React + Vite
- **AI:** Google Gemini 1.5 Flash
- **Maps:** Leaflet.js (OpenStreetMap)
- **Deployment:** Docker + Google Cloud Run

## 📝 Assumptions Made
- The OCR extraction and Database duplication checks are simulated for demo purposes.
- The AI Assistant requires a valid `VITE_GEMINI_API_KEY` passed through the environment.

## 🚀 Running Locally
1. Clone the repository.
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser to the local dev server link.

*Note: Upload any image file in the Voter Portal to simulate the ID OCR process.*
