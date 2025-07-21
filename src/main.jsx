import { StrictMode } from 'react' // StrictMode is a tool provided by React that helps to detect potential issues in an application. It doesn't render any visible UI but activates additional checks and warnings for its descendants. 
import { createRoot } from 'react-dom/client'  
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
