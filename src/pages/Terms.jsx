import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const terms = [
  {
    title: 'Account Eligibility',
    body: 'Accounts must be created with accurate information and may require administrator approval before access is enabled. You are responsible for keeping your login credentials secure.',
  },
  {
    title: 'Survey Participation',
    body: 'You agree to complete surveys honestly, avoid duplicate or automated activity, and follow all partner quality requirements. Fraudulent or low-quality activity may lead to account suspension.',
  },
  {
    title: 'Rewards',
    body: 'Coins and rewards are credited only after partner validation, postback confirmation, and platform audit. Pending, reversed, failed, or disqualified sessions may not be eligible for rewards.',
  },
  {
    title: 'Platform Controls',
    body: 'The platform may limit, suspend, or close accounts to protect research quality, prevent abuse, comply with partner requirements, or maintain platform integrity.',
  },
  {
    title: 'Changes To Terms',
    body: 'We may update these terms as the panel, partner requirements, or compliance obligations evolve. Continued use of the platform means you accept the current terms.',
  },
];

export default function Terms() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link className="inline-flex items-center" to="/">
            <Logo size="md" />
          </Link>
          <Link className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" to="/login">
            Sign In
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-600">Terms of Service</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950">Operating rules for the survey panel</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          These terms govern use of the survey platform, including account access, survey participation, reward handling, and quality
          controls.
        </p>

        <div className="mt-10 grid gap-5">
          {terms.map((term) => (
            <article key={term.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">{term.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{term.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/register">
            Create Account
          </Link>
          <Link className="btn-secondary" to="/">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
