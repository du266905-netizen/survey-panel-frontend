const PAPER = '#F3EDE0';
const INK = '#1F1F1B';
const FOREST = '#123C31';
const MOSS = '#7A8979';
const FADE = '#CFC7B8';
const SERIF = '"Source Han Serif SC", "Noto Serif CJK SC", "Source Serif 4", Georgia, serif';
const SANS = 'Inter, "Noto Sans SC", Arial, sans-serif';

export const MARKETING_ASSET_SIZES = {
  square: { width: 1080, height: 1080, label: 'Square · 1080 × 1080' },
  landscape: { width: 1200, height: 630, label: 'Landscape · 1200 × 630' },
};

export const DEFAULT_MANIFESTO = 'Research begins with people,\nin every context.';

function setFont(ctx, size, { weight = 400, family = SERIF, style = 'normal' } = {}) {
  ctx.font = `${style} ${weight} ${size}px ${family}`;
}

function withAlpha(color, alpha) {
  const value = String(color).replace('#', '');
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function roundedRect(ctx, x, y, width, height, radius = 18) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.arcTo(x + width, y, x + width, y + height, safeRadius);
  ctx.arcTo(x + width, y + height, x, y + height, safeRadius);
  ctx.arcTo(x, y + height, x, y, safeRadius);
  ctx.arcTo(x, y, x + width, y, safeRadius);
  ctx.closePath();
}

function fillRoundedRect(ctx, x, y, width, height, radius, color) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = color;
  ctx.fill();
}

function strokeRoundedRect(ctx, x, y, width, height, radius, color, lineWidth = 1) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function normalizeText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function ellipsis(ctx, text, width) {
  if (ctx.measureText(text).width <= width) return text;
  const token = '…';
  let output = text;
  while (output && ctx.measureText(`${output}${token}`).width > width) output = output.slice(0, -1);
  return `${output}${token}`;
}

function wrapText(ctx, value, width, maxLines = Infinity) {
  const text = normalizeText(value);
  if (!text) return [];
  const words = text.includes(' ') ? text.split(' ') : [...text];
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const candidate = line ? `${line}${text.includes(' ') ? ' ' : ''}${word}` : word;
    if (line && ctx.measureText(candidate).width > width) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const clipped = lines.slice(0, maxLines);
  clipped[maxLines - 1] = ellipsis(ctx, clipped[maxLines - 1], width);
  return clipped;
}

function drawWrapped(ctx, value, x, y, width, { size, lineHeight, maxLines = Infinity, color = INK, align = 'left', weight = 400, family = SERIF } = {}) {
  setFont(ctx, size, { weight, family });
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  const lines = wrapText(ctx, value, width, maxLines);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
  return lines.length * lineHeight;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function paperTexture(ctx, width, height) {
  const random = seededRandom(width * 23 + height * 41);
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, width, height);
  for (let index = 0; index < 900; index += 1) {
    const alpha = random() * 0.035;
    ctx.fillStyle = `rgba(68, 57, 38, ${alpha})`;
    ctx.fillRect(random() * width, random() * height, 1 + random() * 1.5, 1 + random() * 1.5);
  }
  const topGlow = ctx.createLinearGradient(0, 0, width, height);
  topGlow.addColorStop(0, 'rgba(255,255,255,.36)');
  topGlow.addColorStop(0.6, 'rgba(255,255,255,0)');
  topGlow.addColorStop(1, 'rgba(73,58,32,.035)');
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, width, height);
}

function drawBrand(ctx, x, y, { compact = false, inverted = false } = {}) {
  const color = inverted ? PAPER : INK;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 9, y + 9, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = inverted ? FOREST : PAPER;
  ctx.beginPath();
  ctx.arc(x + 7, y + 8, 2.3, 0, Math.PI * 2);
  ctx.arc(x + 11, y + 8, 2.3, 0, Math.PI * 2);
  ctx.fill();
  setFont(ctx, compact ? 17 : 20, { weight: 800, family: SANS });
  ctx.fillStyle = color;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('GUANYISEARCH', x + 27, y + 10);
}

function drawFooter(ctx, width, height, { text = 'GUANYISEARCH · HUMAN-CENTERED INSIGHT', compact = false } = {}) {
  const footerHeight = compact ? 50 : 66;
  const y = height - footerHeight;
  ctx.fillStyle = FOREST;
  ctx.fillRect(0, y, width, footerHeight);
  setFont(ctx, compact ? 11 : 14, { weight: 700, family: SANS });
  ctx.fillStyle = PAPER;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '0.18em';
  ctx.fillText(text, width / 2, y + footerHeight / 2 + 1);
  ctx.letterSpacing = '0px';
}

function formatDate(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return { month: 'NOW', day: '--', year: '' };
  return {
    month: date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
    day: String(date.getUTCDate()).padStart(2, '0'),
    year: String(date.getUTCFullYear()),
  };
}

function drawDateTicket(ctx, x, y, value, { compact = false } = {}) {
  const width = compact ? 72 : 94;
  const height = compact ? 120 : 156;
  const date = formatDate(value);
  fillRoundedRect(ctx, x, y, width, height, 3, withAlpha(PAPER, 0.22));
  strokeRoundedRect(ctx, x, y, width, height, 3, withAlpha(INK, 0.28));
  setFont(ctx, compact ? 13 : 15, { weight: 800, family: SANS });
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(date.month, x + width / 2, y + (compact ? 13 : 16));
  setFont(ctx, compact ? 35 : 44, { weight: 700 });
  ctx.fillText(date.day, x + width / 2, y + (compact ? 36 : 47));
  ctx.strokeStyle = withAlpha(INK, 0.3);
  ctx.beginPath();
  ctx.moveTo(x + 12, y + (compact ? 82 : 102));
  ctx.lineTo(x + width - 12, y + (compact ? 82 : 102));
  ctx.stroke();
  setFont(ctx, compact ? 12 : 14, { weight: 700, family: SANS });
  ctx.fillText(date.year, x + width / 2, y + (compact ? 91 : 114));
}

function drawProgress(ctx, x, y, width, value, { height = 15, color = FOREST } = {}) {
  fillRoundedRect(ctx, x, y, width, height, height / 2, withAlpha(INK, 0.11));
  fillRoundedRect(ctx, x, y, Math.max(0, Math.min(width, width * Number(value || 0) / 100)), height, height / 2, color);
}

function drawTopicRow(ctx, topic, index, x, y, width, { compact = false } = {}) {
  const rowHeight = compact ? 92 : 126;
  fillRoundedRect(ctx, x, y, width, rowHeight, compact ? 10 : 14, withAlpha('#FFFFFF', 0.25));
  strokeRoundedRect(ctx, x, y, width, rowHeight, compact ? 10 : 14, withAlpha(INK, 0.25));
  const badgeSize = compact ? 52 : 66;
  fillRoundedRect(ctx, x + 16, y + (rowHeight - badgeSize) / 2, badgeSize, badgeSize, 5, FOREST);
  setFont(ctx, compact ? 22 : 29, { weight: 600 });
  ctx.fillStyle = PAPER;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(index + 1).padStart(2, '0'), x + 16 + badgeSize / 2, y + rowHeight / 2 + 1);
  const copyX = x + badgeSize + 42;
  const percentX = x + width - (compact ? 48 : 68);
  drawWrapped(ctx, topic.title, copyX, y + (compact ? 17 : 20), percentX - copyX - 18, {
    size: compact ? 17 : 21,
    lineHeight: compact ? 20 : 25,
    maxLines: 2,
    weight: 650,
  });
  const percent = Number(topic.approvePercent || 0);
  drawProgress(ctx, copyX, y + rowHeight - (compact ? 26 : 31), percentX - copyX - 18, percent, { height: compact ? 8 : 11 });
  setFont(ctx, compact ? 20 : 27, { weight: 700 });
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${percent}%`, percentX + (compact ? 2 : 4), y + rowHeight / 2 + (compact ? 16 : 20));
  return rowHeight;
}

function drawGlobe(ctx, centerX, centerY, radius) {
  ctx.save();
  ctx.strokeStyle = withAlpha(INK, 0.28);
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  for (let index = -2; index <= 2; index += 1) {
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, Math.max(radius * 0.15, radius * (1 - Math.abs(index) * 0.16)), radius, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radius, Math.max(radius * 0.15, radius * (1 - Math.abs(index) * 0.16)), 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  const random = seededRandom(Math.round(centerX + centerY + radius));
  ctx.fillStyle = withAlpha(FOREST, 0.28);
  for (let index = 0; index < Math.round(radius * 3.2); index += 1) {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random()) * radius * 0.88;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    ctx.beginPath();
    ctx.arc(x, y, 1 + random() * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPlum(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.strokeStyle = withAlpha(INK, 0.68);
  ctx.lineWidth = 5 * scale;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 40 * scale, y - 85 * scale, x + 42 * scale, y - 142 * scale, x + 80 * scale, y - 214 * scale);
  ctx.stroke();
  ctx.lineWidth = 2.8 * scale;
  [[-14, -62, -72, -104], [27, -103, 94, -142], [49, -148, 14, -194], [69, -177, 139, -212]].forEach(([startX, startY, endX, endY]) => {
    ctx.beginPath();
    ctx.moveTo(x + startX * scale, y + startY * scale);
    ctx.quadraticCurveTo(x + (startX + endX) / 2 * scale, y + (startY + endY + 18) / 2 * scale, x + endX * scale, y + endY * scale);
    ctx.stroke();
  });
  const blossoms = [[-62, -105], [95, -142], [12, -193], [140, -213], [46, -149], [71, -177], [-6, -64]];
  blossoms.forEach(([offsetX, offsetY], index) => {
    ctx.fillStyle = index % 2 ? withAlpha(MOSS, 0.62) : withAlpha(FOREST, 0.68);
    for (let petal = 0; petal < 5; petal += 1) {
      const angle = (Math.PI * 2 * petal) / 5;
      ctx.beginPath();
      ctx.ellipse(x + offsetX * scale + Math.cos(angle) * 5 * scale, y + offsetY * scale + Math.sin(angle) * 5 * scale, 5 * scale, 3.2 * scale, angle, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  ctx.restore();
}

function drawDailyBrief(ctx, data, width, height) {
  const compact = height < 800;
  const pad = compact ? 58 : 76;
  drawBrand(ctx, pad, compact ? 43 : 55, { compact });
  setFont(ctx, compact ? 57 : 86, { weight: 650 });
  ctx.fillStyle = FOREST;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('TODAY’S', pad, compact ? 100 : 142);
  ctx.fillText('TOP TALK', pad, compact ? 161 : 230);
  setFont(ctx, compact ? 15 : 19, { weight: 800, family: SANS });
  ctx.fillStyle = INK;
  ctx.letterSpacing = '0.17em';
  ctx.fillText('DAILY BRIEF', pad + 3, compact ? 235 : 329);
  ctx.letterSpacing = '0px';
  setFont(ctx, compact ? 15 : 20, { weight: 500 });
  ctx.fillText('Real voices. Real issues. Real impact.', pad, compact ? 264 : 361);
  drawDateTicket(ctx, width - pad - (compact ? 72 : 94), compact ? 45 : 62, data.briefDate, { compact });
  const rowWidth = compact ? Math.min(670, width - pad * 2) : width - pad * 2;
  const rowsX = compact ? width - pad - rowWidth : pad;
  const firstY = compact ? 101 : 430;
  const rowGap = compact ? 12 : 17;
  data.topics.forEach((topic, index) => {
    drawTopicRow(ctx, topic, index, rowsX, firstY + index * ((compact ? 92 : 126) + rowGap), rowWidth, { compact });
  });
  if (!compact) {
    drawGlobe(ctx, 14, height - 90, 116);
    setFont(ctx, 13, { weight: 700, family: SANS });
    ctx.fillStyle = withAlpha(INK, 0.78);
    ctx.textAlign = 'right';
    ctx.fillText('DATA FROM GUANYISEARCH COMMUNITY POLL', width - pad, height - 96);
  }
  drawFooter(ctx, width, height, { text: 'DATA FROM GUANYISEARCH COMMUNITY POLL', compact });
}

function drawLeaderboardSection(ctx, title, subtitle, entries, x, y, width, kind, compact) {
  const iconSize = compact ? 30 : 37;
  ctx.fillStyle = FOREST;
  ctx.beginPath();
  ctx.arc(x + iconSize / 2, y + iconSize / 2, iconSize / 2, 0, Math.PI * 2);
  ctx.fill();
  setFont(ctx, compact ? 14 : 16, { weight: 800, family: SANS });
  ctx.fillStyle = PAPER;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(kind === 'coins' ? '★' : '✓', x + iconSize / 2, y + iconSize / 2 + 1);
  setFont(ctx, compact ? 16 : 20, { weight: 800, family: SANS });
  ctx.fillStyle = INK;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(title, x + iconSize + 14, y + 1);
  setFont(ctx, compact ? 12 : 14, { weight: 500, family: SANS });
  ctx.fillStyle = withAlpha(INK, 0.72);
  ctx.fillText(subtitle, x + iconSize + 14, y + (compact ? 21 : 27));
  const gridY = y + (compact ? 54 : 70);
  const columnWidth = width / 3;
  entries.forEach((entry, index) => {
    const midX = x + columnWidth * index + columnWidth / 2;
    const medal = index === 0 ? '#C6922D' : index === 1 ? '#969795' : '#96623C';
    setFont(ctx, compact ? 27 : 33, { weight: 800, family: SANS });
    ctx.fillStyle = medal;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`${index + 1}`, midX, gridY);
    setFont(ctx, compact ? 13 : 15, { weight: 800, family: SANS });
    ctx.fillStyle = INK;
    ctx.fillText(entry.label, midX, gridY + (compact ? 34 : 43));
    setFont(ctx, compact ? 13 : 15, { weight: 600, family: SANS });
    ctx.fillStyle = withAlpha(INK, 0.82);
    ctx.fillText(kind === 'coins' ? `${entry.coins.toLocaleString()} Coins` : `${entry.completed} completed`, midX, gridY + (compact ? 53 : 65));
    if (index < entries.length - 1) {
      ctx.strokeStyle = withAlpha(INK, 0.17);
      ctx.beginPath();
      ctx.moveTo(x + columnWidth * (index + 1), gridY);
      ctx.lineTo(x + columnWidth * (index + 1), gridY + (compact ? 74 : 88));
      ctx.stroke();
    }
  });
}

function drawLeaderboard(ctx, data, width, height) {
  const compact = height < 800;
  const pad = compact ? 55 : 75;
  drawBrand(ctx, pad, compact ? 36 : 52, { compact });
  setFont(ctx, compact ? 52 : 74, { weight: 650 });
  ctx.fillStyle = INK;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('WEEKLY HIGHLIGHTS', pad, compact ? 83 : 126);
  setFont(ctx, compact ? 18 : 24, { weight: 500 });
  ctx.fillText('Real participation. Real rewards.', pad, compact ? 149 : 214);
  ctx.strokeStyle = withAlpha(INK, 0.28);
  ctx.beginPath();
  ctx.moveTo(pad, compact ? 185 : 265);
  ctx.lineTo(width - pad, compact ? 185 : 265);
  ctx.stroke();
  const sectionWidth = width - pad * 2;
  drawLeaderboardSection(ctx, 'TOP 3 REFERRERS', 'Coins earned through referrals this week.', data.referrers, pad, compact ? 204 : 296, sectionWidth, 'coins', compact);
  ctx.strokeStyle = withAlpha(INK, 0.25);
  ctx.beginPath();
  ctx.moveTo(pad, compact ? 349 : 495);
  ctx.lineTo(width - pad, compact ? 349 : 495);
  ctx.stroke();
  drawLeaderboardSection(ctx, 'TOP 3 SURVEY COMPLETERS', 'Most completed surveys this week.', data.completers, pad, compact ? 367 : 530, sectionWidth, 'completed', compact);
  drawFooter(ctx, width, height, { text: 'WEEKLY COMMUNITY RECOGNITION · PRIVACY-SAFE MEMBER LABELS', compact });
}

function drawManifesto(ctx, data, width, height, manifesto) {
  const compact = height < 800;
  const pad = compact ? 62 : 82;
  drawBrand(ctx, pad, compact ? 47 : 61, { compact });
  const quote = manifesto || DEFAULT_MANIFESTO;
  const quoteX = pad + (compact ? 45 : 55);
  const quoteY = compact ? 146 : 250;
  setFont(ctx, compact ? 72 : 84, { weight: 650 });
  ctx.fillStyle = withAlpha(MOSS, 0.56);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('“', pad, quoteY - 12);
  drawWrapped(ctx, quote, quoteX, quoteY, compact ? width * 0.53 : width * 0.52, {
    size: compact ? 48 : 62,
    lineHeight: compact ? 54 : 69,
    maxLines: compact ? 3 : 4,
    weight: 650,
  });
  setFont(ctx, compact ? 72 : 84, { weight: 650 });
  ctx.fillStyle = withAlpha(MOSS, 0.56);
  ctx.fillText('”', quoteX + (compact ? width * 0.47 : width * 0.49), quoteY + (compact ? 102 : 140));
  ctx.strokeStyle = MOSS;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(quoteX, compact ? 350 : 599);
  ctx.lineTo(quoteX + 70, compact ? 350 : 599);
  ctx.stroke();
  drawWrapped(ctx, 'Behind every data point is a real person who chose to share a perspective.', quoteX, compact ? 370 : 630, compact ? width * 0.43 : width * 0.39, {
    size: compact ? 16 : 20,
    lineHeight: compact ? 23 : 28,
    maxLines: 3,
    family: SANS,
    weight: 500,
  });
  if (compact) drawPlum(ctx, width - 160, 410, 1.05);
  else drawGlobe(ctx, width - 65, height - 156, 330);
  drawFooter(ctx, width, height, { text: 'HUMAN-CENTERED   ·   INSIGHT-DRIVEN   ·   IMPACT-FOCUSED', compact });
}

function drawOpportunity(ctx, data, width, height) {
  const compact = height < 800;
  const pad = compact ? 62 : 85;
  drawBrand(ctx, pad, compact ? 44 : 60, { compact });
  setFont(ctx, compact ? 18 : 20, { weight: 800, family: SANS });
  ctx.fillStyle = FOREST;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.16em';
  ctx.fillText('NEW OPPORTUNITIES', pad, compact ? 109 : 156);
  ctx.letterSpacing = '0px';
  drawWrapped(ctx, 'More ways to make your voice count.', pad, compact ? 143 : 205, compact ? width * 0.54 : width * 0.56, {
    size: compact ? 48 : 75,
    lineHeight: compact ? 53 : 80,
    maxLines: 3,
    weight: 650,
    color: INK,
  });
  const cardX = compact ? width * 0.65 : pad;
  const cardY = compact ? 125 : 518;
  const cardWidth = compact ? 400 : width - pad * 2;
  const cardHeight = compact ? 248 : 250;
  fillRoundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 16, withAlpha('#FFFFFF', 0.3));
  strokeRoundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 16, withAlpha(INK, 0.25));
  setFont(ctx, compact ? 54 : 70, { weight: 650 });
  ctx.fillStyle = FOREST;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(String(data.activeSurveyCount), cardX + cardWidth * 0.29, cardY + (compact ? 45 : 52));
  ctx.fillText(String(data.newPartnerCount), cardX + cardWidth * 0.71, cardY + (compact ? 45 : 52));
  setFont(ctx, compact ? 12 : 15, { weight: 800, family: SANS });
  ctx.fillStyle = INK;
  ctx.fillText('ACTIVE SURVEY', cardX + cardWidth * 0.29, cardY + (compact ? 112 : 132));
  ctx.fillText('NEW CHANNELS', cardX + cardWidth * 0.71, cardY + (compact ? 112 : 132));
  setFont(ctx, compact ? 15 : 18, { weight: 500 });
  ctx.fillStyle = withAlpha(INK, 0.75);
  ctx.fillText('New survey opportunities are now open.', cardX + cardWidth / 2, cardY + (compact ? 165 : 185));
  drawPlum(ctx, compact ? width * 0.49 : width - 125, compact ? 420 : 500, compact ? 0.8 : 1.1);
  drawFooter(ctx, width, height, { text: 'MORE SURVEY OPPORTUNITIES · MORE PERSPECTIVES', compact });
}

function drawMilestone(ctx, data, width, height) {
  const compact = height < 800;
  const pad = compact ? 65 : 85;
  const milestone = data.milestone;
  drawBrand(ctx, pad, compact ? 43 : 60, { compact });
  setFont(ctx, compact ? 17 : 19, { weight: 800, family: SANS });
  ctx.fillStyle = FOREST;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.18em';
  ctx.fillText('A COMMUNITY MILESTONE', pad, compact ? 106 : 154);
  ctx.letterSpacing = '0px';
  setFont(ctx, compact ? 100 : 160, { weight: 650 });
  ctx.fillStyle = INK;
  ctx.fillText(milestone.value.toLocaleString(), pad, compact ? 145 : 214);
  drawWrapped(ctx, milestone.label, pad, compact ? 270 : 405, compact ? width * 0.48 : width * 0.52, {
    size: compact ? 35 : 52,
    lineHeight: compact ? 42 : 60,
    maxLines: 2,
    weight: 650,
  });
  setFont(ctx, compact ? 17 : 22, { weight: 500 });
  ctx.fillStyle = withAlpha(INK, 0.76);
  ctx.fillText('Thank you for making research more human.', pad, compact ? 365 : 545);
  drawGlobe(ctx, compact ? width - 170 : width - 115, compact ? 300 : 500, compact ? 190 : 310);
  drawFooter(ctx, width, height, { text: 'EVERY VOICE MAKES THE COMMUNITY STRONGER', compact });
}

function drawRedemption(ctx, data, width, height) {
  const compact = height < 800;
  const pad = compact ? 65 : 85;
  drawBrand(ctx, pad, compact ? 44 : 60, { compact });
  setFont(ctx, compact ? 18 : 20, { weight: 800, family: SANS });
  ctx.fillStyle = FOREST;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.16em';
  ctx.fillText('REWARD MOMENT', pad, compact ? 110 : 156);
  ctx.letterSpacing = '0px';
  drawWrapped(ctx, 'A little thank-you for sharing your perspective.', pad, compact ? 146 : 214, compact ? width * 0.5 : width * 0.52, {
    size: compact ? 47 : 76,
    lineHeight: compact ? 54 : 84,
    maxLines: 3,
    weight: 650,
  });
  const giftX = compact ? width * 0.69 : width * 0.62;
  const giftY = compact ? 125 : 260;
  const giftWidth = compact ? 265 : 300;
  const giftHeight = compact ? 190 : 230;
  fillRoundedRect(ctx, giftX, giftY, giftWidth, giftHeight, 14, FOREST);
  ctx.fillStyle = PAPER;
  ctx.fillRect(giftX + giftWidth / 2 - 13, giftY, 26, giftHeight);
  ctx.fillRect(giftX, giftY + giftHeight * 0.42, giftWidth, 24);
  ctx.strokeStyle = PAPER;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(giftX + giftWidth / 2 - 27, giftY - 2, 30, Math.PI * 0.16, Math.PI * 1.8);
  ctx.arc(giftX + giftWidth / 2 + 27, giftY - 2, 30, Math.PI * 1.2, Math.PI * 2.84);
  ctx.stroke();
  drawFooter(ctx, width, height, { text: 'SHARED WITH EXPLICIT MEMBER PERMISSION', compact });
}

function drawFeaturedTopic(ctx, data, width, height) {
  const compact = height < 800;
  const pad = compact ? 65 : 84;
  const { topic } = data;
  drawBrand(ctx, pad, compact ? 44 : 60, { compact });
  setFont(ctx, compact ? 17 : 20, { weight: 800, family: SANS });
  ctx.fillStyle = FOREST;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.17em';
  ctx.fillText('THE CONVERSATION TODAY', pad, compact ? 109 : 155);
  ctx.letterSpacing = '0px';
  drawWrapped(ctx, topic.title, pad, compact ? 148 : 217, compact ? width * 0.56 : width - pad * 2, {
    size: compact ? 43 : 69,
    lineHeight: compact ? 49 : 77,
    maxLines: compact ? 3 : 4,
    weight: 650,
  });
  const panelWidth = compact ? 350 : width - pad * 2;
  const panelX = compact ? width - pad - panelWidth : pad;
  const panelY = compact ? 145 : 618;
  const panelHeight = compact ? 270 : 205;
  fillRoundedRect(ctx, panelX, panelY, panelWidth, panelHeight, 16, withAlpha('#FFFFFF', 0.32));
  strokeRoundedRect(ctx, panelX, panelY, panelWidth, panelHeight, 16, withAlpha(INK, 0.25));
  setFont(ctx, compact ? 75 : 90, { weight: 650 });
  ctx.fillStyle = FOREST;
  ctx.textAlign = compact ? 'center' : 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`${topic.approvePercent}%`, compact ? panelX + panelWidth / 2 : panelX + 42, panelY + (compact ? 34 : 34));
  setFont(ctx, compact ? 13 : 16, { weight: 800, family: SANS });
  ctx.fillStyle = INK;
  ctx.fillText('COMMUNITY SUPPORT', compact ? panelX + panelWidth / 2 : panelX + 46, panelY + (compact ? 116 : 137));
  drawProgress(ctx, compact ? panelX + 42 : panelX + 42, panelY + (compact ? 157 : 77), compact ? panelWidth - 84 : panelWidth - 84, topic.approvePercent, { height: compact ? 11 : 15 });
  setFont(ctx, compact ? 16 : 19, { weight: 600, family: SANS });
  ctx.fillStyle = withAlpha(INK, 0.8);
  ctx.textAlign = compact ? 'center' : 'right';
  ctx.fillText(`${topic.participantCount.toLocaleString()} community participants`, compact ? panelX + panelWidth / 2 : panelX + panelWidth - 42, panelY + (compact ? 207 : 138));
  drawFooter(ctx, width, height, { text: 'LIVE DATA FROM THE GUANYISEARCH COMMUNITY POLL', compact });
}

function drawWeeklyDigest(ctx, data, width, height) {
  const compact = height < 800;
  const pad = compact ? 62 : 76;
  drawBrand(ctx, pad, compact ? 42 : 57, { compact });
  setFont(ctx, compact ? 19 : 22, { weight: 800, family: SANS });
  ctx.fillStyle = FOREST;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.letterSpacing = '0.17em';
  ctx.fillText('WEEKLY DIGEST', pad, compact ? 107 : 155);
  ctx.letterSpacing = '0px';
  setFont(ctx, compact ? 52 : 78, { weight: 650 });
  ctx.fillStyle = INK;
  ctx.fillText('本周最受关注话题', pad, compact ? 138 : 206);
  const listX = compact ? width * 0.46 : pad;
  const listY = compact ? 119 : 327;
  const listWidth = compact ? width - listX - pad : width - pad * 2;
  const itemHeight = compact ? 79 : 112;
  data.topics.forEach((topic, index) => {
    const y = listY + index * (itemHeight + (compact ? 7 : 10));
    ctx.strokeStyle = withAlpha(INK, 0.26);
    ctx.beginPath();
    ctx.moveTo(listX, y + itemHeight);
    ctx.lineTo(listX + listWidth, y + itemHeight);
    ctx.stroke();
    setFont(ctx, compact ? 16 : 19, { weight: 800, family: SANS });
    ctx.fillStyle = FOREST;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(String(index + 1).padStart(2, '0'), listX, y + 12);
    drawWrapped(ctx, topic.title, listX + (compact ? 42 : 54), y + (compact ? 10 : 13), listWidth - (compact ? 136 : 175), {
      size: compact ? 15 : 19,
      lineHeight: compact ? 19 : 23,
      maxLines: 2,
      weight: 650,
    });
    setFont(ctx, compact ? 14 : 18, { weight: 700 });
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(`${topic.approvePercent}%`, listX + listWidth, y + (compact ? 30 : 34));
  });
  if (!compact) drawGlobe(ctx, width - 76, 293, 146);
  drawFooter(ctx, width, height, { text: 'WEEKLY NEWS WALL DIGEST · REAL COMMUNITY POLL DATA', compact });
}

export function renderMarketingAsset(canvas, { templateKey, data = {}, manifesto = DEFAULT_MANIFESTO, format = 'square' }) {
  const size = MARKETING_ASSET_SIZES[format] || MARKETING_ASSET_SIZES.square;
  const ctx = canvas.getContext('2d');
  canvas.width = size.width;
  canvas.height = size.height;
  paperTexture(ctx, size.width, size.height);
  const draw = {
    A: drawDailyBrief,
    B: drawLeaderboard,
    C: (context, assetData, width, height) => drawManifesto(context, assetData, width, height, manifesto),
    D: drawOpportunity,
    E: drawMilestone,
    F: drawRedemption,
    G: drawFeaturedTopic,
    H: drawWeeklyDigest,
  }[templateKey];
  if (!draw) throw new Error(`Unknown marketing template: ${templateKey}`);
  draw(ctx, data, size.width, size.height);
  return canvas;
}

export async function downloadMarketingAsset(options) {
  const canvas = document.createElement('canvas');
  renderMarketingAsset(canvas, options);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Unable to create the PNG export.');
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  anchor.href = url;
  anchor.download = `guanyisearch-template-${String(options.templateKey).toLowerCase()}-${options.format}-${date}.png`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
