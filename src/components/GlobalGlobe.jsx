import { useEffect, useRef } from 'react';
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import landTopology from 'world-atlas/land-110m.json';
import countriesTopology from 'world-atlas/countries-110m.json';

const sphere = { type: 'Sphere' };
const land = feature(landTopology, landTopology.objects.land);
const countryBorders = mesh(countriesTopology, countriesTopology.objects.countries, (left, right) => left !== right);
const graticule = geoGraticule10();
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

export default function GlobalGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let size = 0;
    let pixelRatio = 1;
    let frameId;
    let lastFrame = 0;
    let lastDraw = 0;
    let isVisible = true;
    let isDragging = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dragStart = { x: 0, y: 0, rotation: [-18, -19] };
    let rotation = [-18, -19];

    const draw = () => {
      if (!size) return;
      const center = size / 2;
      const radius = size * 0.462;
      const projection = geoOrthographic()
        .translate([center, center])
        .scale(radius)
        .clipAngle(90.1)
        .precision(0.25)
        .rotate(rotation);
      const path = geoPath(projection, context);

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, size, size);

      const atmosphere = context.createRadialGradient(center, center, radius * 0.74, center, center, radius * 1.095);
      atmosphere.addColorStop(0, 'rgba(18, 135, 147, 0)');
      atmosphere.addColorStop(0.78, 'rgba(25, 166, 177, 0.015)');
      atmosphere.addColorStop(1, 'rgba(115, 236, 239, 0.13)');
      context.save();
      context.beginPath();
      context.arc(center, center, radius * 1.075, 0, Math.PI * 2);
      context.clip();
      context.fillStyle = atmosphere;
      context.fillRect(0, 0, size, size);
      context.restore();

      context.save();
      context.beginPath();
      path(sphere);
      context.clip();

      const ocean = context.createRadialGradient(
        center - radius * 0.34,
        center - radius * 0.42,
        radius * 0.08,
        center,
        center,
        radius * 1.2,
      );
      ocean.addColorStop(0, '#23505a');
      ocean.addColorStop(0.34, '#123940');
      ocean.addColorStop(0.73, '#08232a');
      ocean.addColorStop(1, '#041015');
      context.fillStyle = ocean;
      context.fillRect(0, 0, size, size);

      context.beginPath();
      path(graticule);
      context.strokeStyle = 'rgba(181, 234, 235, 0.16)';
      context.lineWidth = 0.62;
      context.stroke();

      context.beginPath();
      path(land);
      context.fillStyle = 'rgba(44, 132, 141, 0.9)';
      context.fill();
      context.strokeStyle = 'rgba(193, 242, 243, 0.48)';
      context.lineWidth = 0.72;
      context.stroke();

      context.beginPath();
      path(countryBorders);
      context.strokeStyle = 'rgba(214, 246, 246, 0.16)';
      context.lineWidth = 0.38;
      context.stroke();

      const nightSide = context.createLinearGradient(center - radius, center - radius * 0.1, center + radius, center + radius * 0.18);
      nightSide.addColorStop(0, 'rgba(5, 18, 22, 0)');
      nightSide.addColorStop(0.54, 'rgba(4, 15, 19, 0.015)');
      nightSide.addColorStop(1, 'rgba(2, 9, 12, 0.48)');
      context.fillStyle = nightSide;
      context.fillRect(0, 0, size, size);
      context.restore();

      context.beginPath();
      path(sphere);
      context.strokeStyle = 'rgba(204, 246, 247, 0.36)';
      context.lineWidth = 1.2;
      context.stroke();

      const rim = context.createRadialGradient(center, center, radius * 0.68, center, center, radius * 1.04);
      rim.addColorStop(0, 'rgba(31, 222, 232, 0)');
      rim.addColorStop(0.9, 'rgba(34, 206, 218, 0)');
      rim.addColorStop(1, 'rgba(167, 243, 245, 0.21)');
      context.beginPath();
      path(sphere);
      context.fillStyle = rim;
      context.fill();
    };

    const render = (timestamp) => {
      if (!isVisible) {
        frameId = undefined;
        return;
      }
      const elapsed = Math.min(timestamp - lastFrame || 16, 40);
      lastFrame = timestamp;
      if (!prefersReducedMotion && !isDragging && timestamp - lastDraw >= 33) {
        rotation[0] += elapsed * 0.0018;
        draw();
        lastDraw = timestamp;
      }
      frameId = window.requestAnimationFrame(render);
    };

    const scheduleDraw = () => {
      window.requestAnimationFrame(() => {
        draw();
        lastDraw = performance.now();
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = Math.max(280, Math.round(Math.min(rect.width, rect.height || rect.width)));
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * pixelRatio);
      canvas.height = Math.round(size * pixelRatio);
      scheduleDraw();
    };

    const pointerDown = (event) => {
      isDragging = true;
      dragStart = { x: event.clientX, y: event.clientY, rotation: [...rotation] };
      canvas.setPointerCapture?.(event.pointerId);
    };

    const pointerMove = (event) => {
      if (!isDragging) return;
      rotation = [
        dragStart.rotation[0] + (event.clientX - dragStart.x) * 0.34,
        clamp(dragStart.rotation[1] - (event.clientY - dragStart.y) * 0.2, -52, 52),
      ];
      scheduleDraw();
    };

    const pointerUp = (event) => {
      isDragging = false;
      canvas.releasePointerCapture?.(event.pointerId);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !frameId) {
        lastFrame = 0;
        frameId = window.requestAnimationFrame(render);
      }
      if (!isVisible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = undefined;
      }
    }, { threshold: 0.12 });
    visibilityObserver.observe(canvas);
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerUp);
    resize();
    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
    };
  }, []);

  return (
    <div className="landing-global-globe">
      <canvas ref={canvasRef} className="landing-global-globe-canvas" aria-label="Interactive globe with continents" />
    </div>
  );
}
