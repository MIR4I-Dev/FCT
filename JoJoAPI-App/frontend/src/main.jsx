import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { FiltersProvider } from './context/filters.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GOOGLE_CLIENT_ID } from './config/config.js'
import './assets/css/output.css'
import { App } from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <FiltersProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </FiltersProvider>
)
