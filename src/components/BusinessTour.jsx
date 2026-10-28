import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X } from 'lucide-react';
import { getBusinessTourCopy } from '../constants/businessTourCopy';
import './BusinessTour.css';

/* First-run tour for the research workspace.
 *
 * Nine steps, each anchored to an element that already exists on the page
 * (`data-tour="…"`). It deliberately stays on the overview: a new client
 * should learn where things are before being walked through a real project.
 *
 * The card is portalled to <body> because ancestors with a transform become
 * the containing block for position: fixed (E-33). Anchors are measured with
 * getBoundingClientRect on every step, resize and scroll, so the card follows
 * a sticky rail or a collapsing top bar instead of assuming coordinates.
 */

const STEP_TARGETS = [
  'rail-nav',
  'search',
  'balance',
  'primary',
  'rail-ai',
  'rail-questionnaires',
  'rail-projects',
  'rail-results',
  'rail-account',
];

const GAP = 16;
const EDGE = 16;

const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

/* Pick the side with room. Targets on the left (the rail) open to the right;
   targets near the top open below; everything else prefers below, then above,
   then whichever side has the most space. */
function choosePlacement(box, card, viewport) {
  const space = {
    right: viewport.width - (box.left + box.width) - GAP - EDGE,
    left: box.left - GAP - EDGE,
    bottom: viewport.height - (box.top + box.height) - GAP - EDGE,
    top: box.top - GAP - EDGE,
  };
  const fits = {
    right: space.right >= card.width,
    left: space.left >= card.width,
    bottom: space.bottom >= card.height,
    top: space.top >= card.height,
  };
  const centreX = box.left + box.width / 2;
  const centreY = box.top + box.height / 2;

  let order;
  if (centreX < viewport.width * 0.38) order = ['right', 'bottom', 'top', 'left'];
  else if (centreY < viewport.height * 0.34) order = ['bottom', 'left', 'right', 'top'];
  else order = ['bottom', 'top', 'left', 'right'];

  const side = order.find((candidate) => fits[candidate])
    || Object.entries(space).sort((a, b) => b[1] - a[1])[0][0];

  if (side === 'right' || side === 'left') {
    const top = clamp(centreY - card.height / 2, EDGE, viewport.height - card.height - EDGE);
    return {
      side,
      left: side === 'right' ? box.left + box.width + GAP : box.left - GAP - card.width,
      top,
      arrowY: clamp(centreY - top, 22, card.height - 22),
    };
  }

  const left = clamp(centreX - card.width / 2, EDGE, viewport.width - card.width - EDGE);
  return {
    side,
    left,
    top: side === 'bottom' ? box.top + box.height + GAP : box.top - GAP - card.height,
    arrowX: clamp(centreX - left, 22, card.width - 22),
  };
}

export default function BusinessTour({ open, language, onClose, onFinish }) {
  const copy = getBusinessTourCopy(language);
  const steps = copy.steps;
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState(null);
  const [position, setPosition] = useState(null);
  const cardRef = useRef(null);

  const targetId = STEP_TARGETS[index] || STEP_TARGETS[0];
  const isLast = index === steps.length - 1;

  /* Reset to the first step whenever the tour is opened. Position and box are
     cleared too, otherwise a replay would paint the previous step's card at its
     old coordinates for one frame. */
  useEffect(() => {
    if (!open) return;
    setIndex(0);
    setPosition(null);
    setBox(null);
  }, [open]);

  const measure = useCallback(() => {
    if (!open) return;
    const node = document.querySelector(`[data-tour="${targetId}"]`);
    if (!node) { setBox(null); return; }
    const rect = node.getBoundingClientRect();
    setBox(rect.width > 0 && rect.height > 0
      ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
      : null);
  }, [open, targetId]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = requestAnimationFrame(measure);
    const handle = () => measure();
    window.addEventListener('resize', handle);
    window.addEventListener('scroll', handle, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handle);
      window.removeEventListener('scroll', handle, true);
    };
  }, [open, measure, index]);

  /* Place the card. Compact viewports get a bottom sheet — the anchors are
     mostly behind the fold there, and a floating card would have nowhere to
     sit. */
  useLayoutEffect(() => {
    if (!open) return;
    if (window.innerWidth <= 720) { setPosition({ side: 'sheet' }); return; }
    const card = cardRef.current;
    if (!card) return;
    if (!box) { setPosition({ side: 'center' }); return; }
    const cardSize = { width: card.offsetWidth, height: card.offsetHeight };
    setPosition(choosePlacement(box, cardSize, { width: window.innerWidth, height: window.innerHeight }));
  }, [open, box, index]);

  /* Lock the page and start from the top, so every anchor is on screen. */
  useEffect(() => {
    if (!open) return undefined;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    window.scrollTo(0, 0);
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  const goNext = useCallback(() => {
    if (isLast) { onFinish?.(); return; }
    setIndex((current) => Math.min(current + 1, steps.length - 1));
  }, [isLast, onFinish, steps.length]);

  const goBack = useCallback(() => {
    setIndex((current) => Math.max(current - 1, 0));
  }, []);

  /* Keyboard: Esc closes, arrows move, Tab stays inside the card. */
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose?.(); return; }
      if (event.key === 'ArrowRight') { event.preventDefault(); goNext(); return; }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goBack(); return; }
      if (event.key !== 'Tab') return;
      const card = cardRef.current;
      if (!card) return;
      const focusable = card.querySelectorAll('button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, goNext, goBack, onClose]);

  /* Focus the card on open and after each step, so the new text is announced
     rather than silently replacing the old one. */
  useEffect(() => {
    if (!open) return undefined;
    const frame = requestAnimationFrame(() => cardRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open, index]);

  if (!open) return null;

  const step = steps[index] || steps[0];
  const showSpotlight = position && position.side !== 'sheet' && position.side !== 'center' && box;
  const progress = copy.progress.replace('{current}', String(index + 1)).replace('{total}', String(steps.length));

  return createPortal(
    <div className="business-tour" role="presentation">
      <div
        className="business-tour-blocker"
        aria-hidden="true"
        style={{ background: showSpotlight ? 'transparent' : 'rgba(19, 42, 30, .5)' }}
      />

      {showSpotlight && (
        <div
          className="business-tour-spotlight"
          aria-hidden="true"
          style={{
            top: `${box.top - 8}px`,
            left: `${box.left - 8}px`,
            width: `${box.width + 16}px`,
            height: `${box.height + 16}px`,
          }}
        />
      )}

      <section
        ref={cardRef}
        className={`business-tour-card${position ? ' is-ready' : ''}${position?.side === 'center' ? ' is-center' : ''}`}
        data-side={position?.side || 'center'}
        role="dialog"
        aria-modal="true"
        aria-labelledby="business-tour-title"
        tabIndex={-1}
        style={position && position.side !== 'sheet' && position.side !== 'center'
          ? { left: `${position.left}px`, top: `${position.top}px` }
          : undefined}
      >
        {position && position.side !== 'sheet' && position.side !== 'center' && (
          <span
            className="business-tour-arrow"
            aria-hidden="true"
            style={{
              '--tour-arrow-x': position.arrowX ? `${position.arrowX}px` : '50%',
              '--tour-arrow-y': position.arrowY ? `${position.arrowY}px` : '50%',
            }}
          />
        )}

        <button className="business-tour-close" type="button" onClick={() => onClose?.()} aria-label={copy.close}>
          <X size={17} />
        </button>

        <p className="business-tour-kicker">{copy.eyebrow}</p>
        <h2 id="business-tour-title">{step.title}</h2>
        <p className="business-tour-body">{step.body}</p>

        <footer className="business-tour-footer">
          <span className="business-tour-count" aria-live="polite">{progress}</span>
          <button className="business-tour-next" type="button" onClick={goNext}>
            {isLast ? copy.finish : copy.next}
            <ArrowRight size={16} />
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
