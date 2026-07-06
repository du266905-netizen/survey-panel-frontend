import { CheckCircle2, Copy, Globe2, Monitor, ShieldAlert } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Logo from '../components/Logo';

function getQuery() {
  return Object.fromEntries(new URLSearchParams(window.location.search).entries());
}

function getWebglRenderer() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'Unavailable';
    const extension = gl.getExtension('WEBGL_debug_renderer_info');
    if (!extension) return 'Available';
    return gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
  } catch {
    return 'Unavailable';
  }
}

export default function AgentPrecheck() {
  const query = useMemo(getQuery, []);
  const [ipInfo, setIpInfo] = useState({ status: 'loading' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        if (mounted) setIpInfo({ status: 'ok', ip: data.ip });
      })
      .catch((error) => {
        if (mounted) setIpInfo({ status: 'error', message: error.message });
      });
    return () => {
      mounted = false;
    };
  }, []);

  const rows = [
    ['Task ID', query.taskId || '-'],
    ['Profile ID', query.profileId || '-'],
    ['Provider', query.provider || '-'],
    ['Expected Country', query.country || '-'],
    ['Proxy Label', query.proxy || '-'],
    ['Detected IP', ipInfo.status === 'ok' ? ipInfo.ip : ipInfo.status],
    ['Timezone', Intl.DateTimeFormat().resolvedOptions().timeZone || '-'],
    ['Language', navigator.language || '-'],
    ['Platform', navigator.platform || '-'],
    ['User Agent', navigator.userAgent || '-'],
    ['Screen', `${window.screen.width} x ${window.screen.height}`],
    ['WebGL', getWebglRenderer()],
  ];

  const copyReport = async () => {
    await navigator.clipboard.writeText(rows.map(([key, value]) => `${key}: ${value}`).join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-blue-700 px-8 py-10 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6">
          <div>
            <Logo size="md" variant="light" />
            <h1 className="mt-8 text-3xl font-bold">Internal Environment Precheck</h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Verify the browser environment before a human operator starts partner-visible survey activity.
            </p>
          </div>
          <div className="hidden rounded-2xl border border-white/20 bg-white/10 p-5 text-sm backdrop-blur sm:block">
            <p className="font-semibold">Manual boundary</p>
            <p className="mt-1 text-blue-100">This page does not answer or submit surveys.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 grid max-w-5xl gap-5 px-8 pb-10 lg:grid-cols-[1fr_320px]">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-950">Environment Snapshot</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {rows.map(([key, value]) => (
              <div key={key} className="grid gap-2 px-6 py-3 text-sm sm:grid-cols-[180px_1fr]">
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="break-all text-slate-900">{value}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 px-6 py-4">
            <button className="btn-secondary" type="button" onClick={copyReport}>
              <Copy size={16} />
              {copied ? 'Copied' : 'Copy Report'}
            </button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-green-50 p-2 text-green-600">
                <CheckCircle2 size={22} />
              </span>
              <div>
                <p className="font-bold text-slate-950">Ready for review</p>
                <p className="text-sm text-slate-500">Human operator should inspect this page first.</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-amber-50 p-2 text-amber-600">
                <ShieldAlert size={22} />
              </span>
              <div>
                <p className="font-bold text-slate-950">If anything looks wrong</p>
                <p className="mt-1 text-sm text-slate-500">Close the profile, mark the task failed or release it, then use another proxy/profile.</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-blue-50 p-2 text-blue-600">
                <Monitor size={22} />
              </span>
              <div>
                <p className="font-bold text-slate-950">Internal use only</p>
                <p className="mt-1 text-sm text-slate-500">This page is a local operations aid, not a partner survey page.</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-slate-100 p-2 text-slate-600">
                <Globe2 size={22} />
              </span>
              <div>
                <p className="font-bold text-slate-950">Detected IP</p>
                <p className="mt-1 break-all text-sm text-slate-500">{ipInfo.status === 'ok' ? ipInfo.ip : ipInfo.status}</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
