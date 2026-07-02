import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Terms() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <Logo size="md" />
        <h1 className="mt-8 text-3xl font-semibold text-slate-950">Terms of Service</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          By creating an account, you agree to provide accurate profile information, complete surveys honestly, and avoid automated or fraudulent
          traffic. GuanyiMedia may suspend accounts that violate partner quality rules or platform security requirements.
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Rewards are issued only after partner validation and audit completion. Continued use of the panel means you accept these operating terms.
        </p>
        <Link className="mt-8 inline-flex font-semibold text-green-600 hover:text-green-700" to="/">
          Back to home
        </Link>
      </section>
    </main>
  );
}
