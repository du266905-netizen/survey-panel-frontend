import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Privacy() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <Logo size="md" />
        <h1 className="mt-8 text-3xl font-semibold text-slate-950">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          GuanyiMedia collects account, participation, device, and survey activity data only to operate the research panel, protect platform quality,
          prevent fraud, and deliver rewards. We do not sell employee account information. Survey partners may receive the identifiers and technical
          signals required to match and validate survey participation.
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          For access, correction, or deletion requests, contact the platform administrator at heguanyi@guanyi-media.com.
        </p>
        <Link className="mt-8 inline-flex font-semibold text-green-600 hover:text-green-700" to="/">
          Back to home
        </Link>
      </section>
    </main>
  );
}
