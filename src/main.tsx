import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

console.log('🚀 Application initializing...')
console.log('Environment:', import.meta.env.MODE)

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('❌ CRITICAL: Root element not found!')
  throw new Error('Root element not found')
}

console.log('✓ Root element found, rendering app...')

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

console.log('✓ App render initiated')

