import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter';
import { LanguageProvider } from './components/LanguageContext';
import BusinessProjectActions from './components/BusinessProjectActions';
import './index.css';

const project = { id: 'p1', title: '中国消费者对三星手机看法调研', status: 'CLIENT_ACCEPTED', questionnaire: { status: 'PUBLISHED' }, deliveryStatus: 'DRAFT' };
function Demo() {
  const [open, setOpen] = useState(true);
  return <>{open && <BusinessProjectActions project={project} onClose={() => setOpen(false)} onDone={() => {}} />}</>;
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><LanguageProvider><Demo /></LanguageProvider></BrowserRouter></React.StrictMode>,
);
