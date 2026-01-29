import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // This imports your Tailwind styles
import App from './App.jsx' // This imports your Routes and Components

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)