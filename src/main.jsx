import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ProgressProvider from './ProgressProvider'
import AuthProvider from './AuthProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
  <AuthProvider>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </AuthProvider>
</BrowserRouter>
  </StrictMode>,
)
