import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserContextProvider }  from './context/browser-context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserContextProvider>
     <App />
  </BrowserContextProvider>
 
  </StrictMode>,
)
