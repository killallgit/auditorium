import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/ui/App'
import { Composed } from './compose'
import './theme.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element missing')

createRoot(container).render(
  <StrictMode>
    <Composed>
      <App />
    </Composed>
  </StrictMode>,
)
