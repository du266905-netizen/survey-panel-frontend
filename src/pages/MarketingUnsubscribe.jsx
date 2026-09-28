import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react';
import { unsubscribeMarketingEmail } from '../api/realApi';

export default function MarketingUnsubscribe() {
  const [params] = useSearchParams();
  const [state, setState] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (!token) {
      setState('error');
      setMessage('This unsubscribe link is missing its confirmation token.');
      return;
    }
    unsubscribeMarketingEmail(token)
      .then((response) => {
        setState('success');
        setMessage(response.data?.message || 'You have been unsubscribed from marketing emails.');
      })
      .catch((error) => {
        setState('error');
        setMessage(error.response?.data?.message || 'This unsubscribe link is invalid or has expired.');
      });
  }, [params]);

  return (
    <main className="min-h-screen bg-[#f5f4ef] px-6 py-20 text-[#193b2e]">
      <section className="mx-auto max-w-xl rounded-2xl border border-[#d9e1d8] bg-white p-8 text-center shadow-sm">
        {state === 'loading' && <LoaderCircle className="mx-auto mb-5 animate-spin text-emerald-700" size={30} aria-hidden="true" />}
        {state === 'success' && <CheckCircle2 className="mx-auto mb-5 text-emerald-700" size={34} aria-hidden="true" />}
        {state === 'error' && <CircleAlert className="mx-auto mb-5 text-amber-700" size={34} aria-hidden="true" />}
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">GuanyiSearch</p>
        <h1 className="mt-3 text-2xl font-semibold">{state === 'loading' ? 'Updating your email preferences' : state === 'success' ? 'You are unsubscribed' : 'Unsubscribe link unavailable'}</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">{state === 'loading' ? 'Please wait a moment.' : message}</p>
        <Link className="mt-7 inline-flex rounded-full bg-[#183b2d] px-5 py-3 text-sm font-semibold text-white" to="/">Return to guanyi-media.com</Link>
      </section>
    </main>
  );
}
