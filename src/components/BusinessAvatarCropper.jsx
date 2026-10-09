import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

/**
 * Crop a chosen picture to a square before it becomes the avatar.
 *
 * Modelled on the cropper GitHub shows: the picture sits in a stage, a square
 * with four corner handles is dragged over it, and a round mask previews how the
 * square will read once it is drawn as a circle. Everything is in stage pixels
 * while dragging; `onConfirm` converts to natural image pixels so the caller can
 * crop the full-resolution source rather than the shrunken preview.
 *
 * Pointer events rather than mouse events, so the same handlers work for touch
 * and for a stylus without a second code path.
 */

const MIN_BOX = 48; // stage pixels — below this the handles overlap
/** How much of the largest possible square the box starts at. */
const INITIAL_RATIO = 0.78;

/* Wording comes from the language library (publicCopy.workspace.business
   .avatarCrop); these are the fallbacks for a locale that has not been
   translated yet, so the dialog never renders a raw key. */
const FALLBACK_COPY = {
  title: 'Crop a new profile picture',
  hint: 'Drag the box to move it; drag a corner to resize.',
  reset: 'Reset',
  cancel: 'Cancel',
  close: 'Close',
  processing: 'Working…',
  confirm: 'Use this picture',
};

export default function BusinessAvatarCropper({ src, onCancel, onConfirm, busy = false }) {
  const { publicCopy } = useLanguage();
  const text = { ...FALLBACK_COPY, ...(publicCopy?.workspace?.business?.avatarCrop || {}) };
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const dragRef = useRef(null);
  const [imgRect, setImgRect] = useState(null);
  const [box, setBox] = useState(null);

  /** Reset the box to the largest centred square, and record where the picture
   *  actually landed inside the stage (letterboxing included). */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img || !img.naturalWidth) return;
    const s = stage.getBoundingClientRect();
    const i = img.getBoundingClientRect();
    const rect = { left: i.left - s.left, top: i.top - s.top, width: i.width, height: i.height };
    setImgRect(rect);
    // Start inside the picture rather than filling it. At full size a square
    // source leaves the box with nowhere to go, and the tool reads as though it
    // has nothing to do — which is exactly how it was described. 78% leaves
    // room to move and to tighten in both directions from the first frame.
    const max = Math.min(rect.width, rect.height);
    const side = Math.max(MIN_BOX, Math.round(max * INITIAL_RATIO));
    setBox({
      left: rect.left + (rect.width - side) / 2,
      top: rect.top + (rect.height - side) / 2,
      size: side,
    });
  }, []); // INITIAL_RATIO is a module constant
  const resetBox = () => measure();

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measure]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  /** One handler for move and for the four corners; `dir` says which. */
  const startDrag = (event, dir) => {
    if (!box || !imgRect) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = { dir, x: event.clientX, y: event.clientY, box: { ...box } };
    // setPointerCapture throws on a pointerId the browser does not know
    // (synthetic events, and some pen drivers), and losing the capture only
    // costs us drags that leave the element — not worth breaking the drag for.
    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch { /* keep dragging */ }
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || !imgRect) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    const b = drag.box;

    if (drag.dir === 'move') {
      setBox({
        ...b,
        left: Math.min(Math.max(b.left + dx, imgRect.left), imgRect.left + imgRect.width - b.size),
        top: Math.min(Math.max(b.top + dy, imgRect.top), imgRect.top + imgRect.height - b.size),
      });
      return;
    }

    // Resize from a corner: the opposite corner stays put, the box stays square.
    const right = b.left + b.size;
    const bottom = b.top + b.size;
    const west = drag.dir.includes('w');
    const north = drag.dir.includes('n');

    let size;
    let left;
    let top;
    if (west && north) {
      size = Math.max(MIN_BOX, Math.min(b.size - dx, b.size - dy));
      size = Math.min(size, right - imgRect.left, bottom - imgRect.top);
      left = right - size; top = bottom - size;
    } else if (!west && north) {
      size = Math.max(MIN_BOX, Math.min(b.size + dx, b.size - dy));
      size = Math.min(size, imgRect.left + imgRect.width - b.left, bottom - imgRect.top);
      left = b.left; top = bottom - size;
    } else if (west && !north) {
      size = Math.max(MIN_BOX, Math.min(b.size - dx, b.size + dy));
      size = Math.min(size, right - imgRect.left, imgRect.top + imgRect.height - b.top);
      left = right - size; top = b.top;
    } else {
      size = Math.max(MIN_BOX, Math.min(b.size + dx, b.size + dy));
      size = Math.min(size, imgRect.left + imgRect.width - b.left, imgRect.top + imgRect.height - b.top);
      left = b.left; top = b.top;
    }
    setBox({ left, top, size });
  };

  const endDrag = () => { dragRef.current = null; };

  const confirm = () => {
    const img = imgRef.current;
    if (!img || !box || !imgRect || !imgRect.width) return;
    const scale = img.naturalWidth / imgRect.width;
    onConfirm({
      x: (box.left - imgRect.left) * scale,
      y: (box.top - imgRect.top) * scale,
      size: box.size * scale,
    });
  };

  return (
    <div className="business-avatar-crop" role="dialog" aria-modal="true" aria-label={text.title}>
      <button type="button" className="business-avatar-crop-scrim" aria-label={text.cancel} onClick={onCancel} />
      <section className="business-avatar-crop-panel">
        <header>
          <strong>{text.title}</strong>
          <button type="button" onClick={onCancel} aria-label={text.close}><X size={17} /></button>
        </header>

        <p className="business-avatar-crop-hint">{text.hint}</p>
        <div
          className="business-avatar-crop-stage"
          ref={stageRef}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <img ref={imgRef} src={src} alt="" onLoad={measure} draggable="false" />
          {box ? (
            <>
              {/* the round aperture: shows what survives the circular crop */}
              <div
                className="business-avatar-crop-aperture"
                style={{ left: box.left, top: box.top, width: box.size, height: box.size }}
              />
              <div
                className="business-avatar-crop-box"
                style={{ left: box.left, top: box.top, width: box.size, height: box.size }}
                onPointerDown={(e) => startDrag(e, 'move')}
              >
                {['nw', 'ne', 'sw', 'se'].map((dir) => (
                  <span
                    key={dir}
                    className={`business-avatar-crop-handle is-${dir}`}
                    onPointerDown={(e) => startDrag(e, dir)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <footer>
          <button type="button" className="is-quiet" onClick={resetBox} disabled={busy}>{text.reset}</button>
          <span className="business-avatar-crop-spacer" />
          <button type="button" onClick={onCancel} disabled={busy}>{text.cancel}</button>
          <button type="button" className="is-primary" onClick={confirm} disabled={busy || !box}>
            {busy ? text.processing : text.confirm}
          </button>
        </footer>
      </section>
    </div>
  );
}
