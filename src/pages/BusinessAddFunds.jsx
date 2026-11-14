import { useNavigate } from 'react-router-dom';
import BusinessTopNav from '../components/BusinessTopNav';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import BusinessAddFundsDialog from './BusinessAddFundsDialog';
import './BusinessAddFunds.css';

/* Direct route fallback. The balance and top-up controls open the same dialog
   over the current workspace, with the page behind it blurred. */
export default function BusinessAddFunds() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  return (
    <main className="business-account-page business-topup-screen">
      <BusinessTopNav activeId="billing" />
      <BusinessAddFundsDialog onClose={() => navigate(withLanguage('/business/workspace', language))} />
    </main>
  );
}
