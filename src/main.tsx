import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';


import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <GoogleOAuthProvider clientId="112836653550-u25eds5glsfm5hqel7p0vfo5ee4pe9m6.apps.googleusercontent.com">
       <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
