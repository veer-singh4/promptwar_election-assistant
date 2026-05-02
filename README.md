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
- The application is a Single Page Application (SPA) built using **React** and **Vite**.
- **Performance & Size**: To maintain a repository size under 10 MB, we avoided bloated CSS frameworks. We used highly optimized libraries: `qrcode.react` for pass generation and `leaflet` for mapping.
- **Google Services Integration**: The application architecture is designed to integrate **Google Maps API** (currently using open-source fallback to ensure functionality without keys) and **Google Gemini/Vision API** for smart chat assistance and ID OCR extraction.
- **Aesthetic**: The application features a premium dark mode with a patriotic Saffron, White, and Green color scheme.

## 📝 Assumptions Made
- The primary target audience is Indian voters (focusing on Lok Sabha and State Assembly elections).
- The Polling Officer backend relies on the assumption that a secure, centralized database exists to check for duplicates in real-time.
- For demonstration purposes, the OCR extraction and Database duplication checks are simulated locally.

## 🚀 Running Locally
1. Clone the repository.
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser to the local dev server link.

*Note: Upload any image file in the Voter Portal to simulate the ID OCR process.*
