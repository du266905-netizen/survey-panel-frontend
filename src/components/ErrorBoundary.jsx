import { Component } from 'react';

/* The crash screen is a customer-facing page: it says what happened and what
   to do, never which component threw. The raw message stays in the console
   (and on screen in development), because "BusinessProjectSheet is not
   defined" is for us, not for the client. */
const copy = {
  zh: {
    title: '页面没能加载完成',
    body: '刷新通常可以恢复。如果反复出现，请把时间和这个页面地址发到 support@guanyisearch.com。',
    action: '刷新页面',
  },
  en: {
    title: 'This page did not finish loading',
    body: 'Reloading usually fixes it. If it keeps happening, email the time and this page address to support@guanyisearch.com.',
    action: 'Reload page',
  },
};

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: String(error?.message || error || 'Unknown error') };
  }

  componentDidCatch(error, info) {
    console.error('Application render failed', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const zh = String((typeof navigator !== 'undefined' && navigator.language) || '').toLowerCase().startsWith('zh');
    const text = zh ? copy.zh : copy.en;

    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-white">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center shadow-2xl">
          <img className="mx-auto h-12 w-12 rounded-xl" src="/guanyisearch-favicon.png" alt="" aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-black">{text.title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">{text.body}</p>
          {import.meta.env.DEV && this.state.message && (
            <p className="mt-4 break-words rounded-lg bg-black/30 px-3 py-2 text-left font-mono text-[11px] leading-5 text-rose-200">{this.state.message}</p>
          )}
          <button
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
            type="button"
            onClick={() => window.location.reload()}
          >
            {text.action}
          </button>
        </section>
      </main>
    );
  }
}
