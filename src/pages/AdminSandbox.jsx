import { ArrowUpRight, CheckCircle2, FlaskConical, Globe2, LockKeyhole, MonitorCheck, RefreshCw, ShieldCheck, UsersRound } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const configuredSandboxUrl = String(import.meta.env.VITE_SANDBOX_APP_URL || '').trim().replace(/\/+$/, '');
const deploymentEnvironment = String(import.meta.env.VITE_DEPLOYMENT_ENV || 'production').trim().toLowerCase();

function sandboxDestination(path) {
  if (configuredSandboxUrl) return `${configuredSandboxUrl}${path}`;
  if (deploymentEnvironment === 'sandbox' && typeof window !== 'undefined') return `${window.location.origin}${path}`;
  return '';
}

const surfaces = [
  {
    id: 'home',
    title: '首页',
    label: 'PUBLIC HOME',
    description: '检查公开首页、导航、语言、新闻入口与移动端布局。',
    path: '/',
    icon: Globe2,
    checks: ['桌面与移动端首屏', '公开导航与页脚', '未登录状态和链接'],
  },
  {
    id: 'participant',
    title: '用户端',
    label: 'PARTICIPANT WORKSPACE',
    description: '使用隔离的测试参与者账号验证资料、机会、钱包、邀请和问卷流程。',
    path: '/dashboard',
    icon: UsersRound,
    checks: ['注册、登录和找回密码', '资料、匹配与报名状态', '奖励、邀请与问卷回流'],
  },
  {
    id: 'researcher',
    title: '研究端',
    label: 'RESEARCH WORKSPACE',
    description: '使用隔离的测试研究者账号验证简报、报价、付款和交付状态。',
    path: '/business/workspace',
    icon: MonitorCheck,
    checks: ['简报与问卷草稿', '审核、报价与付款回调', '结果锁定与交付可见性'],
  },
];

export default function AdminSandbox() {
  const sandboxReady = Boolean(configuredSandboxUrl) || deploymentEnvironment === 'sandbox';

  return (
    <>
      <PageHeader
        title="Sandbox release console"
        description="Open an isolated candidate build for each surface before promoting the same verified commit to production."
        action={<span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold ${sandboxReady ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100' : 'bg-amber-50 text-amber-800 ring-1 ring-amber-100'}`}><FlaskConical size={15} /> {sandboxReady ? 'Sandbox target ready' : 'Sandbox target not configured'}</span>}
      />

      <section className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 text-sm leading-6 text-emerald-950">
        <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-700" size={19} /><div><strong>Safe release boundary.</strong> Sandbox is a separate deployment and data store, not a production role switch. Test accounts, email delivery, payment callbacks and background work must remain isolated. A browser “success” page never counts as a production release or a confirmed payment.</div></div>
      </section>

      {!sandboxReady && <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900"><strong>One setup step remains:</strong> configure <code>VITE_SANDBOX_APP_URL</code> in the administrator build to the approved sandbox site. Until then, these launch links intentionally stay unavailable.</section>}

      <section className="grid gap-5 xl:grid-cols-3">
        {surfaces.map((surface) => {
          const Icon = surface.icon;
          const href = sandboxDestination(surface.path);
          return <article className="card flex min-h-80 flex-col p-5" key={surface.id}>
            <div className="flex items-start justify-between gap-4"><div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-800"><Icon size={20} /></div><span className="rounded-full bg-slate-50 px-3 py-1 text-[10px] font-bold tracking-[.13em] text-slate-500">{surface.label}</span></div>
            <h2 className="mt-5 text-xl font-bold text-slate-950">{surface.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{surface.description}</p>
            <ul className="mt-5 grid gap-2 text-sm text-slate-600">{surface.checks.map((check) => <li className="flex gap-2" key={check}><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-700" size={15} />{check}</li>)}</ul>
            {href ? <a className="btn-primary mt-auto self-start px-3 py-2 text-sm" href={href} target="_blank" rel="noreferrer">Open sandbox <ArrowUpRight size={15} /></a> : <button type="button" className="btn-secondary mt-auto self-start px-3 py-2 text-sm" disabled>Sandbox not configured</button>}
          </article>;
        })}
      </section>

      <section className="mt-7 grid gap-5 xl:grid-cols-2">
        <article className="card p-5"><div className="flex items-center gap-2"><RefreshCw className="text-emerald-700" size={18} /><h2 className="font-bold text-slate-950">Release sequence</h2></div><ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-600"><li><strong className="text-slate-900">1. Deploy the candidate commit to sandbox.</strong> Apply only sandbox configuration and migrations.</li><li><strong className="text-slate-900">2. Validate all three surfaces.</strong> Use sandbox-only accounts and callbacks; record failures before promotion.</li><li><strong className="text-slate-900">3. Promote the same commit.</strong> Run the production checklist, then deploy frontend and backend together.</li></ol></article>
        <article className="card p-5"><div className="flex items-center gap-2"><LockKeyhole className="text-emerald-700" size={18} /><h2 className="font-bold text-slate-950">Non-negotiable isolation</h2></div><ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600"><li>Never use production accounts, wallets, research records or payment credentials in sandbox.</li><li>Send test email only to approved test recipients; do not send customer delivery messages from a sandbox run.</li><li>Keep sandbox payments non-settling or use provider test mode. Signed callback verification is still required.</li></ul></article>
      </section>
    </>
  );
}
