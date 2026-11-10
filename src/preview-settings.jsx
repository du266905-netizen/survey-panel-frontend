import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/inter';
import { LanguageProvider } from './components/LanguageContext';
import { AuthProvider } from './components/AuthContext';
import BusinessSettingsLayout from './pages/BusinessSettingsLayout';
import './index.css';
import './pages/WorkspaceSurfaceTheme.css';
import './pages/BusinessWorkspaceTheme.css';
import './styles/authenticated-palette.css';
import './styles/future-app-surface.css';
import './components/BusinessRail.css';
import './pages/Business.css';
import './pages/BusinessAccountShell.css';

const Dummy = () => (
  <section className="business-account-shell">
    <div><h1>Team settings</h1><p>A team shares projects, balance and invoices.</p></div>
    <div className="business-account-grid"><section className="business-account-details"><p>Team information</p></section></div>
  </section>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryRouter initialEntries={['/business/team']}>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route element={<BusinessSettingsLayout />}>
              <Route path="/business/team" element={<Dummy />} />
            </Route>
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </MemoryRouter>
  </React.StrictMode>,
);
