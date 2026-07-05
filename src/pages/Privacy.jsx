import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect account details, profile information, device and network signals, survey participation history, reward activity, and fraud-prevention data required to operate the panel.',
  },
  {
    title: 'How We Use Information',
    body: 'We use information to manage account access, match participants with survey opportunities, validate completions, protect partner quality, prevent abuse, process rewards, and improve platform reliability.',
  },
  {
    title: 'Survey Partner Processing',
    body: 'When you start a survey, selected technical identifiers may be shared with the relevant research partner so they can match eligibility, validate traffic quality, and confirm completion status.',
  },
  {
    title: 'Security And Retention',
    body: 'We apply access controls and audit practices to protect panel data. Records are retained only as needed for operations, compliance, fraud prevention, partner reconciliation, and reward accounting.',
  },
  {
    title: 'Your Choices',
    body: 'You may request access, correction, or deletion of eligible account information by contacting the administrator. Some records may be retained where required for security, audit, or payment validation.',
  },
];

export default function Privacy() {
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
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-green-600">Privacy Policy</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950">How panel data is protected</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
          This Privacy Policy explains how the platform collects, uses, shares, and protects information in connection with account access, survey
          participation, fraud prevention, and reward operations.
        </p>

        <div className="mt-10 grid gap-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-950 p-6 text-white">
          <h2 className="text-lg font-bold">Contact</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            For privacy requests, contact{' '}
            <a className="font-semibold text-green-300 hover:text-green-200" href="mailto:heguanyi@guanyi-media.com">
              heguanyi@guanyi-media.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
