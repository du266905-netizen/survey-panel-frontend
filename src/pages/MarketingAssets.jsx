import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ArrowDownToLine, CheckCircle2, FileImage, LockKeyhole, Palette, RefreshCcw, Sparkles } from 'lucide-react';
import { getMarketingAssets } from '../api/realApi';
import PageHeader from '../components/PageHeader';
import {
  DEFAULT_MANIFESTO,
  downloadMarketingAsset,
  MARKETING_ASSET_SIZES,
  renderMarketingAsset,
} from '../utils/marketingImageExport';

const TEMPLATE_CATALOG = [
  { key: 'A', title: '今日热议', subtitle: 'News Wall Daily Brief', source: 'Daily Brief + community poll', mode: 'automatic' },
  { key: 'B', title: '周榜／成就播报', subtitle: 'Weekly Highlights', source: 'Weekly rewards + completions', mode: 'gated' },
  { key: 'C', title: '宣言金句卡', subtitle: 'Manifesto Quote Card', source: 'Custom editorial copy', mode: 'editorial' },
  { key: 'D', title: '新机会上线', subtitle: 'New Opportunities', source: 'New active survey channels', mode: 'gated' },
  { key: 'E', title: '平台里程碑', subtitle: 'Community Milestone', source: 'Verified platform totals', mode: 'gated' },
  { key: 'F', title: '兑换成功见证', subtitle: 'Reward Moment', source: 'Consent-backed reward redemption', mode: 'gated' },
  { key: 'G', title: '单条话题深度展示', subtitle: 'Featured Conversation', source: 'Top Daily Brief poll topic', mode: 'automatic' },
  { key: 'H', title: '每周话题精选', subtitle: 'Weekly Digest', source: 'Weekly Daily Briefs + poll data', mode: 'automatic' },
];

const COUNTRY_OPTIONS = [
  { value: 'US', label: 'US' },
  { value: 'UK', label: 'UK' },
  { value: 'CA', label: 'Canada' },
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

function AssetCanvas({ templateKey, asset, manifesto, format }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!asset?.available || !canvasRef.current) return undefined;
    let cancelled = false;
    const drawPreview = () => {
      if (!cancelled && canvasRef.current) {
        renderMarketingAsset(canvasRef.current, {
          templateKey,
          data: asset.data,
          manifesto,
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
  }, [asset, format, manifesto, templateKey]);

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
  const [assetPayload, setAssetPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

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
        format,
      });
      setNotice('PNG 已下载。发布前请确认内容仍与实时数据一致。');
    } catch (caughtError) {
      setError(caughtError.message || 'Unable to export this PNG.');
    } finally {
      setExporting(false);
    }
  };

  const details = availabilityDetails(selectedAsset?.details);

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
              <p>8 TEMPLATE SYSTEM</p>
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
              <label className="marketing-copy-field">
                <span>Manifesto copy</span>
                <textarea value={manifesto} maxLength={170} onChange={(event) => setManifesto(event.target.value)} />
              </label>
            )}
          </div>

          {loading ? (
            <div className="marketing-loading">Reading verified source data…</div>
          ) : (
            <div className="marketing-preview-wrap">
              <AssetCanvas templateKey={selectedKey} asset={selectedAsset} manifesto={manifesto} format={format} />
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
        <p><strong>Brand system:</strong> #F3EDE0 paper, #1F1F1B ink, Source Han Serif-style type, and a fixed GuanyiSearch wordmark area across all eight templates.</p>
      </section>
    </div>
  );
}
