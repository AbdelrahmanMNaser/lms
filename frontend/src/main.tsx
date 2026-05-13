import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Notification } from "./components/ui/Notification";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Notification />
  </StrictMode>,
)
