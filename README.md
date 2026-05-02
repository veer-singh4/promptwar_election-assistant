# Election IQ - Hack2Skill Submission

Welcome to **Election IQ**, an interactive, smart assistant designed to help voters understand the election process, timelines, and steps to make their voices heard. 

This project is a submission for the **Hack2Skill** challenge.

## 🎯 Chosen Vertical
**Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.**

## 💡 Approach and Logic
We approached this challenge with a focus on **usability, accessibility, and performance**. The goal was to break down the often complex and overwhelming election process into digestible, interactive pieces. 

The application is divided into three core pillars:
1. **Interactive Timeline**: Visualizing the election process from primaries to Inauguration Day.
2. **Step-by-Step Guide**: An accordion-based, easy-to-read guide that outlines the actions a voter needs to take (e.g., registering, finding polling places).
3. **Smart Assistant**: A chat interface integrated with Google Services (Gemini API architecture) to provide immediate, contextual answers to specific user questions.

## ⚙️ How the Solution Works
- The application is a Single Page Application (SPA) built using **React** and **Vite**.
- **Styling** is done using pure Vanilla CSS to ensure maximum performance and maintain a repository size well under the 10 MB limit (eliminating heavy CSS frameworks). 
- We implemented a premium, dark-mode aesthetic to improve readability and user engagement.
- The **Smart Assistant** module is designed to interact with the Google Gemini API to dynamically answer user queries. (Note: Fallbacks are implemented for demonstration purposes).

## 🔒 Focus Areas Addressed
- **Code Quality**: Component-based architecture, separation of concerns, and clean file structures.
- **Security**: No hardcoded API keys. Input is handled safely through React's native state management to prevent XSS.
- **Efficiency**: Bundle size is extremely minimal, ensuring fast load times.
- **Accessibility (A11y)**: Semantic HTML and high contrast ratios.
- **Google Services**: Integration architecture laid out for Google Gemini API to power the conversational assistant.

## 📝 Assumptions Made
- The user has a modern web browser to view the application.
- The primary target audience is US voters, though the architecture is scalable to any election system.
- To fully experience the live Gemini AI integration, a valid `VITE_GEMINI_API_KEY` must be provided in the `.env` file.

## 🚀 Running Locally
1. Clone the repository.
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser to the local dev server link.
