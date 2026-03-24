import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PaymentProvider from '../context/paymentContext/paymentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PaymentProvider>
      <App />
    </PaymentProvider>
  </StrictMode>,
)
