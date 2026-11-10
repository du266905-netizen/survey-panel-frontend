import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/inter';
import { LanguageProvider } from './components/LanguageContext';
import BusinessProjectOverview from './pages/BusinessProjectOverview';
import './index.css';

const preview = {
  project: {
    id: 'preview',
    title: '中国消费者对三星手机看法调研',
    studyFormat: 'SURVEY',
    status: 'LIVE',
    createdAt: '2026-10-12T09:00:00Z',
    targetParticipants: 200,
    latestQuote: { version: 2, status: 'ACCEPTED', amount: 4800, sentAt: '2026-10-14T09:00:00Z', acceptedAt: '2026-10-15T11:20:00Z' },
    latestPayment: { status: 'PAID', amount: 4800, paidAt: '2026-10-16T08:00:00Z' },
    questionnaire: { status: 'PUBLISHED', responseCount: 128, publishedAt: '2026-10-20T10:00:00Z' },
    deliveryStatus: 'DRAFT',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MemoryRouter initialEntries={['/business/projects/preview/overview']}>
      <LanguageProvider>
        <Routes>
          <Route path="/business/projects/:projectId/overview" element={<BusinessProjectOverview preview={preview} />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>
  </React.StrictMode>,
);
