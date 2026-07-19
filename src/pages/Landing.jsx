import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, CircleDollarSign, Eye, Newspaper, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNewsWall } from '../api/realApi';
import GlobalGlobe from '../components/GlobalGlobe';
import Logo from '../components/Logo';
import PublicAuthPanel from '../components/PublicAuthPanel';

const socialLinks = [
  { id: 'x', label: 'X / Twitter', href: 'https://x.com/GUANYISEARCH' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591672089947' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/guanyisearch_/' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/guanyisearch/' },
];

const previewNewsCategories = ['tech', 'finance', 'society', 'entertainment'];

function SocialGlyph({ id }) {
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="17.25" cy="6.75" r="1.35" fill="currentColor" />
      </svg>
    );
  }

  if (id === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M14.1 8.65h3.15V4h-3.72C9.4 4 7 6.46 7 10.1v2.4H4v4.38h3V23h4.85v-6.12h3.74l.7-4.38h-4.44v-1.95c0-1.26.62-1.9 2.25-1.9Z" />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M5.15 7.25A2.6 2.6 0 1 1 5.18 2a2.6 2.6 0 0 1-.03 5.25ZM2.78 22V9.22h4.78V22H2.78Zm7.12 0V9.22h4.58v1.75h.06c.64-1.12 2.08-2.14 4.17-2.14 4.1 0 5.02 2.7 5.02 6.2V22h-4.78v-6.25c0-1.5-.03-3.43-2.1-3.43-2.1 0-2.18 1.67-2.18 3.34V22H9.9Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

function formatPreviewCount(value) {
  return new Intl.NumberFormat('en-US', { notation: Number(value || 0) >= 1000 ? 'compact' : 'standard' }).format(Number(value || 0));
}

function placeholderPreviewViews(article) {
  const seed = String(article?.id || article?.title || article?.link || article?.sourceName || 'news');
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1001;
  }
  return hash;
}

function LandingNewsImage({ article }) {
  if (article?.imageUrl) {
    return <img src={article.imageUrl} alt="" loading="lazy" decoding="async" />;
  }
  return (
    <div className="landing-news-image-fallback" aria-hidden="true">
      <Newspaper size={34} strokeWidth={1.6} />
    </div>
  );
}

function LandingNewsPreview() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadPreviewNews() {
      setLoading(true);
      setError('');
      try {
        const responses = await Promise.allSettled(
          previewNewsCategories.map((category) => getNewsWall({ country: 'US', category, limit: 6 }))
        );
        const byId = new Map();
        responses.forEach((result) => {
          if (result.status !== 'fulfilled') return;
          (result.value.data || []).forEach((article) => {
            if (article?.id && !byId.has(article.id)) byId.set(article.id, article);
          });
        });
        const nextArticles = [...byId.values()]
          .sort((left, right) => Number(right.score || 0) - Number(left.score || 0) || new Date(right.publishedAt || 0) - new Date(left.publishedAt || 0))
          .slice(0, 3);
        if (!cancelled) setArticles(nextArticles);
      } catch {
        if (!cancelled) setError('News preview is temporarily unavailable.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPreviewNews();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="landing-news-preview" aria-labelledby="landing-news-preview-title">
      <div className="landing-container landing-news-preview-panel">
        <div className="landing-news-preview-head">
          <div>
            <h2 id="landing-news-preview-title">Today’s topics are already moving.</h2>
          </div>
          <Link to="/news">Explore <ArrowRight size={17} /></Link>
        </div>

        {loading ? (
          <div className="landing-news-grid" aria-label="Loading news preview">
            {Array.from({ length: 3 }).map((_, index) => <div key={index} className="landing-news-card is-loading" />)}
          </div>
        ) : error ? (
          <p className="landing-news-preview-error">{error}</p>
        ) : articles.length ? (
          <div className="landing-news-grid">
            {articles.map((article) => (
              <Link key={article.id} className="landing-news-card" to={`/news?article=${encodeURIComponent(article.id)}`}>
                <div className="landing-news-card-image">
                  <LandingNewsImage article={article} />
                </div>
                <div className="landing-news-card-body">
                  <p>{article.sourceName || 'News source'}</p>
                  <h3>{article.title}</h3>
                  <div className="landing-news-card-meta">
                    <span><Eye size={14} /> {formatPreviewCount(placeholderPreviewViews(article))} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="landing-news-preview-error">Latest News Wall stories will appear here as soon as the feed refreshes.</p>
        )}
      </div>
    </section>
  );
}

function ManifestoSprout() {
  return (
    <div className="landing-manifesto-sprout" aria-hidden="true">
      <svg viewBox="0 0 220 220" fill="none">
        <circle className="landing-sprout-sun" cx="155" cy="67" r="41" />
        <path className="landing-sprout-ground" d="M34 173c27-10 111-10 148 0" />
        <path className="landing-sprout-stem" d="M104 170c2-28 3-56-2-86" />
        <path className="landing-sprout-leaf landing-sprout-leaf-left" d="M101 116C71 108 57 84 64 58c28 4 44 25 38 58Z" />
        <path className="landing-sprout-leaf landing-sprout-leaf-right" d="M105 92c12-29 36-42 65-31-5 30-29 45-65 31Z" />
        <path className="landing-sprout-vein landing-sprout-vein-left" d="M99 112 69 66" />
        <path className="landing-sprout-vein landing-sprout-vein-right" d="m109 89 53-23" />
        <path className="landing-sprout-root" d="M104 169c-14-1-25 3-34 10M105 169c12 0 24 4 35 10" />
      </svg>
    </div>
  );
}

const plumCanvasSize = { width: 720, height: 560 };
const plumLoopDuration = 19000;

const plumPaths = [
  { width: 16.2, delay: 0, points: [[154, 488], [190, 428], [244, 372], [311, 317], [382, 252], [441, 192], [493, 126], [548, 62]] },
  { width: 8.8, delay: 0.08, points: [[300, 326], [258, 320], [211, 300], [165, 267], [117, 221]] },
  { width: 7.4, delay: 0.12, points: [[371, 262], [421, 266], [473, 249], [528, 215], [584, 166]] },
  { width: 5.2, delay: 0.19, points: [[445, 190], [445, 148], [469, 101], [509, 57]] },
  { width: 3.6, delay: 0.25, points: [[495, 126], [535, 136], [582, 122], [630, 92]] },
  { width: 3.1, delay: 0.28, points: [[505, 153], [548, 173], [599, 168], [641, 152]] },
  { width: 3.2, delay: 0.16, points: [[222, 306], [191, 294], [157, 267], [127, 236]] },
  { width: 2.8, delay: 0.22, points: [[249, 331], [219, 349], [188, 352], [152, 342]] },
  { width: 2.9, delay: 0.18, points: [[340, 287], [342, 254], [356, 225], [382, 201]] },
  { width: 2.7, delay: 0.21, points: [[404, 230], [441, 224], [476, 207], [509, 178]] },
];

const plumBlossoms = [
  { horizontal: 125, vertical: 239, size: 12, rotation: -0.28, delay: 0.02 },
  { horizontal: 162, vertical: 276, size: 10, rotation: 0.42, delay: 0.14 },
  { horizontal: 215, vertical: 311, size: 8.5, rotation: -0.5, delay: 0.22 },
  { horizontal: 288, vertical: 326, size: 14, rotation: -0.16, delay: 0.1 },
  { horizontal: 357, vertical: 271, size: 10.4, rotation: 0.35, delay: 0.19 },
  { horizontal: 407, vertical: 230, size: 9.2, rotation: -0.3, delay: 0.28 },
  { horizontal: 450, vertical: 182, size: 13, rotation: 0.22, delay: 0.24 },
  { horizontal: 490, vertical: 127, size: 8.5, rotation: 0.51, delay: 0.33 },
  { horizontal: 533, vertical: 77, size: 11.5, rotation: -0.4, delay: 0.27 },
  { horizontal: 576, vertical: 108, size: 8, rotation: 0.15, delay: 0.39 },
  { horizontal: 612, vertical: 96, size: 6.7, rotation: -0.62, delay: 0.46 },
];

const plumParticles = Array.from({ length: 54 }, (_, index) => ({
  seed: index * 17.31 + 3.7,
  radius: 1.5 + seededValue(index * 7.13 + 8.2) * 4.25,
  targetPathIndex: index % plumPaths.length,
  targetProgress: 0.08 + seededValue(index * 11.7 + 5.4) * 0.84,
  releaseDelay: 0.84 + seededValue(index * 5.8 + 4.1) * 0.1,
  driftRate: 0.42 + seededValue(index * 9.4 + 7.2) * 0.52,
}));

function seededValue(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function clampUnit(value) {
  return Math.min(1, Math.max(0, value));
}

function smoothStep(start, end, value) {
  const progress = clampUnit((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function interpolate(start, end, amount) {
  return start + (end - start) * amount;
}

function getPartialPath(points, progress) {
  const segmentCount = points.length - 1;
  const visibleSegments = clampUnit(progress) * segmentCount;
  const completedSegments = Math.floor(visibleSegments);
  const partialAmount = visibleSegments - completedSegments;
  const visiblePoints = points.slice(0, completedSegments + 1).map(([horizontal, vertical]) => ({ horizontal, vertical }));

  if (completedSegments < segmentCount && visiblePoints.length) {
    const [startHorizontal, startVertical] = points[completedSegments];
    const [endHorizontal, endVertical] = points[completedSegments + 1];
    visiblePoints.push({
      horizontal: interpolate(startHorizontal, endHorizontal, partialAmount),
      vertical: interpolate(startVertical, endVertical, partialAmount),
    });
  }

  return visiblePoints;
}

function getPointOnPath(points, progress) {
  const normalizedProgress = clampUnit(progress) * (points.length - 1);
  const startIndex = Math.min(points.length - 2, Math.floor(normalizedProgress));
  const partialAmount = normalizedProgress - startIndex;
  const [startHorizontal, startVertical] = points[startIndex];
  const [endHorizontal, endVertical] = points[startIndex + 1];
  return {
    horizontal: interpolate(startHorizontal, endHorizontal, partialAmount),
    vertical: interpolate(startVertical, endVertical, partialAmount),
  };
}

function getScatterPosition(particle, cycleIndex, elapsedSeconds) {
  const scatterSeed = particle.seed + cycleIndex * 61.73;
  const horizontal = 72 + seededValue(scatterSeed) * 562;
  const vertical = 58 + seededValue(scatterSeed + 19.4) * 392;
  const phase = elapsedSeconds * particle.driftRate + particle.seed;
  return {
    horizontal: horizontal + Math.sin(phase * 1.17) * (5 + seededValue(scatterSeed + 5) * 9) + Math.sin(phase * 0.43 + particle.seed * 0.7) * 6,
    vertical: vertical + Math.cos(phase * 0.91) * (5 + seededValue(scatterSeed + 9) * 8) + Math.sin(phase * 0.31 + particle.seed) * 5,
  };
}

function drawInkDot(canvasContext, horizontal, vertical, radius, opacity, seed) {
  const aspectRatio = 0.62 + seededValue(seed + 3.8) * 0.5;
  const rotation = seededValue(seed + 11.2) * Math.PI;
  const blotGradient = canvasContext.createRadialGradient(horizontal - radius * 0.23, vertical - radius * 0.28, radius * 0.12, horizontal, vertical, radius * 1.2);
  blotGradient.addColorStop(0, `rgba(218, 213, 201, ${opacity * 0.92})`);
  blotGradient.addColorStop(0.58, `rgba(164, 159, 147, ${opacity * 0.8})`);
  blotGradient.addColorStop(1, `rgba(112, 108, 98, ${opacity * 0.18})`);

  canvasContext.save();
  canvasContext.translate(horizontal, vertical);
  canvasContext.rotate(rotation);
  canvasContext.scale(1, aspectRatio);
  canvasContext.beginPath();
  canvasContext.arc(0, 0, radius, 0, Math.PI * 2);
  canvasContext.fillStyle = blotGradient;
  canvasContext.fill();
  canvasContext.restore();
}

function strokeInkPath(canvasContext, path, progress, opacity, elapsedSeconds, pathIndex) {
  const visiblePoints = getPartialPath(path.points, progress);
  if (visiblePoints.length < 2 || opacity <= 0) return;

  const strokePasses = [
    { width: path.width * 1.36, color: `rgba(12, 12, 11, ${opacity * 0.78})`, wobble: 2.2, dash: [] },
    { width: path.width * 0.94, color: `rgba(46, 43, 38, ${opacity * 0.98})`, wobble: 1.4, dash: [] },
    { width: Math.max(0.9, path.width * 0.36), color: `rgba(92, 87, 77, ${opacity * 0.52})`, wobble: 0.78, dash: [2, 12] },
  ];

  strokePasses.forEach((strokePass, passIndex) => {
    canvasContext.save();
    canvasContext.beginPath();
    visiblePoints.forEach((point, pointIndex) => {
      const jitterSeed = pathIndex * 101 + passIndex * 29 + pointIndex * 13;
      const timeOffset = elapsedSeconds * (0.46 + seededValue(jitterSeed) * 0.16);
      const horizontal = point.horizontal + (seededValue(jitterSeed) - 0.5) * strokePass.wobble + Math.sin(timeOffset + jitterSeed) * strokePass.wobble * 0.18;
      const vertical = point.vertical + (seededValue(jitterSeed + 17) - 0.5) * strokePass.wobble + Math.cos(timeOffset * 0.7 + jitterSeed) * strokePass.wobble * 0.18;
      if (pointIndex === 0) canvasContext.moveTo(horizontal, vertical);
      else canvasContext.lineTo(horizontal, vertical);
    });
    canvasContext.lineCap = 'round';
    canvasContext.lineJoin = 'round';
    canvasContext.lineWidth = strokePass.width;
    canvasContext.strokeStyle = strokePass.color;
    canvasContext.setLineDash(strokePass.dash);
    canvasContext.lineDashOffset = -(elapsedSeconds * 1.1 + pathIndex * 2.7);
    canvasContext.stroke();
    canvasContext.restore();
  });
}

function drawBlossom(canvasContext, blossom, opacity, elapsedSeconds) {
  if (opacity <= 0) return;

  canvasContext.save();
  canvasContext.translate(blossom.horizontal, blossom.vertical);
  canvasContext.rotate(blossom.rotation + Math.sin(elapsedSeconds * 0.42 + blossom.delay * 20) * 0.035);
  canvasContext.scale(blossom.size, blossom.size);

  const petalTones = [
    `rgba(222, 216, 202, ${opacity * 0.82})`,
    `rgba(168, 165, 155, ${opacity * 0.78})`,
    `rgba(201, 196, 184, ${opacity * 0.74})`,
    `rgba(128, 126, 119, ${opacity * 0.72})`,
    `rgba(186, 181, 168, ${opacity * 0.8})`,
  ];

  petalTones.forEach((tone, petalIndex) => {
    const angle = (Math.PI * 2 * petalIndex) / petalTones.length + 0.16;
    canvasContext.save();
    canvasContext.rotate(angle);
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);
    canvasContext.bezierCurveTo(0.7, -0.55, 0.85, -1.34, 0.25, -1.74);
    canvasContext.bezierCurveTo(-0.46, -2.12, -1.23, -1.48, -1.02, -0.68);
    canvasContext.bezierCurveTo(-0.75, 0.02, -0.25, 0.24, 0, 0);
    canvasContext.fillStyle = tone;
    canvasContext.fill();
    canvasContext.strokeStyle = `rgba(38, 37, 33, ${opacity * 0.42})`;
    canvasContext.lineWidth = 0.075;
    canvasContext.stroke();
    canvasContext.restore();
  });

  canvasContext.strokeStyle = `rgba(43, 42, 37, ${opacity * 0.72})`;
  canvasContext.lineWidth = 0.085;
  canvasContext.lineCap = 'round';
  for (let stamenIndex = 0; stamenIndex < 5; stamenIndex += 1) {
    const angle = (Math.PI * 2 * stamenIndex) / 5 + 0.32;
    canvasContext.beginPath();
    canvasContext.moveTo(0, 0);
    canvasContext.lineTo(Math.cos(angle) * 0.92, Math.sin(angle) * 0.92);
    canvasContext.stroke();
    canvasContext.beginPath();
    canvasContext.arc(Math.cos(angle) * 0.96, Math.sin(angle) * 0.96, 0.12, 0, Math.PI * 2);
    canvasContext.fillStyle = `rgba(36, 35, 31, ${opacity * 0.86})`;
    canvasContext.fill();
  }

  canvasContext.beginPath();
  canvasContext.arc(0, 0, 0.33, 0, Math.PI * 2);
  canvasContext.fillStyle = `rgba(39, 37, 33, ${opacity * 0.92})`;
  canvasContext.fill();
  canvasContext.restore();
}

function renderPlumScene(canvasContext, phase, cycleIndex, elapsedSeconds, canvasMetrics) {
  const { devicePixelRatio, offsetHorizontal, offsetVertical, scale, width, height } = canvasMetrics;
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  canvasContext.clearRect(0, 0, width * devicePixelRatio, height * devicePixelRatio);
  canvasContext.setTransform(devicePixelRatio * scale, 0, 0, devicePixelRatio * scale, devicePixelRatio * offsetHorizontal, devicePixelRatio * offsetVertical);

  const substrate = canvasContext.createRadialGradient(436, 257, 36, 436, 257, 326);
  substrate.addColorStop(0, 'rgba(189, 184, 170, 0.06)');
  substrate.addColorStop(0.62, 'rgba(155, 150, 138, 0.022)');
  substrate.addColorStop(1, 'rgba(155, 150, 138, 0)');
  canvasContext.fillStyle = substrate;
  canvasContext.fillRect(0, 0, plumCanvasSize.width, plumCanvasSize.height);

  const convergeAmount = smoothStep(0.22, 0.56, phase);
  const branchAmount = smoothStep(0.46, 0.64, phase);
  const blossomAmount = smoothStep(0.61, 0.76, phase);
  const dissolveAmount = smoothStep(0.86, 0.995, phase);
  const branchOpacity = branchAmount * (1 - dissolveAmount);
  const blossomOpacity = blossomAmount * (1 - dissolveAmount);

  plumParticles.forEach((particle) => {
    const currentScatter = getScatterPosition(particle, cycleIndex, elapsedSeconds);
    const nextScatter = getScatterPosition(particle, cycleIndex + 1, elapsedSeconds);
    const targetPath = plumPaths[particle.targetPathIndex];
    const target = getPointOnPath(targetPath.points, particle.targetProgress);
    const gatherWobbleStrength = (1 - convergeAmount) * 10;
    const gatheredPosition = {
      horizontal: interpolate(currentScatter.horizontal, target.horizontal, convergeAmount) + Math.sin(elapsedSeconds * 0.72 + particle.seed) * gatherWobbleStrength,
      vertical: interpolate(currentScatter.vertical, target.vertical, convergeAmount) + Math.cos(elapsedSeconds * 0.63 + particle.seed * 1.4) * gatherWobbleStrength,
    };
    const releaseAmount = smoothStep(particle.releaseDelay, 1, phase);
    const horizontal = interpolate(gatheredPosition.horizontal, nextScatter.horizontal, releaseAmount);
    const vertical = interpolate(gatheredPosition.vertical, nextScatter.vertical, releaseAmount);
    const particleOpacity = (1 - branchAmount) * (0.5 + seededValue(particle.seed + 2) * 0.34) + releaseAmount * 0.76;
    drawInkDot(canvasContext, horizontal, vertical, particle.radius, particleOpacity, particle.seed);
  });

  plumPaths.forEach((path, pathIndex) => {
    const pathProgress = smoothStep(0.46 + path.delay * 0.52, 0.62 + path.delay * 0.46, phase);
    strokeInkPath(canvasContext, path, pathProgress, branchOpacity, elapsedSeconds, pathIndex);
  });

  if (branchOpacity > 0) {
    plumPaths.slice(0, 5).forEach((path, pathIndex) => {
      const knot = getPointOnPath(path.points, 0.16 + (pathIndex % 3) * 0.24);
      drawInkDot(canvasContext, knot.horizontal, knot.vertical, 3.6 + pathIndex * 0.8, branchOpacity * 0.48, 200 + pathIndex);
    });
  }

  plumBlossoms.forEach((blossom, blossomIndex) => {
    const individualBloom = smoothStep(0.6 + blossom.delay * 0.18, 0.73 + blossom.delay * 0.12, phase) * (1 - dissolveAmount);
    drawBlossom(canvasContext, blossom, individualBloom, elapsedSeconds + blossomIndex * 0.13);
  });

  if (blossomOpacity > 0) {
    plumBlossoms.slice(1, 9).forEach((blossom, blossomIndex) => {
      const budOffset = 8 + (blossomIndex % 3) * 3;
      drawInkDot(canvasContext, blossom.horizontal + budOffset, blossom.vertical - budOffset * 0.4, 2.1 + (blossomIndex % 2), blossomOpacity * 0.46, 309 + blossomIndex);
    });
  }
}

function PlumCycleIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return undefined;

    let animationFrame = 0;
    let startTimestamp = null;
    let canvasMetrics = { width: 0, height: 0, devicePixelRatio: 1, offsetHorizontal: 0, offsetVertical: 0, scale: 1 };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * devicePixelRatio);
      canvas.height = Math.round(bounds.height * devicePixelRatio);
      const scale = Math.min(bounds.width / plumCanvasSize.width, bounds.height / plumCanvasSize.height);
      canvasMetrics = {
        width: bounds.width,
        height: bounds.height,
        devicePixelRatio,
        scale,
        offsetHorizontal: (bounds.width - plumCanvasSize.width * scale) / 2,
        offsetVertical: (bounds.height - plumCanvasSize.height * scale) / 2,
      };
    };

    const renderFrame = (timestamp) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const elapsedMilliseconds = timestamp - startTimestamp;
      const cycleIndex = Math.floor(elapsedMilliseconds / plumLoopDuration);
      const phase = (elapsedMilliseconds % plumLoopDuration) / plumLoopDuration;
      renderPlumScene(canvasContext, phase, cycleIndex, elapsedMilliseconds / 1000, canvasMetrics);
      animationFrame = window.requestAnimationFrame(renderFrame);
    };

    resizeCanvas();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      renderPlumScene(canvasContext, 0.79, 0, 0, canvasMetrics);
    } else {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (reducedMotion) renderPlumScene(canvasContext, 0.79, 0, 0, canvasMetrics);
    });
    resizeObserver.observe(canvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return <div className="landing-plum-cycle" aria-hidden="true"><canvas ref={canvasRef} className="landing-plum-canvas" /></div>;
}

const ledgerCanvasSize = { width: 560, height: 430 };
const ledgerResponseDots = Array.from({ length: 19 }, (_, index) => ({
  seed: index * 19.07 + 4.4,
  horizontal: 54 + seededValue(index * 11.8 + 1.9) * 405,
  vertical: 66 + seededValue(index * 7.3 + 6.1) * 258,
  radius: 1.5 + seededValue(index * 3.6 + 9.5) * 2.5,
  rate: 0.18 + seededValue(index * 4.8 + 2.6) * 0.28,
}));

function drawLedgerLine(canvasContext, points, color, width, elapsedSeconds, seed) {
  canvasContext.save();
  canvasContext.beginPath();
  points.forEach(([horizontal, vertical], pointIndex) => {
    const movement = Math.sin(elapsedSeconds * 0.18 + seed + pointIndex * 1.3) * 0.45;
    if (pointIndex === 0) canvasContext.moveTo(horizontal, vertical + movement);
    else canvasContext.lineTo(horizontal, vertical + movement);
  });
  canvasContext.lineCap = 'round';
  canvasContext.lineJoin = 'round';
  canvasContext.lineWidth = width;
  canvasContext.strokeStyle = color;
  canvasContext.stroke();
  canvasContext.restore();
}

function renderResearchLedger(canvasContext, elapsedSeconds, canvasMetrics) {
  const { devicePixelRatio, offsetHorizontal, offsetVertical, scale, width, height } = canvasMetrics;
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  canvasContext.clearRect(0, 0, width * devicePixelRatio, height * devicePixelRatio);
  canvasContext.setTransform(devicePixelRatio * scale, 0, 0, devicePixelRatio * scale, devicePixelRatio * offsetHorizontal, devicePixelRatio * offsetVertical);

  canvasContext.save();
  canvasContext.translate(86, 65);
  canvasContext.rotate(-0.075);

  canvasContext.beginPath();
  canvasContext.moveTo(26, 6);
  canvasContext.bezierCurveTo(111, 1, 233, 4, 340, 10);
  canvasContext.bezierCurveTo(348, 77, 346, 167, 339, 241);
  canvasContext.bezierCurveTo(243, 247, 136, 242, 20, 246);
  canvasContext.bezierCurveTo(14, 179, 17, 76, 26, 6);
  canvasContext.closePath();
  canvasContext.fillStyle = 'rgba(243, 238, 227, 0.045)';
  canvasContext.fill();
  canvasContext.lineWidth = 1.1;
  canvasContext.strokeStyle = 'rgba(222, 216, 203, 0.36)';
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.moveTo(31, 11);
  canvasContext.bezierCurveTo(117, 8, 230, 11, 334, 15);
  canvasContext.bezierCurveTo(340, 82, 339, 164, 334, 236);
  canvasContext.strokeStyle = 'rgba(130, 126, 117, 0.36)';
  canvasContext.lineWidth = 0.72;
  canvasContext.stroke();

  drawLedgerLine(canvasContext, [[54, 48], [145, 48], [218, 49]], 'rgba(231, 225, 211, 0.55)', 1.15, elapsedSeconds, 2.8);
  drawLedgerLine(canvasContext, [[54, 86], [108, 86], [157, 87]], 'rgba(187, 181, 168, 0.46)', 1, elapsedSeconds, 5.2);
  drawLedgerLine(canvasContext, [[54, 122], [130, 122], [194, 122]], 'rgba(187, 181, 168, 0.42)', 1, elapsedSeconds, 7.6);
  drawLedgerLine(canvasContext, [[54, 158], [93, 159], [145, 159]], 'rgba(187, 181, 168, 0.4)', 1, elapsedSeconds, 10.1);

  const chartProgress = 0.58 + Math.sin(elapsedSeconds * 0.24) * 0.08;
  drawLedgerLine(
    canvasContext,
    [[215, 180], [239, 166], [260, 173], [283, 141], [307, 151], [325, 119]].slice(0, Math.max(2, Math.ceil(chartProgress * 6))),
    'rgba(220, 214, 199, 0.62)',
    1.4,
    elapsedSeconds,
    14.3
  );

  const checkOpacity = 0.35 + (Math.sin(elapsedSeconds * 0.42) + 1) * 0.16;
  canvasContext.beginPath();
  canvasContext.moveTo(70, 204);
  canvasContext.lineTo(80, 213);
  canvasContext.lineTo(101, 190);
  canvasContext.strokeStyle = `rgba(231, 226, 214, ${checkOpacity})`;
  canvasContext.lineWidth = 2.05;
  canvasContext.lineCap = 'round';
  canvasContext.stroke();

  ledgerResponseDots.forEach((dot) => {
    const time = elapsedSeconds * dot.rate + dot.seed;
    const horizontal = dot.horizontal + Math.sin(time) * 3.2 + Math.cos(time * 0.57) * 1.7;
    const vertical = dot.vertical + Math.cos(time * 0.84) * 3 + Math.sin(time * 0.42) * 1.4;
    canvasContext.beginPath();
    canvasContext.ellipse(horizontal, vertical, dot.radius, dot.radius * (0.72 + seededValue(dot.seed) * 0.24), seededValue(dot.seed + 5) * Math.PI, 0, Math.PI * 2);
    canvasContext.fillStyle = `rgba(223, 217, 203, ${0.28 + seededValue(dot.seed + 8) * 0.34})`;
    canvasContext.fill();
  });

  canvasContext.restore();

  const outerDotPositions = [[28, 104], [58, 285], [445, 62], [478, 184], [427, 311], [142, 344]];
  outerDotPositions.forEach(([horizontal, vertical], dotIndex) => {
    const time = elapsedSeconds * (0.2 + dotIndex * 0.028) + dotIndex * 2.2;
    canvasContext.beginPath();
    canvasContext.arc(horizontal + Math.sin(time) * 4, vertical + Math.cos(time * 0.74) * 3, 2 + (dotIndex % 2), 0, Math.PI * 2);
    canvasContext.fillStyle = `rgba(212, 207, 195, ${0.22 + dotIndex * 0.025})`;
    canvasContext.fill();
  });
}

function ResearchLedgerIllustration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return undefined;

    let animationFrame = 0;
    let startTimestamp = null;
    let canvasMetrics = { width: 0, height: 0, devicePixelRatio: 1, offsetHorizontal: 0, offsetVertical: 0, scale: 1 };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * devicePixelRatio);
      canvas.height = Math.round(bounds.height * devicePixelRatio);
      const scale = Math.min(bounds.width / ledgerCanvasSize.width, bounds.height / ledgerCanvasSize.height);
      canvasMetrics = {
        width: bounds.width,
        height: bounds.height,
        devicePixelRatio,
        scale,
        offsetHorizontal: (bounds.width - ledgerCanvasSize.width * scale) / 2,
        offsetVertical: (bounds.height - ledgerCanvasSize.height * scale) / 2,
      };
    };

    const renderFrame = (timestamp) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      renderResearchLedger(canvasContext, (timestamp - startTimestamp) / 1000, canvasMetrics);
      animationFrame = window.requestAnimationFrame(renderFrame);
    };

    resizeCanvas();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) renderResearchLedger(canvasContext, 0, canvasMetrics);
    else animationFrame = window.requestAnimationFrame(renderFrame);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      if (reducedMotion) renderResearchLedger(canvasContext, 0, canvasMetrics);
    });
    resizeObserver.observe(canvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return <div className="landing-research-ledger" aria-hidden="true"><canvas ref={canvasRef} className="landing-research-ledger-canvas" /></div>;
}

export default function Landing({ initialAuthMode = 'register' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authMode, setAuthMode] = useState(initialAuthMode);

  useEffect(() => setAuthMode(initialAuthMode), [initialAuthMode]);

  useEffect(() => {
    const revealItems = [...document.querySelectorAll('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -44px' }
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const setMode = (nextMode) => {
    setAuthMode(nextMode);
    navigate({ pathname: nextMode === 'login' ? '/login' : '/register', search: location.search });
  };

  return (
    <main className="landing-page">
      <style>{`
        .landing-page { background: #1c1c1a; color: #eeeae2; min-width: 320px; font-family: var(--font-sans); }
        .landing-shell { position: relative; isolation: isolate; height: min(900px, 100svh); min-height: 720px; overflow: hidden; background: #22211f; }
        .landing-shell:before { position: absolute; z-index: -1; inset: 0; background: repeating-linear-gradient(116deg, rgba(255,255,255,.017) 0 1px, transparent 1px 10px), linear-gradient(120deg, rgba(255,255,255,.018), transparent 42%); content: ''; opacity: .72; pointer-events: none; }
        .landing-brand { position: relative; display: flex; width: 58%; height: 100%; min-height: 0; flex-direction: column; overflow: hidden; background: linear-gradient(137deg, #292825 0%, #1d1d1b 72%, #1a1a18 100%); color: white; padding: 34px clamp(28px, 6vw, 88px) 48px; }
        .landing-brand:before { position: absolute; z-index: 0; inset: 0; background: linear-gradient(122deg, transparent 18%, rgba(255,255,255,.03) 52%, transparent 77%); content: ''; opacity: .72; pointer-events: none; }
        .landing-brand:after { display: none; }
        .landing-brand-header, .landing-brand-content { position: relative; z-index: 2; }
        .landing-brand-header { display: flex; align-items: center; justify-content: space-between; }
        .landing-brand-header a { display: inline-flex; }
        .landing-brand-kicker { color: rgba(232,230,223,.58); font-size: 10px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
        .landing-plum-cycle { position: absolute; z-index: 1; top: 7%; right: -4px; width: min(57%, 590px); opacity: .93; pointer-events: none; }
        .landing-plum-cycle:before { position: absolute; inset: 8% 3% 6% 9%; border-radius: 49% 44% 53% 45%; background: repeating-radial-gradient(ellipse at 58% 49%, rgba(219,215,205,.018) 0 1px, transparent 1px 7px); content: ''; opacity: .42; transform: rotate(-11deg); }
        .landing-plum-canvas { position: relative; display: block; width: 100%; height: auto; aspect-ratio: 720 / 560; }
        .landing-research-ledger { position: absolute; z-index: 1; top: 8%; right: 2%; width: min(50%, 510px); opacity: .92; pointer-events: none; }
        .landing-research-ledger:before { position: absolute; inset: 7% 5% 10% 6%; border-radius: 48% 52% 43% 57%; background: radial-gradient(ellipse at 55% 48%, rgba(235,230,218,.035), transparent 67%); content: ''; }
        .landing-research-ledger-canvas { position: relative; display: block; width: 100%; height: auto; aspect-ratio: 560 / 430; }
        .landing-brand-header { animation: landing-enter-soft .8s cubic-bezier(.2,.8,.2,1) both; }
        .landing-brand-content { margin-top: auto; max-width: 590px; }
        .landing-brand-content h1 { max-width: 620px; margin: 0; color: #f4f1e9; font-family: var(--font-serif); font-size: clamp(42px, 4.4vw, 70px); font-weight: 820; letter-spacing: -.045em; line-height: .98; }
        .landing-brand-content > p { max-width: 525px; margin: 22px 0 0; color: rgba(233,231,225,.68); font-size: 16px; line-height: 1.75; }
        .landing-brand-proof { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 11px; margin-top: 35px; }
        .landing-brand-proof span { display: flex; min-height: 62px; align-items: center; gap: 8px; border-top: 1px solid rgba(239,237,230,.22); color: rgba(239,237,230,.76); font-size: 12px; font-weight: 700; line-height: 1.35; padding-top: 12px; }
        .landing-brand-proof svg { flex: 0 0 auto; color: #c7c6c0; }
        .landing-brand-content h1, .landing-brand-content > p, .landing-brand-proof { opacity: 0; animation: landing-enter-soft .82s cubic-bezier(.2,.8,.2,1) both; }
        .landing-brand-content h1 { animation-delay: .12s; }
        .landing-brand-content > p { animation-delay: .22s; }
        .landing-brand-proof { animation-delay: .32s; }
        .landing-access { position: absolute; z-index: 2; top: 0; right: 0; bottom: 0; display: flex; width: 42%; min-width: 480px; min-height: 0; height: auto; flex-direction: column; overflow: hidden; border: 0; border-radius: 0; background: #f3ede0; box-shadow: inset 1px 0 rgba(27,27,25,.18); color: #1b1b19; padding: 34px clamp(28px, 4vw, 68px) 32px; animation: landing-access-in .86s cubic-bezier(.2,.8,.2,1) .16s both; }
        .landing-access-nav { display: flex; align-items: center; justify-content: flex-end; gap: 22px; font-size: 13px; font-weight: 700; }
        .landing-access-nav a { color: #636057; text-decoration: none; }
        .landing-access-nav a:hover { color: #171714; }
        .landing-access-nav .landing-nav-pill { border: 1px solid #252522; border-radius: 999px; color: #171714; padding: 9px 14px; }
        .landing-access-inner { display: flex; min-height: 0; flex: 1; flex-direction: column; align-items: center; justify-content: flex-start; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain; padding: 42px 12px 72px; scroll-padding-top: 42px; scrollbar-width: thin; scrollbar-color: rgba(58,57,52,.32) transparent; }
        .public-auth-panel { width: min(100%, 400px); }
        .public-auth-tabs { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid rgba(34,33,30,.2); }
        .public-auth-tabs button { border: 0; border-bottom: 2px solid transparent; background: transparent; color: #858178; cursor: pointer; font-size: 13px; font-weight: 800; padding: 0 0 13px; }
        .public-auth-tabs button.is-active { border-color: #171714; color: #171714; }
        .public-auth-content { padding-top: 31px; }
        .public-auth-eyebrow { margin: 0 0 8px; color: #69665e; font-size: 10px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
        .public-auth-content h2 { margin: 0; color: #11110f; font-family: var(--font-serif); font-size: clamp(31px, 3.4vw, 42px); font-weight: 820; letter-spacing: -.035em; line-height: 1.06; }
        .public-auth-intro { margin: 12px 0 22px; color: #68655d; font-size: 14px; line-height: 1.65; }
        .public-auth-consent { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 17px; color: #68655d; font-size: 11px; line-height: 1.45; }
        .public-auth-consent input { width: 14px; height: 14px; margin: 1px 0 0; accent-color: #272724; }
        .public-auth-consent a, .public-auth-secondary a { color: #1a1a18; font-weight: 800; }
        .public-auth-google-disabled { display: flex; width: 100%; height: 44px; align-items: center; justify-content: center; gap: 10px; border: 1px solid rgba(34,33,30,.22); border-radius: 999px; background: rgba(255,255,255,.34); color: #68655d; cursor: not-allowed; font-size: 14px; font-weight: 700; }
        .public-auth-divider { display: flex; align-items: center; gap: 12px; color: #8a877e; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; margin: 23px 0; }
        .public-auth-divider:before, .public-auth-divider:after { height: 1px; flex: 1; background: rgba(34,33,30,.18); content: ''; }
        .public-auth-form { display: grid; gap: 15px; }
        .public-auth-form label > span:first-child { display: block; margin-bottom: 7px; color: #625f57; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
        .public-auth-input { display: flex !important; height: 48px; align-items: center; gap: 9px; border: 1px solid rgba(34,33,30,.25); border-radius: 13px; background: rgba(255,255,255,.4); color: #68655d; padding: 0 13px; transition: border-color .18s ease, box-shadow .18s ease, background .18s ease; }
        .public-auth-input:focus-within { border-color: #272724; background: rgba(255,255,255,.7); box-shadow: 0 0 0 3px rgba(39,39,36,.08); }
        .public-auth-input input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: #1b1b19; font-size: 14px; font-weight: 600; }
        .public-auth-input input::placeholder { color: #99958b; font-weight: 500; }
        .public-auth-input button { border: 0; background: transparent; color: #68655d; cursor: pointer; padding: 4px; }
        .public-auth-secondary { margin-top: -4px; text-align: right; font-size: 12px; }
        .public-auth-submit, .public-auth-email-cta { display: flex; width: 100%; height: 49px; align-items: center; justify-content: center; gap: 8px; border: 1px solid #1b1b19; border-radius: 13px; background: #1b1b19; color: #f7f4ed; cursor: pointer; font-size: 14px; font-weight: 800; transition: transform .18s ease, background .18s ease, border-color .18s ease; }
        .public-auth-submit:hover, .public-auth-email-cta:hover { border-color: #393936; background: #393936; transform: translateY(-1px); }
        .public-auth-submit:disabled, .public-auth-code:disabled { cursor: not-allowed; opacity: .55; transform: none; }
        .public-auth-email-cta { background: transparent; color: #1b1b19; }
        .public-auth-back { display: inline-flex; width: max-content; align-items: center; gap: 4px; border: 0; background: transparent; color: #2d2d29; cursor: pointer; font-size: 12px; font-weight: 800; margin-bottom: 2px; padding: 0; }
        .public-auth-code { justify-self: start; border: 0; background: transparent; color: #2d2d29; cursor: pointer; font-size: 12px; font-weight: 800; margin-top: -7px; padding: 0; }
        .public-auth-register-form { gap: 13px; }
        .public-auth-register-form .cf-turnstile { max-width: 100%; }
        .public-auth-message { margin: 15px 0 0; border: 1px solid #f7caca; border-radius: 11px; background: #fff5f5; color: #bb3434; font-size: 12px; font-weight: 700; line-height: 1.45; padding: 10px 12px; }
        .public-auth-message.is-success { border-color: #a7e3d5; background: #edfffa; color: #08755f; }
        .landing-scroll-cue { display: flex; align-items: center; gap: 8px; color: #77746c; font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .landing-news-preview { background: linear-gradient(180deg, #1b1b19, #20201e); color: white; padding: 0 0 72px; }
        .landing-news-preview-panel { border: 1px solid rgba(239,237,230,.16); border-radius: 26px; background: linear-gradient(135deg, #292825, #20201e); box-shadow: 0 28px 70px rgba(0,0,0,.22); padding: clamp(22px, 4vw, 42px); }
        .landing-news-preview-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 24px; }
        .landing-news-preview-head h2 { max-width: 560px; margin: 0; color: var(--color-paper); font-family: var(--font-serif); font-size: clamp(31px, 3.4vw, 48px); font-weight: 820; letter-spacing: -.04em; line-height: 1.02; }
        .landing-news-preview-head a { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(244,241,232,.20); border-radius: 999px; background: rgba(244,241,232,.055); color: #e4e1d9; font-size: 13px; font-weight: 850; text-decoration: none; padding: 12px 16px; white-space: nowrap; }
        .landing-news-preview-head a:hover { background: rgba(244,241,232,.10); color: white; }
        .landing-news-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .landing-news-card { overflow: hidden; border: 1px solid rgba(235,233,226,.14); border-radius: 20px; background: rgba(247,245,239,.055); color: white; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,.045); transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .landing-news-card:hover { border-color: rgba(244,241,232,.35); background: rgba(247,245,239,.085); transform: translateY(-3px); }
        .landing-news-card.is-loading { min-height: 330px; background: linear-gradient(100deg, rgba(255,255,255,.06), rgba(255,255,255,.12), rgba(255,255,255,.06)); background-size: 220% 100%; animation: landing-news-shimmer 1.4s ease-in-out infinite; }
        .landing-news-card-image { aspect-ratio: 1.9; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,.09); background: #242421; }
        .landing-news-card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s cubic-bezier(.2,.7,.2,1); }
        .landing-news-card:hover .landing-news-card-image img { transform: scale(1.04); }
        .landing-news-image-fallback { display: grid; width: 100%; height: 100%; place-items: center; background: radial-gradient(circle at 60% 35%, rgba(244,241,232,.08), transparent 42%), #171715; color: #d7d4cc; }
        .landing-news-card-body { padding: 18px; }
        .landing-news-card-body > p { margin: 0 0 9px; color: #c5c2ba; font-size: 10px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
        .landing-news-card-body h3 { min-height: 3.1em; margin: 0; display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: 16px; font-weight: 850; letter-spacing: -.02em; line-height: 1.35; }
        .landing-news-card-meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 10px; margin-top: 15px; color: rgba(224,221,214,.62); font-size: 11px; font-weight: 800; }
        .landing-news-card-meta span { display: inline-flex; align-items: center; gap: 5px; }
        .landing-news-preview-error { border: 1px solid rgba(221,217,207,.22); border-radius: 16px; background: rgba(244,241,232,.055); color: #dad6cb; font-size: 13px; font-weight: 800; padding: 14px 16px; }
        .landing-tone-transition { position: relative; height: clamp(76px, 7vw, 126px); overflow: hidden; }
        .landing-tone-transition:after { position: absolute; inset: -20% -10%; background: radial-gradient(ellipse 48% 110% at 50% 50%, rgba(112,184,187,.12), transparent 70%); animation: landing-transition-breathe 12s ease-in-out infinite alternate; content: ''; pointer-events: none; }
        .landing-tone-transition.is-dark-to-light { background: linear-gradient(180deg, #020303 0%, #050706 42%, #090805 72%, #000 100%); }
        .landing-tone-transition.is-light-to-dark { background: linear-gradient(180deg, #000 0%, #080806 34%, #0b1010 70%, #090c0e 100%); }
        .landing-tone-transition.is-global-to-light { height: clamp(72px, 6vw, 108px); background: linear-gradient(180deg, #020303 0%, #0b1110 45%, #090806 100%); }
        .landing-tone-transition.is-dark-to-paper { height: clamp(82px, 8vw, 132px); background: linear-gradient(180deg, #1c1c1a 0%, #292825 32%, #cbc8c0 71%, #f3ede0 100%); }
        .landing-tone-transition.is-dark-to-paper:after { display: none; }
        .landing-tone-transition.is-paper-to-ink { height: clamp(72px, 6vw, 104px); background: linear-gradient(180deg, #f3ede0 0%, #dedbd3 38%, #2e2e2b 84%, #121211 100%); }
        .landing-tone-transition.is-paper-to-ink:after { display: none; }
        .landing-human-manifesto { position: relative; overflow: hidden; background: radial-gradient(circle at 87% 10%, rgba(184,164,117,.16), transparent 27%), radial-gradient(circle at 11% 80%, rgba(107,130,112,.09), transparent 25%), #f3ede0; color: #171714; padding: clamp(54px, 6vw, 94px) 0 clamp(74px, 7vw, 112px); }
        .landing-human-manifesto:before { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0 6px, rgba(67,55,33,.017) 7px 8px); content: ''; opacity: .7; pointer-events: none; }
        .landing-human-manifesto .landing-container { width: min(100% - 72px, 1360px); }
        .landing-manifesto-inner { position: relative; z-index: 1; }
        .landing-manifesto-masthead { display: grid; grid-template-columns: minmax(0,1fr) minmax(280px, .33fr); gap: clamp(32px, 6vw, 96px); align-items: end; border-top: 1px solid rgba(34,31,23,.24); padding-top: clamp(24px, 3.2vw, 43px); }
        .landing-manifesto-label { margin: 0; color: #5e594e; font-size: 11px; font-weight: 900; letter-spacing: .19em; text-transform: uppercase; }
        .landing-manifesto-masthead h2 { max-width: 1060px; margin: 13px 0 0; color: #000; font-family: var(--font-serif); font-size: clamp(60px, 7.4vw, 112px); font-weight: 760; letter-spacing: -.065em; line-height: .88; }
        .landing-manifesto-deck { max-width: 570px; margin: 25px 0 0; color: #38362f; font-family: var(--font-serif); font-size: clamp(21px, 2vw, 29px); font-weight: 570; letter-spacing: -.024em; line-height: 1.25; }
        .landing-manifesto-mark { display: grid; grid-template-columns: 126px minmax(0,1fr); align-items: end; gap: 18px; border-left: 1px solid rgba(34,31,23,.24); padding: 3px 0 3px 24px; }
        .landing-manifesto-mark > div { padding-bottom: 8px; }
        .landing-manifesto-mark span { display: block; color: #141512; font-size: 12px; font-weight: 900; letter-spacing: .13em; line-height: 1.38; }
        .landing-manifesto-mark p { max-width: 190px; margin: 16px 0 0; color: #625e55; font-size: 11px; font-weight: 750; letter-spacing: .02em; line-height: 1.55; }
        .landing-manifesto-sprout { width: 126px; color: #172018; }
        .landing-manifesto-sprout svg { display: block; width: 100%; height: auto; overflow: visible; }
        .landing-sprout-sun { fill: rgba(168,179,145,.36); transform-origin: 155px 67px; animation: landing-sprout-breathe 5.6s ease-in-out infinite; }
        .landing-sprout-ground, .landing-sprout-stem, .landing-sprout-root, .landing-sprout-vein { stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 3.2; }
        .landing-sprout-ground { opacity: .88; }
        .landing-sprout-root { opacity: .68; }
        .landing-sprout-stem { stroke-dasharray: 95; stroke-dashoffset: 95; animation: landing-sprout-draw .95s cubic-bezier(.2,.8,.2,1) .15s forwards; }
        .landing-sprout-leaf { fill: #8f9e7b; stroke: currentColor; stroke-linejoin: round; stroke-width: 3.2; transform-box: fill-box; }
        .landing-sprout-leaf-left { transform-origin: 100% 100%; animation: landing-sprout-sway 5.2s ease-in-out 1.05s infinite; }
        .landing-sprout-leaf-right { fill: #aab494; transform-origin: 0 100%; animation: landing-sprout-sway-reverse 5.9s ease-in-out 1.2s infinite; }
        .landing-sprout-vein { stroke-width: 2.2; opacity: .72; }
        .landing-sprout-vein-left { animation: landing-sprout-vein-left 5.2s ease-in-out 1.05s infinite; }
        .landing-sprout-vein-right { animation: landing-sprout-vein-right 5.9s ease-in-out 1.2s infinite; }
        .landing-manifesto-spread { display: grid; grid-template-columns: minmax(320px,.84fr) minmax(0,1.16fr); gap: clamp(36px, 6vw, 86px); align-items: start; border-top: 1px solid rgba(35,31,22,.24); margin-top: clamp(36px, 4vw, 58px); padding-top: clamp(26px, 3vw, 42px); }
        .landing-manifesto-art { position: relative; height: clamp(410px, 36vw, 540px); margin: 0; overflow: hidden; border: 1px solid rgba(35,31,22,.24); background: #b8c5c0; box-shadow: 16px 17px 0 rgba(84,72,45,.06); }
        .landing-manifesto-art:after { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(245,239,223,.02) 30%, rgba(12,22,19,.74) 100%); content: ''; pointer-events: none; }
        .landing-manifesto-art img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 100%; filter: saturate(.8) contrast(.95) sepia(.08); transform: scale(1.45) translateY(-14%); transform-origin: 50% 80%; }
        .landing-manifesto-art figcaption { position: absolute; z-index: 1; right: clamp(28px, 4vw, 58px); bottom: clamp(27px, 4vw, 50px); left: clamp(28px, 4vw, 58px); display: flex; align-items: end; gap: 20px; color: #f8f2e5; }
        .landing-manifesto-art figcaption span { border-right: 1px solid rgba(249,243,229,.55); color: #e3d2ab; font-size: 11px; font-weight: 900; letter-spacing: .16em; padding: 5px 18px 5px 0; }
        .landing-manifesto-art figcaption strong { max-width: 390px; font-family: var(--font-serif); font-size: clamp(24px, 2.5vw, 37px); font-weight: 700; letter-spacing: -.035em; line-height: 1.08; }
        .landing-manifesto-copy { display: flex; max-width: 660px; min-width: 0; flex-direction: column; justify-content: flex-start; color: #514f49; font-size: clamp(15px, 1.3vw, 17px); line-height: 1.88; padding: 0; }
        .landing-manifesto-copy p { margin: 0; }
        .landing-manifesto-copy p + p { margin-top: 21px; }
        .landing-manifesto-lede { color: #272620; font-size: clamp(16px, 1.35vw, 19px); font-weight: 680; letter-spacing: -.012em; line-height: 1.65; }
        .landing-manifesto-principle { border-top: 1px solid rgba(130,103,49,.46); color: #172c23; font-family: var(--font-serif); font-size: clamp(24px, 2.35vw, 34px); font-weight: 700; letter-spacing: -.035em; line-height: 1.14; margin-top: 38px !important; padding-top: 23px; }
        .landing-sections { background: #f3ede0; color: #171714; }
        .landing-container { width: min(100% - 48px, 1200px); margin: 0 auto; }
        .landing-intro { display: grid; grid-template-columns: minmax(0,.95fr) minmax(0,1.05fr); gap: clamp(42px, 8vw, 112px); align-items: center; padding: 120px 0; }
        .landing-label { margin: 0; color: #aaa18a; font-size: 11px; font-weight: 900; letter-spacing: .17em; text-transform: uppercase; }
        .landing-intro h2, .landing-quality-copy h2, .landing-panelist-heading h2 { margin: 14px 0 0; color: var(--color-paper); font-family: var(--font-serif); font-size: clamp(35px, 4.4vw, 58px); font-weight: 820; letter-spacing: -.04em; line-height: 1.02; }
        .landing-intro > p, .landing-quality-copy > p, .landing-panelist-heading > p { color: rgba(225,235,232,.64); font-size: 16px; line-height: 1.8; }
        .landing-intro > p { margin: 0; }
        .landing-photo-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 16px; padding-bottom: 120px; }
        .landing-photo { position: relative; min-height: 350px; overflow: hidden; border-radius: 22px; background: #102126; content-visibility: auto; contain-intrinsic-size: 390px; }
        .landing-photo-loading { position: absolute; z-index: 0; inset: 0; display: grid; place-items: center; background: radial-gradient(circle at 70% 20%, rgba(104, 187, 190, .2), transparent 34%), linear-gradient(135deg, #173539, #0a161a 72%); opacity: 1; transition: opacity .45s ease; }
        .landing-photo.is-short .landing-photo-loading { background: radial-gradient(circle at 26% 72%, rgba(244, 241, 232, .075), transparent 33%), linear-gradient(135deg, #26343a, #141b20 76%); }
        .landing-photo.is-wide .landing-photo-loading { background: radial-gradient(circle at 78% 26%, rgba(109, 151, 157, .2), transparent 31%), linear-gradient(135deg, #253336, #111819 76%); }
        .landing-photo-loading:before, .landing-photo-loading:after, .landing-photo-loading span { width: 35%; height: 1px; background: rgba(223, 244, 241, .2); content: ''; transform: translateY(-11px); }
        .landing-photo-loading:after { width: 21%; transform: translateY(11px); }
        .landing-photo-loading span { width: 6px; height: 6px; border-radius: 50%; background: rgba(221, 246, 243, .56); box-shadow: 0 0 0 7px rgba(217, 244, 240, .08); transform: none; }
        .landing-photo img { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 1; transform: scale(1.001); transition: opacity .45s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
        .landing-photo.is-loading img, .landing-photo.is-error img { opacity: 0; }
        .landing-photo.is-loaded .landing-photo-loading { opacity: 0; }
        .landing-photo-fallback { position: absolute; z-index: 1; inset: 0; display: grid; place-items: center; background: radial-gradient(circle at 54% 38%, rgba(99, 184, 187, .14), transparent 38%), linear-gradient(135deg, #132b30, #071013); color: rgba(222, 237, 234, .63); font-size: 11px; font-weight: 800; letter-spacing: .12em; opacity: 0; text-align: center; text-transform: uppercase; transition: opacity .25s ease; }
        .landing-photo-fallback span { max-width: 190px; line-height: 1.6; }
        .landing-photo.is-error .landing-photo-loading { opacity: 0; }
        .landing-photo.is-error .landing-photo-fallback { opacity: 1; }
        .landing-photo:hover img { transform: scale(1.035); }
        .landing-photo.is-short { min-height: 350px; }
        .landing-photo.is-wide { grid-column: 1 / -1; min-height: 390px; }
        .landing-photo-caption { position: absolute; z-index: 2; right: 18px; bottom: 18px; left: 18px; border: 1px solid rgba(255,255,255,.2); border-radius: 15px; background: rgba(8,14,17,.76); color: white; padding: 16px; backdrop-filter: blur(10px); }
        .landing-photo-caption p { margin: 0; color: #c9c1aa; font-size: 10px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
        .landing-photo-caption strong { display: block; margin-top: 5px; font-size: 16px; line-height: 1.3; }
        .landing-quality { background: #090c0e; color: white; padding: 118px 0; }
        .landing-quality-grid { display: grid; grid-template-columns: minmax(0,.85fr) minmax(0,1.15fr); gap: clamp(45px, 8vw, 112px); }
        .landing-quality-copy h2 { color: white; }
        .landing-quality-copy > p { color: rgba(255,255,255,.62); }
        .landing-quality-list { display: grid; border-top: 1px solid rgba(255,255,255,.2); }
        .landing-quality-item { display: grid; grid-template-columns: 44px 1fr; gap: 18px; border-bottom: 1px solid rgba(255,255,255,.2); padding: 25px 0; }
        .landing-quality-icon { display: grid; width: 39px; height: 39px; place-items: center; border: 1px solid rgba(255,255,255,.24); border-radius: 50%; color: rgba(231,241,239,.9); }
        .landing-quality-item h3 { margin: 0; font-size: 18px; }
        .landing-quality-item p { max-width: 455px; margin: 8px 0 0; color: rgba(255,255,255,.62); font-size: 14px; line-height: 1.7; }
        .landing-global-section { position: relative; overflow: hidden; background: repeating-linear-gradient(0deg, transparent 0 7px, rgba(67,55,33,.016) 8px 9px), #f3ede0; color: #171714; }
        .landing-global-section:before { position: absolute; inset: 0; border-top: 1px solid rgba(34,31,23,.24); border-bottom: 1px solid rgba(34,31,23,.18); content: ''; pointer-events: none; }
        .landing-global-section:after { position: absolute; top: 50%; left: 4%; width: min(31vw, 410px); height: 1px; background: rgba(34,31,23,.16); content: ''; pointer-events: none; }
        .landing-global { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(280px,.68fr) minmax(0,1.32fr); gap: clamp(52px, 8vw, 138px); min-height: 512px; align-items: center; padding: clamp(58px, 6vw, 88px) 0; }
        .landing-global-copy { max-width: 650px; border-left: 1px solid rgba(34,31,23,.24); padding: 7px 0 8px clamp(28px, 3vw, 48px); }
        .landing-global-copy .landing-label { color: #545249; }
        .landing-global-copy h2 { margin: 15px 0 0; color: #000; font-family: var(--font-serif); font-size: clamp(40px, 4.45vw, 64px); font-weight: 760; letter-spacing: -.052em; line-height: .96; }
        .landing-global-copy p { max-width: 540px; color: #625f57; font-size: 16px; line-height: 1.82; }
        .landing-global-visual { position: relative; min-height: 330px; }
        .landing-map-frame { position: absolute; inset: 0; display: grid; min-height: 0; place-items: center; overflow: visible; border: 0; border-radius: 0; background: transparent; box-shadow: none; content-visibility: auto; contain-intrinsic-size: 330px; }
        .landing-map-frame:before { position: absolute; width: min(78%, 296px); aspect-ratio: 1; border: 1px solid rgba(34,31,23,.18); border-radius: 50%; content: ''; pointer-events: none; }
        .landing-map-frame:after { position: absolute; width: min(94%, 354px); height: 1px; background: rgba(34,31,23,.18); content: ''; pointer-events: none; transform: translateY(142px); }
        .landing-global-globe { position: relative; z-index: 1; display: block; width: min(72%, 276px); max-width: 276px; aspect-ratio: 1; filter: none; transform: translate(-1%, -1%); }
        .landing-global-globe-canvas { display: block; width: 100%; height: 100%; cursor: grab; touch-action: pan-y; }
        .landing-global-globe-canvas:active { cursor: grabbing; }
        .landing-panelists { padding: 118px 0; }
        .landing-panelist-heading { max-width: 655px; }
        .landing-panelist-heading > p { margin: 18px 0 0; }
        .landing-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 55px; }
        .landing-step { min-height: 220px; border: 1px solid rgba(244,241,232,.13); border-radius: 19px; background: linear-gradient(145deg, rgba(244,241,232,.045), rgba(255,255,255,.012)); box-shadow: inset 0 1px 0 rgba(255,255,255,.04); padding: 25px; }
        .landing-step > span { color: #aaa18a; font-size: 12px; font-weight: 900; letter-spacing: .12em; }
        .landing-step h3 { margin: 48px 0 0; color: #f4f1e8; font-size: 19px; }
        .landing-step p { margin: 10px 0 0; color: rgba(225,235,232,.6); font-size: 14px; line-height: 1.7; }
        .landing-reward-banner { position: relative; min-height: 410px; overflow: hidden; border-radius: 24px; background: #0b1317; margin-top: 72px; }
        .landing-reward-banner img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .55; }
        .landing-reward-banner:after { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(4,9,12,.9), rgba(4,9,12,.3)); content: ''; }
        .landing-reward-copy { position: relative; z-index: 1; max-width: 570px; color: white; padding: 70px; }
        .landing-reward-copy h2 { margin: 14px 0 0; font-family: var(--font-serif); font-size: clamp(34px, 4.4vw, 56px); font-weight: 820; letter-spacing: -.04em; line-height: 1.02; }
        .landing-reward-copy p { color: rgba(255,255,255,.7); font-size: 15px; line-height: 1.8; }
        .landing-reward-copy a { display: inline-flex; align-items: center; gap: 7px; color: #d7d0bb; font-size: 14px; font-weight: 800; text-decoration: none; }
        .landing-footer { overflow: hidden; background: #030303; color: white; }
        .landing-footer-grid { display: grid; grid-template-columns: minmax(280px, .9fr) minmax(0, 1.1fr); min-height: 310px; }
        .landing-footer-brand { position: relative; display: flex; flex-direction: column; justify-content: center; overflow: hidden; border-right: 1px solid rgba(255,255,255,.1); padding: 54px clamp(28px, 5vw, 72px); }
        .landing-footer-brand:before { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(244,241,232,.045), transparent 44%), repeating-linear-gradient(-12deg, transparent 0 16px, rgba(244,241,232,.014) 17px 18px); content: ''; }
        .landing-footer-brand img, .landing-footer-brand p { position: relative; z-index: 1; }
        .landing-footer-identity { position: relative; z-index: 1; display: flex; align-items: center; gap: 14px; }
        .landing-footer-logo-mark { width: 47px; height: 47px; object-fit: contain; mix-blend-mode: screen; }
        .landing-footer-brand p { max-width: 420px; margin: 20px 0 0; color: #98a8bf; font-size: 15px; line-height: 1.75; }
        .landing-footer-contact { display: flex; flex-direction: column; justify-content: center; padding: 54px clamp(28px, 5vw, 72px); }
        .landing-footer-contact h2 { margin: 0; color: #c9c1aa; font-size: 14px; font-weight: 800; letter-spacing: .08em; }
        .landing-footer-contact p { max-width: 490px; margin: 18px 0 0; color: #9aa9c0; font-size: 15px; line-height: 1.75; }
        .landing-footer-email { display: inline-flex; width: max-content; margin-top: 15px; color: white; font-size: clamp(19px, 2vw, 25px); font-weight: 750; letter-spacing: -.02em; text-decoration: none; }
        .landing-footer-email:hover { color: #d7d0bb; }
        .landing-social-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .landing-social-link { display: grid; width: 54px; height: 54px; place-items: center; border: 1px solid rgba(255,255,255,.1); border-radius: 14px; background: rgba(255,255,255,.075); color: #f8fbfb; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,.05), 0 16px 34px rgba(0,0,0,.18); transition: transform .18s ease, border-color .18s ease, background .18s ease, color .18s ease; }
        .landing-social-link svg { width: 28px; height: 28px; display: block; }
        .landing-social-link:hover { border-color: rgba(244,241,232,.24); background: rgba(244,241,232,.08); color: #f4f1e8; transform: translateY(-2px); }
        .landing-footer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 24px; border-top: 1px solid rgba(255,255,255,.1); padding: 28px 0; }
        .landing-footer-bottom p { margin: 0; color: #8493ab; font-size: 13px; }
        .landing-footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 24px; }
        .landing-footer-links a { color: #9dacc0; font-size: 13px; font-weight: 700; text-decoration: none; }
        .landing-footer-links a:hover { color: #d7d0bb; }
        [data-reveal] { opacity: 0; filter: blur(5px); transform: translate3d(0, 34px, 0); transition: opacity .78s cubic-bezier(.2,.8,.2,1), filter .78s cubic-bezier(.2,.8,.2,1), transform .78s cubic-bezier(.2,.8,.2,1); }
        [data-reveal] > * { opacity: 0; transform: translate3d(0, 16px, 0); transition: opacity .72s cubic-bezier(.2,.8,.2,1), transform .72s cubic-bezier(.2,.8,.2,1); }
        [data-reveal].is-visible { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
        [data-reveal].is-visible > * { opacity: 1; transform: translate3d(0, 0, 0); }
        [data-reveal].is-visible > :nth-child(2) { transition-delay: .12s; }
        [data-reveal].is-visible > :nth-child(3) { transition-delay: .2s; }
        .landing-quality-item { opacity: 0; transform: translate3d(0, 12px, 0); transition: opacity .62s cubic-bezier(.2,.8,.2,1), transform .62s cubic-bezier(.2,.8,.2,1); }
        [data-reveal].is-visible .landing-quality-item { opacity: 1; transform: translate3d(0, 0, 0); }
        [data-reveal].is-visible .landing-quality-item:nth-child(1) { transition-delay: .16s; }
        [data-reveal].is-visible .landing-quality-item:nth-child(2) { transition-delay: .25s; }
        [data-reveal].is-visible .landing-quality-item:nth-child(3) { transition-delay: .34s; }
        [data-reveal].is-visible .landing-steps .landing-step { opacity: 1; transform: translate3d(0, 0, 0); }
        .landing-steps .landing-step { opacity: 0; transform: translate3d(0, 18px, 0); transition: opacity .68s cubic-bezier(.2,.8,.2,1), transform .68s cubic-bezier(.2,.8,.2,1), box-shadow .28s ease, border-color .28s ease; }
        [data-reveal].is-visible .landing-steps .landing-step:nth-child(1) { transition-delay: .14s; }
        [data-reveal].is-visible .landing-steps .landing-step:nth-child(2) { transition-delay: .23s; }
        [data-reveal].is-visible .landing-steps .landing-step:nth-child(3) { transition-delay: .32s; }
        @media (hover: hover) { .landing-step:hover { border-color: #c4d4d6; box-shadow: 0 18px 36px rgba(21,45,48,.09); transform: translate3d(0, -4px, 0) !important; } }
        @keyframes landing-enter-soft { from { opacity: 0; transform: translate3d(0, 18px, 0); filter: blur(5px); } to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); } }
        @keyframes landing-access-in { from { opacity: 0; transform: translate3d(28px, 0, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
        @keyframes landing-transition-breathe { from { transform: translate3d(-3%, -1%, 0) scale(1); opacity: .42; } to { transform: translate3d(3%, 1%, 0) scale(1.06); opacity: .9; } }
        @keyframes landing-aurora { from { transform: translate3d(-1.5%, -1%, 0) scale(1); } to { transform: translate3d(1.5%, 1%, 0) scale(1.06); } }
        @keyframes landing-mark-breathe { 0%, 100% { transform: translate(-50%, -50%) rotate(-4deg) scale(1); filter: sepia(.12) saturate(.84) brightness(1.05) drop-shadow(0 14px 32px rgba(203,141,88,.16)) drop-shadow(0 0 58px rgba(247,232,199,.055)); opacity: .69; } 50% { transform: translate(-50%, -50%) rotate(-4deg) scale(1.025); filter: sepia(.19) saturate(.98) brightness(1.16) drop-shadow(0 18px 38px rgba(209,147,91,.24)) drop-shadow(0 0 76px rgba(248,229,191,.11)); opacity: .84; } }
        @keyframes landing-sprout-draw { to { stroke-dashoffset: 0; } }
        @keyframes landing-sprout-breathe { 0%, 100% { opacity: .7; transform: scale(.94); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes landing-sprout-sway { 0%, 100% { transform: rotate(-2deg) scale(1); } 50% { transform: rotate(3deg) scale(1.03); } }
        @keyframes landing-sprout-sway-reverse { 0%, 100% { transform: rotate(2deg) scale(1); } 50% { transform: rotate(-3deg) scale(1.03); } }
        @keyframes landing-sprout-vein-left { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(3deg); } }
        @keyframes landing-sprout-vein-right { 0%, 100% { transform: rotate(2deg); } 50% { transform: rotate(-3deg); } }
        @keyframes landing-news-shimmer { from { background-position: 120% 0; } to { background-position: -120% 0; } }
        @media (max-width: 780px) {
          .landing-human-manifesto { padding: 52px 0 65px; }
          .landing-human-manifesto .landing-container { width: min(100% - 40px, 1360px); }
          .landing-manifesto-masthead { grid-template-columns: 1fr; gap: 20px; padding-top: 22px; }
          .landing-manifesto-masthead h2 { margin-top: 13px; font-size: clamp(50px, 15vw, 72px); line-height: .92; }
          .landing-manifesto-deck { margin-top: 20px; font-size: 22px; line-height: 1.28; }
          .landing-manifesto-mark { display: grid; grid-template-columns: 86px minmax(0,1fr); align-items: center; gap: 17px; border-top: 1px solid rgba(34,31,23,.24); border-left: 0; padding: 18px 0 0; }
          .landing-manifesto-mark > div { padding: 0; }
          .landing-manifesto-mark p { margin-top: 9px; }
          .landing-manifesto-sprout { width: 86px; }
          .landing-manifesto-spread { grid-template-columns: 1fr; gap: 30px; margin-top: 36px; }
          .landing-manifesto-art { height: 340px; }
          .landing-manifesto-art img { transform: scale(1.35) translateY(-10%); }
          .landing-manifesto-art figcaption { right: 25px; bottom: 25px; left: 25px; gap: 13px; }
          .landing-manifesto-art figcaption span { padding-right: 12px; }
          .landing-manifesto-art figcaption strong { font-size: 25px; }
          .landing-manifesto-copy { font-size: 15px; line-height: 1.84; padding: 0; }
          .landing-manifesto-copy p + p { margin-top: 21px; }
          .landing-manifesto-lede { font-size: 17px; }
          .landing-manifesto-principle { font-size: 27px; margin-top: 35px !important; padding-top: 18px; }
        }
        @media (prefers-reduced-motion: reduce) { *, *:before, *:after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; } }
        @media (max-width: 1180px) { .landing-shell { display: grid; height: auto; min-height: 0; overflow: visible; grid-template-columns: 1fr; } .landing-brand, .landing-access { min-height: auto; height: auto; } .landing-brand { width: auto; min-height: 680px; } .landing-access { position: static; width: auto; min-width: 0; overflow: visible; border: 0; border-radius: 0; box-shadow: none; padding-bottom: 68px; } .landing-access-nav { justify-content: space-between; } .landing-access-inner { overflow: visible; padding: 54px 0 12px; } .landing-plum-cycle { top: 13%; right: 7%; width: min(52%, 500px); } .landing-research-ledger { top: 12%; right: 8%; width: min(47%, 450px); } .landing-news-grid { grid-template-columns: 1fr; } .landing-news-card-body h3 { min-height: 0; } .landing-footer-grid { grid-template-columns: 1fr; } .landing-footer-brand { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.1); } }
        @media (max-width: 700px) { .landing-brand { min-height: 625px; padding: 25px 24px 31px; } .landing-brand-kicker { display: none; } .landing-plum-cycle { top: 14%; right: -32px; width: min(84%, 340px); opacity: .52; } .landing-research-ledger { top: 13%; right: -15px; width: min(80%, 350px); opacity: .55; } .landing-brand-content h1 { font-size: 39px; } .landing-brand-content > p { font-size: 14px; line-height: 1.65; } .landing-brand-proof { grid-template-columns: 1fr; gap: 2px; margin-top: 24px; } .landing-brand-proof span { min-height: 0; padding-top: 8px; } .landing-access { padding: 20px 24px 36px; } .landing-access-nav { font-size: 12px; gap: 12px; } .landing-access-inner { padding-top: 40px; } .public-auth-content h2 { font-size: 30px; } .landing-container { width: min(100% - 40px, 1200px); } .landing-news-preview { padding-bottom: 54px; } .landing-news-preview-head { align-items: flex-start; flex-direction: column; } .landing-intro, .landing-quality-grid, .landing-global { grid-template-columns: 1fr; gap: 28px; padding: 78px 0; } .landing-intro > p { font-size: 15px; } .landing-photo-grid { grid-template-columns: 1fr; padding-bottom: 78px; } .landing-photo, .landing-photo.is-short, .landing-photo.is-wide { grid-column: auto; min-height: 315px; } .landing-quality, .landing-panelists { padding: 78px 0; } .landing-global { min-height: 0; } .landing-global-visual { order: 2; min-height: 320px; } .landing-global-copy { order: 1; border-left: 0; border-bottom: 1px solid rgba(34,31,23,.24); padding: 0 0 27px; } .landing-map-frame { min-height: 0; } .landing-map-frame:after { transform: translateY(128px); } .landing-global-globe { width: min(80%, 250px); transform: translate(0, -1%); } .landing-steps { grid-template-columns: 1fr; gap: 12px; margin-top: 38px; } .landing-step { min-height: 0; } .landing-step h3 { margin-top: 25px; } .landing-reward-banner { min-height: 470px; margin-top: 45px; } .landing-reward-copy { padding: 44px 28px; } .landing-footer-brand, .landing-footer-contact { padding: 44px 28px; } .landing-footer-bottom { align-items: flex-start; flex-direction: column; padding: 24px 0; } .landing-footer-links { justify-content: flex-start; } }
      `}</style>

      <section className="landing-shell">
        <section className="landing-brand" aria-labelledby="landing-title">
        <div className="landing-brand-header">
          <Link to="/" aria-label="GuanyiSearch home"><Logo size="md" variant="light" /></Link>
          <span className="landing-brand-kicker">Research participation platform</span>
        </div>
        <ResearchLedgerIllustration />
          <div className="landing-brand-content">
            <h1 id="landing-title">Research participation, made more accountable.</h1>
            <p>GuanyiSearch connects paid research surveys, daily news signals, transparent rewards, and quality-aware operations in one carefully designed platform.</p>
            <div className="landing-brand-proof">
              <span><BadgeCheck size={16} /> Verified entry</span>
              <span><CircleDollarSign size={16} /> Reward visibility</span>
              <span><ShieldCheck size={16} /> Privacy-minded</span>
            </div>
          </div>
        </section>

        <section className="landing-access" aria-label="Account access">
          <nav className="landing-access-nav" aria-label="Public navigation">
            <a href="#human-manifesto">Human Manifesto</a>
            <Link to="/news">News Wall</Link>
            <Link to="/how-it-works">How it works</Link>
            {authMode === 'login' ? <Link className="landing-nav-pill" to={{ pathname: '/register', search: location.search }}>Create account</Link> : <Link className="landing-nav-pill" to={{ pathname: '/login', search: location.search }}>Sign in</Link>}
          </nav>
          <div className="landing-access-inner"><PublicAuthPanel mode={authMode} onModeChange={setMode} /></div>
          <span className="landing-scroll-cue"><ArrowRight size={14} /> Explore the platform below</span>
        </section>
      </section>

      <LandingNewsPreview />

      <div className="landing-tone-transition is-dark-to-paper" aria-hidden="true" />

      <section id="human-manifesto" className="landing-human-manifesto" aria-labelledby="human-manifesto-title">
        <div className="landing-container landing-manifesto-inner">
          <div className="landing-manifesto-masthead">
            <div className="landing-manifesto-heading">
              <p className="landing-manifesto-label">GuanyiSearch / 01</p>
              <h2 id="human-manifesto-title">Human Manifesto</h2>
              <p className="landing-manifesto-deck">We believe that real people will always be the starting point for research.</p>
            </div>
            <div className="landing-manifesto-mark">
              <ManifestoSprout />
              <div>
                <span>REAL PEOPLE<br />REAL INSIGHT</span>
                <p>One real response at a time, a more trustworthy picture can grow.</p>
              </div>
            </div>
          </div>

          <div className="landing-manifesto-spread">
            <figure className="landing-manifesto-art">
              <img src="/human-manifesto/shoreline-painting.jpg" alt="Impressionist shoreline landscape" loading="lazy" decoding="async" />
              <figcaption><span>01</span><strong>Real voices deserve to be heard with care.</strong></figcaption>
            </figure>
            <div className="landing-manifesto-copy">
              <p className="landing-manifesto-lede">This is an era in which AI can generate an endless volume of content that appears real. Opinions are easy to produce; voices are easy to replicate. Yet one thing can never be generated: a particular person, in a particular moment, expressing what they truly think.</p>
              <p>GuanyiSearch refuses to substitute synthetic voices for real ones. Behind every survey result and every submitted opinion is a real person who chose to spend a few minutes sharing a perspective. These voices may be small, but they are irreplaceable. It is the accumulation of such specific, individual voices that forms insight worth trusting.</p>
              <p>We also believe technology is not the opposite of people; it is an extension of people. We use automated matching so your time is spent where it truly matters, transparent real-time data so you can see the impact of your voice, and clear, fair rules so every minute you contribute can lead to a reward that is visible and attainable.</p>
              <p className="landing-manifesto-principle">Human-centered does not mean rejecting technology. It means making technology serve people.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="landing-sections">
        <section className="landing-global-section">
          <div className="landing-container landing-global" data-reveal>
            <div className="landing-global-visual" aria-hidden="true"><div className="landing-map-frame"><GlobalGlobe /></div></div>
            <div className="landing-global-copy"><p className="landing-label">Global perspective</p><h2>Research begins with people, in every context.</h2><p>A global view reminds us that every response comes from a different life, place, and point of view. The platform keeps each participation journey clear and considered from the first step to reward.</p></div>
          </div>
        </section>
      </div>

      <div className="landing-tone-transition is-paper-to-ink" aria-hidden="true" />

      <footer className="landing-footer">
        <div className="landing-footer-grid">
          <div className="landing-footer-brand"><div className="landing-footer-identity"><img className="landing-footer-logo-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" /><Logo size="lg" variant="light" /></div><p>A trusted foundation for research participation, quality-aware operations, and transparent rewards.</p></div>
          <div className="landing-footer-contact">
            <h2>CONTACT &amp; INQUIRIES</h2>
            <p>Questions about panel eligibility, partnerships, or platform operations? Reach our team directly.</p>
            <a className="landing-footer-email" href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>
            <nav className="landing-social-links" aria-label="GuanyiSearch social links">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  className="landing-social-link"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <SocialGlyph id={social.id} />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="landing-container landing-footer-bottom"><p>© 2026 GuanyiSearch. All rights reserved.</p><div className="landing-footer-links"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></div></div>
      </footer>
    </main>
  );
}
