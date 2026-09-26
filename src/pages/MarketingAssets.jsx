import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ArrowDownToLine, CheckCircle2, Eye, FileImage, LockKeyhole, Mail, Palette, RefreshCcw, RotateCcw, Send, Sparkles, Upload } from 'lucide-react';
import { getMarketingAssets, previewMarketingCampaign, sendMarketingCampaign } from '../api/realApi';
import PageHeader from '../components/PageHeader';
import {
  DEFAULT_MANIFESTO,
  DEFAULT_MANIFESTO_ARTWORK,
  downloadMarketingAsset,
  MARKETING_ASSET_SIZES,
  renderMarketingAsset,
} from '../utils/marketingImageExport';

const TEMPLATE_CATALOG = [
  { key: 'A', title: '今日热议', subtitle: 'News Wall Daily Brief', source: 'Daily Brief + community poll', mode: 'automatic' },
  { key: 'B', title: '周榜／成就播报', subtitle: 'Weekly Highlights', source: 'Weekly rewards + completions', mode: 'gated' },
  { key: 'C', title: '宣言金句卡', subtitle: 'Manifesto Quote Card', source: 'Custom editorial copy', mode: 'editorial' },
  { key: 'D', title: '新机会上线', subtitle: 'New Opportunities', source: 'New active survey channels', mode: 'gated' },
  { key: 'G', title: '单条话题深度展示', subtitle: 'Featured Conversation', source: 'Top Daily Brief poll topic', mode: 'automatic' },
  { key: 'H', title: '每周话题精选', subtitle: 'Weekly Digest', source: 'Weekly Daily Briefs + poll data', mode: 'automatic' },
];

const COUNTRY_OPTIONS = [
  { value: 'US', label: 'US' },
  { value: 'UK', label: 'UK' },
  { value: 'CA', label: 'Canada' },
];

const EMAIL_CAMPAIGN_TEMPLATES = [
  { value: 'organization-market-research', label: 'Organisation market research', description: 'For clients and organisations considering a market decision.' },
  { value: 'participant-community', label: 'Participant insight community', description: 'For prospective research participants and panel members.' },
];

function formatGeneratedAt(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString();
}

function readinessLabel(mode) {
  if (mode === 'automatic') return 'AUTO';
  if (mode === 'editorial') return 'EDITORIAL';
  return 'TRIGGERED';
}

function availabilityDetails(details) {
  if (!details) return null;
  const values = [
    details.qualifiedTopics !== undefined && `${details.qualifiedTopics}/${details.requiredTopics} qualifying Daily Brief topics`,
    details.completedSurveys !== undefined && `${details.completedSurveys}/${details.requiredCompletedSurveys || 0} completed surveys`,
    details.referralRewards !== undefined && `${details.referralRewards}/${details.requiredReferralRewards || 0} referral rewards`,
  ].filter(Boolean);
  return values.length ? values.join(' · ') : null;
}

function AssetCanvas({ templateKey, asset, manifesto, artworkSrc, format }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!asset?.available || !canvasRef.current) return undefined;
    let cancelled = false;
    const drawPreview = async () => {
      if (!cancelled && canvasRef.current) {
        await renderMarketingAsset(canvasRef.current, {
          templateKey,
          data: asset.data,
          manifesto,
          artworkSrc,
          format,
        });
      }
    };
    const fontReady = document.fonts?.ready;
    if (fontReady) fontReady.then(drawPreview).catch(drawPreview);
    else drawPreview();
    return () => {
      cancelled = true;
    };
  }, [artworkSrc, asset, format, manifesto, templateKey]);

  if (!asset?.available) {
    return (
      <div className="marketing-preview-empty">
        <LockKeyhole size={28} strokeWidth={1.5} />
        <p>等待真实业务数据</p>
        <span>此模板不会以示例数字或占位内容生成。</span>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="marketing-preview-canvas" aria-label="Marketing asset preview" />;
}

export default function MarketingAssets() {
  const [country, setCountry] = useState('US');
  const [selectedKey, setSelectedKey] = useState('A');
  const [format, setFormat] = useState('square');
  const [manifesto, setManifesto] = useState(DEFAULT_MANIFESTO);
  const [artworkSrc, setArtworkSrc] = useState(DEFAULT_MANIFESTO_ARTWORK);
  const [assetPayload, setAssetPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [campaignTemplate, setCampaignTemplate] = useState('organization-market-research');
  const [campaignLocale, setCampaignLocale] = useState('zh-CN');
  const [recipientText, setRecipientText] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [campaignPreview, setCampaignPreview] = useState(null);
  const [campaignError, setCampaignError] = useState('');
  const [campaignResult, setCampaignResult] = useState(null);
  const [previewingCampaign, setPreviewingCampaign] = useState(false);
  const [sendingCampaign, setSendingCampaign] = useState(false);

  const selectedTemplate = useMemo(
    () => TEMPLATE_CATALOG.find((template) => template.key === selectedKey) || TEMPLATE_CATALOG[0],
    [selectedKey]
  );
  const selectedAsset = assetPayload?.templates?.[selectedKey] || null;

  const loadAssets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getMarketingAssets({ country });
      setAssetPayload(response.data);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to load marketing source data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, [country]);

  const handleDownload = async () => {
    if (!selectedAsset?.available) return;
    setExporting(true);
    setError('');
    setNotice('');
    try {
      await downloadMarketingAsset({
        templateKey: selectedKey,
        data: selectedAsset.data,
        manifesto,
        artworkSrc,
        format,
      });
      setNotice('PNG 已下载。发布前请确认内容仍与实时数据一致。');
    } catch (caughtError) {
      setError(caughtError.message || 'Unable to export this PNG.');
    } finally {
      setExporting(false);
    }
  };

  const handleArtworkChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('主视觉仅支持 JPG、PNG 或 WebP 图片。');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('主视觉图片需小于 8 MB。');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setArtworkSrc(String(reader.result || DEFAULT_MANIFESTO_ARTWORK));
      setError('');
      setNotice('主视觉已替换；导出的 PNG 会使用这张图片。');
    };
    reader.onerror = () => setError('无法读取这张图片，请重新选择。');
    reader.readAsDataURL(file);
  };

  const details = availabilityDetails(selectedAsset?.details);
  const recipientCount = useMemo(() => new Set(
    recipientText.split(/[\s,;]+/).map((value) => value.trim().toLowerCase()).filter(Boolean)
  ).size, [recipientText]);
  const selectedCampaign = EMAIL_CAMPAIGN_TEMPLATES.find((template) => template.value === campaignTemplate);

  const handleCampaignPreview = async () => {
    setPreviewingCampaign(true);
    setCampaignError('');
    setCampaignResult(null);
    try {
      const response = await previewMarketingCampaign({ template: campaignTemplate, locale: campaignLocale });
      setCampaignPreview(response.data);
    } catch (caughtError) {
      setCampaignError(caughtError.response?.data?.message || 'Unable to generate the email preview.');
    } finally {
      setPreviewingCampaign(false);
    }
  };

  const handleCampaignSend = async () => {
    if (!recipientCount) {
      setCampaignError('Paste at least one complete email address before sending.');
      return;
    }
    if (!marketingConsent) {
      setCampaignError('Confirm recipient consent before sending a marketing email.');
      return;
    }
    setSendingCampaign(true);
    setCampaignError('');
    setCampaignResult(null);
    try {
      const response = await sendMarketingCampaign({
        template: campaignTemplate,
        locale: campaignLocale,
        recipientText,
        confirmMarketingConsent: marketingConsent,
      });
      setCampaignResult(response.data);
    } catch (caughtError) {
      setCampaignError(caughtError.response?.data?.message || 'Unable to queue this email campaign.');
    } finally {
      setSendingCampaign(false);
    }
  };

  return (
    <div className="marketing-assets-page space-y-6">
      <PageHeader
        title="Marketing Assets"
        description="Generate brand-consistent social visuals from verified community data — never example numbers."
        action={
          <button className="btn-secondary" type="button" onClick={loadAssets} disabled={loading}>
            <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh data
          </button>
        }
      />

      <section className="marketing-principles" aria-label="Marketing asset safeguards">
        <div><CheckCircle2 size={17} /> A / G / H auto-read Daily Brief and News Wall poll data.</div>
        <div><LockKeyhole size={17} /> Business templates stay locked until their real trigger is met.</div>
        <div><FileImage size={17} /> Exported files are PNGs in social-ready dimensions.</div>
      </section>

      {error && <div className="marketing-message is-error"><AlertCircle size={17} />{error}</div>}
      {notice && <div className="marketing-message is-success"><CheckCircle2 size={17} />{notice}</div>}

      <div className="marketing-workspace">
        <aside className="marketing-template-list">
          <div className="marketing-list-head">
            <div>
              <p>6 TEMPLATE SYSTEM</p>
              <h2>选择营销素材</h2>
            </div>
            <Palette size={20} />
          </div>
          <div className="marketing-template-grid">
            {TEMPLATE_CATALOG.map((template) => {
              const templateAsset = assetPayload?.templates?.[template.key];
              const isSelected = template.key === selectedKey;
              return (
                <button
                  key={template.key}
                  type="button"
                  className={`marketing-template-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => {
                    setSelectedKey(template.key);
                    setNotice('');
                  }}
                >
                  <span className="marketing-template-letter">{template.key}</span>
                  <span className="marketing-template-copy">
                    <strong>{template.title}</strong>
                    <small>{template.subtitle}</small>
                  </span>
                  <span className={`marketing-template-state ${templateAsset?.available ? 'is-ready' : 'is-locked'}`}>
                    {templateAsset?.available ? 'READY' : templateAsset ? 'LOCKED' : '…'}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="marketing-generator-panel">
          <div className="marketing-generator-head">
            <div>
              <span className="marketing-eyebrow">TEMPLATE {selectedTemplate.key} · {readinessLabel(selectedTemplate.mode)}</span>
              <h2>{selectedTemplate.title}</h2>
              <p>{selectedTemplate.source}</p>
            </div>
            <div className={`marketing-readiness ${selectedAsset?.available ? 'is-ready' : 'is-locked'}`}>
              {selectedAsset?.available ? <CheckCircle2 size={16} /> : <LockKeyhole size={16} />}
              {selectedAsset?.available ? 'Ready to export' : 'Awaiting trigger'}
            </div>
          </div>

          <div className="marketing-controls">
            <label>
              <span>News region</span>
              <select value={country} onChange={(event) => setCountry(event.target.value)}>
                {COUNTRY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label>
              <span>Export size</span>
              <select value={format} onChange={(event) => setFormat(event.target.value)}>
                {Object.entries(MARKETING_ASSET_SIZES).map(([value, size]) => <option key={value} value={value}>{size.label}</option>)}
              </select>
            </label>
            {selectedKey === 'C' && (
              <>
                <label className="marketing-copy-field">
                  <span>Manifesto copy</span>
                  <textarea value={manifesto} maxLength={170} onChange={(event) => setManifesto(event.target.value)} />
                </label>
                <div className="marketing-artwork-field marketing-copy-field">
                  <span>Primary artwork</span>
                  <div className="marketing-artwork-actions">
                    <label className="marketing-upload-button">
                      <Upload size={15} />
                      Replace artwork
                      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleArtworkChange} />
                    </label>
                    <button type="button" className="marketing-artwork-reset" onClick={() => setArtworkSrc(DEFAULT_MANIFESTO_ARTWORK)} disabled={artworkSrc === DEFAULT_MANIFESTO_ARTWORK}>
                      <RotateCcw size={14} />
                      Use site artwork
                    </button>
                  </div>
                  <small>默认使用网站 Human Manifesto 油画；上传仅用于当前生成会话，支持 JPG / PNG / WebP，最大 8 MB。</small>
                </div>
              </>
            )}
          </div>

          {loading ? (
            <div className="marketing-loading">Reading verified source data…</div>
          ) : (
            <div className="marketing-preview-wrap">
              <AssetCanvas
                templateKey={selectedKey}
                asset={selectedAsset}
                manifesto={manifesto}
                artworkSrc={artworkSrc}
                format={format}
              />
            </div>
          )}

          {!loading && !selectedAsset?.available && (
            <div className="marketing-gate-note">
              <AlertCircle size={18} />
              <div>
                <strong>此模板目前不可生成</strong>
                <p>{selectedAsset?.reason || 'Source data is still loading.'}</p>
                {details && <small>Current verified signal: {details}</small>}
              </div>
            </div>
          )}

          <div className="marketing-export-bar">
            <div>
              <span>Source checked</span>
              <strong>{assetPayload?.generatedAt ? formatGeneratedAt(assetPayload.generatedAt) : '—'}</strong>
            </div>
            <button className="marketing-download" type="button" onClick={handleDownload} disabled={!selectedAsset?.available || exporting || loading}>
              <ArrowDownToLine size={18} />
              {exporting ? 'Exporting PNG…' : `Download PNG · ${MARKETING_ASSET_SIZES[format].width} × ${MARKETING_ASSET_SIZES[format].height}`}
            </button>
          </div>
        </section>
      </div>

      <section className="marketing-disclosure">
        <Sparkles size={18} />
        <p><strong>Brand system:</strong> #F3EDE0 paper, #1F1F1B ink, Source Han Serif-style type, and a fixed GuanyiSearch wordmark area across all active templates.</p>
      </section>

      <section className="card overflow-hidden border-slate-200 bg-white p-0" aria-label="Marketing email campaign sender">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700"><Mail size={15} /> Marketing email delivery</div>
              <h2 className="mt-2 text-xl font-bold text-slate-950">Send an approved email template</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">Choose the audience and language, paste complete recipient email addresses, then send through the dedicated marketing channel. Transactional mail is kept separate.</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">Up to 100 unique recipients</span>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-800">
              Email template
              <select className="field mt-2 w-full" value={campaignTemplate} onChange={(event) => { setCampaignTemplate(event.target.value); setCampaignPreview(null); setCampaignResult(null); }}>
                {EMAIL_CAMPAIGN_TEMPLATES.map((template) => <option key={template.value} value={template.value}>{template.label}</option>)}
              </select>
              <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">{selectedCampaign?.description}</span>
            </label>
            <label className="block text-sm font-bold text-slate-800">
              Language
              <select className="field mt-2 w-full" value={campaignLocale} onChange={(event) => { setCampaignLocale(event.target.value); setCampaignPreview(null); setCampaignResult(null); }}>
                <option value="zh-CN">中文</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="block text-sm font-bold text-slate-800">
              Recipient email addresses
              <textarea className="field mt-2 min-h-44 w-full font-mono text-sm" value={recipientText} onChange={(event) => { setRecipientText(event.target.value); setCampaignResult(null); }} placeholder={'name@example.com\nteam@example.org'} />
              <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">One full email address per line, or separate them with commas. Duplicate addresses are removed automatically. A domain alone cannot be sent to.</span>
            </label>
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <span className="font-semibold text-slate-700">Recipients ready</span>
              <span className={`font-bold ${recipientCount > 100 ? 'text-red-700' : 'text-emerald-700'}`}>{recipientCount} / 100</span>
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 text-sm leading-6 text-slate-700">
              <input className="mt-1 h-4 w-4 accent-emerald-700" type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} />
              <span>I confirm that every recipient has consented to receive this marketing email and that this message is relevant to them.</span>
            </label>
            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary" type="button" onClick={handleCampaignPreview} disabled={previewingCampaign || sendingCampaign}>
                <Eye size={16} /> {previewingCampaign ? 'Preparing preview…' : 'Preview email'}
              </button>
              <button className="btn-primary" type="button" onClick={handleCampaignSend} disabled={sendingCampaign || previewingCampaign || recipientCount > 100}>
                <Send size={16} /> {sendingCampaign ? 'Queueing email…' : `Send to ${recipientCount || '…'} recipient${recipientCount === 1 ? '' : 's'}`}
              </button>
            </div>
            {campaignError && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{campaignError}</p>}
            {campaignResult && (
              <div className={`rounded-lg border px-4 py-3 text-sm ${campaignResult.failed ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
                <p className="font-semibold">{campaignResult.queued} queued{campaignResult.failed ? ` · ${campaignResult.failed} could not be queued` : ''}. Check your email delivery activity for final delivery status.</p>
                {campaignResult.failed > 0 && <ul className="mt-2 space-y-1 text-xs font-normal leading-5">{(campaignResult.results || []).filter((item) => item.status === 'failed').map((item) => <li key={item.recipient}><strong>{item.recipient}</strong>: {item.reason || 'The email service rejected this request.'}</li>)}</ul>}
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
              <span className="text-sm font-bold text-slate-800">Template preview</span>
              {campaignPreview && <span className="max-w-[55%] truncate text-xs text-slate-500">{campaignPreview.subject}</span>}
            </div>
            {campaignPreview ? <iframe title="Marketing email preview" className="h-[680px] w-full bg-white" srcDoc={campaignPreview.html} sandbox="" /> : <div className="grid min-h-[680px] place-items-center p-8 text-center text-sm leading-6 text-slate-500"><div><Eye className="mx-auto mb-3 text-slate-400" size={28} /><p>Select a template and language, then preview it before sending.</p></div></div>}
          </div>
        </div>
      </section>
    </div>
  );
}
