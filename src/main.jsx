import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/bodoni-moda';
import '@fontsource-variable/inter';
import '@fontsource-variable/source-serif-4';
import App from './App';
import { AuthProvider } from './components/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import './styles/paper-contrast-fixes.css';
import './pages/WorkspaceSurfaceTheme.css';
import './styles/action-feedback.css';
import './styles/authenticated-palette.css';

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
