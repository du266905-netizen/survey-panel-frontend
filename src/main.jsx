import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { installDomMutationSafety } from './utils/domSafety';
import './index.css';
import './styles/paper-contrast-fixes.css';

installDomMutationSafety();

// Browsers may restore a previous SPA document from the back/forward cache after a deployment.
// A persisted document bypasses the normal document request, so reload it once to pick up the
// current hashed asset manifest instead of reviving an older visual system.
window.addEventListener('pageshow', (event) => {
  if (event.persisted) window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
