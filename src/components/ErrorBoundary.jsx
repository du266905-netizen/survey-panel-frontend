import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
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
