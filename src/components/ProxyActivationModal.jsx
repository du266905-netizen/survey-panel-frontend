import { AlertTriangle, Play, X } from 'lucide-react';
import { useState } from 'react';
import { startSurvey } from '../api/realApi';

export default function ProxyActivationModal({ survey, onClose }) {
  const [fingerprintBrowser, setFingerprintBrowser] = useState('Octo Browser');
  const [operatingSystem, setOperatingSystem] = useState('Windows 11');
  const [linkType, setLinkType] = useState('direct');
  const [proxyList, setProxyList] = useState('');
  const [launchResult, setLaunchResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!survey) return null;

  const handleStart = async () => {
    setLoading(true);
    setError('');
    setLaunchResult('');

    try {
      const firstProxy = proxyList
        .split('\n')
        .map((line) => line.trim())
        .find(Boolean);
      const response = await startSurvey({
        surveyId: survey.id,
        proxyIp: firstProxy,
        fingerprintBrowser,
        operatingSystem,
        linkType,
      });

      setLaunchResult(response.data.surveyLink);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to start this survey session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
      <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Activate proxy access with {survey.surveyId}</h2>
            <p className="text-sm text-slate-500">{survey.surveyName}</p>
          </div>
          <button className="btn-secondary h-9 w-9 p-0" type="button" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-5 p-6">
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-800">
            <AlertTriangle className="mt-0.5 shrink-0" size={18} />
            <span>Please make sure your fingerprint browser is already running.</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Fingerprint browser</span>
              <select className="field" value={fingerprintBrowser} onChange={(event) => setFingerprintBrowser(event.target.value)}>
                <option>Octo Browser</option>
                <option>MoreLogin</option>
                <option>AdsPower</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Operating System</span>
              <select className="field" value={operatingSystem} onChange={(event) => setOperatingSystem(event.target.value)}>
                <option>Windows 10</option>
                <option>Windows 11</option>
                <option>MacOS</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-4">
            {['Direct link', 'API link'].map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  className="h-4 w-4 accent-primary"
                  type="radio"
                  name="linkMode"
                  checked={linkType === (option === 'Direct link' ? 'direct' : 'api')}
                  onChange={() => setLinkType(option === 'Direct link' ? 'direct' : 'api')}
                />
                {option}
              </label>
            ))}
          </div>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Proxy list</span>
            <textarea
              className="field min-h-32 resize-y"
              placeholder="Enter proxy list one per line format host:port:user:password"
              value={proxyList}
              onChange={(event) => setProxyList(event.target.value)}
            />
          </label>

          <div className="rounded-lg bg-slate-950 p-4 font-mono text-xs leading-6 text-green-300">
            {launchResult ? 'Launch link generated:' : 'Ready to generate secure launch links...'}
            <br />
            {launchResult || 'Proxy validation: waiting for input'}
            <br />
            Browser profile: {fingerprintBrowser}
          </div>

          {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <button className="btn-primary w-full py-3 text-base" type="button" onClick={handleStart} disabled={loading}>
            <Play size={18} />
            {loading ? 'STARTING...' : 'ONE-CLICK START'}
          </button>
        </div>
      </section>
    </div>
  );
}
