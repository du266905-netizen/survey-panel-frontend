import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    /* The message is shown on the page on purpose: in production nobody opens
       the console, and "reload" without a cause wastes a round trip. */
    return { hasError: true, message: String(error?.message || error || 'Unknown error') };
  }

  componentDidCatch(error, info) {
    console.error('Application render failed', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-white">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center shadow-2xl">
          <img className="mx-auto h-12 w-12 rounded-xl" src="/guanyisearch-favicon.png" alt="" aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-black">Something interrupted the workspace.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            A browser extension or translation layer may have changed the page while it was updating. Reloading brings the workspace back safely.
          </p>
          {this.state.message && (
            <p className="mt-4 break-words rounded-lg bg-black/30 px-3 py-2 text-left font-mono text-[11px] leading-5 text-rose-200">{this.state.message}</p>
          )}
          <button
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
            type="button"
            onClick={() => window.location.reload()}
          >
            Reload workspace
          </button>
        </section>
      </main>
    );
  }
}
