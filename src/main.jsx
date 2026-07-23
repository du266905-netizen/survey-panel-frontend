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

window.history.scrollRestoration = 'manual';

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
