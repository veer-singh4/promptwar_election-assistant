import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ElectionProvider } from './context/ElectionContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ElectionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ElectionProvider>
  </StrictMode>,
)
