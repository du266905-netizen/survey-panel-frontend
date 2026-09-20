import { useEffect, useRef } from 'react';
import { geoGraticule, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import landTopology from 'world-atlas/land-110m.json';

const sphere = { type: 'Sphere' };
const land = feature(landTopology, landTopology.objects.land);
const graticule = geoGraticule().step([20, 20]);
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
const autoRotationDegreesPerSecond = 5.5;
const regionalMarkers = [
  { id: 'china-mainland', coordinates: [116.4, 39.9] },
  { id: 'macau', coordinates: [113.5, 22.2] },
  { id: 'hong-kong', coordinates: [114.2, 22.3] },
  { id: 'thailand', coordinates: [100.5, 13.7] },
  { id: 'malaysia', coordinates: [101.7, 3.1] },
  { id: 'singapore', coordinates: [103.8, 1.35] },
  { id: 'philippines', coordinates: [121, 14.6] },
  { id: 'japan', coordinates: [139.7, 35.7] },
  { id: 'south-korea', coordinates: [127, 37.5] },
  { id: 'indonesia', coordinates: [106.8, -6.2] },
  { id: 'vietnam', coordinates: [106.7, 10.8] },
  { id: 'saudi-arabia', coordinates: [46.7, 24.7] },
  { id: 'united-arab-emirates', coordinates: [55.3, 25.2] },
  { id: 'qatar', coordinates: [51.5, 25.3] },
  { id: 'egypt', coordinates: [31.2, 30] },
  { id: 'united-kingdom', coordinates: [-0.1, 51.5] },
  { id: 'germany', coordinates: [13.4, 52.5] },
  { id: 'france', coordinates: [2.35, 48.85] },
  { id: 'united-states', coordinates: [-74, 40.7] },
];
const markersById = new Map(regionalMarkers.map((marker) => [marker.id, marker]));
const regionalConnections = [
  ['china-mainland', 'macau'], ['china-mainland', 'hong-kong'], ['china-mainland', 'japan'], ['china-mainland', 'south-korea'],
  ['china-mainland', 'vietnam'], ['china-mainland', 'thailand'], ['china-mainland', 'philippines'], ['china-mainland', 'malaysia'],
  ['malaysia', 'singapore'], ['malaysia', 'indonesia'], ['thailand', 'vietnam'], ['vietnam', 'philippines'],
  ['china-mainland', 'saudi-arabia'], ['saudi-arabia', 'united-arab-emirates'], ['united-arab-emirates', 'qatar'], ['qatar', 'egypt'],
  ['saudi-arabia', 'germany'], ['germany', 'france'], ['france', 'united-kingdom'], ['france', 'united-states'],
].map(([from, to]) => ({ type: 'LineString', coordinates: [markersById.get(from).coordinates, markersById.get(to).coordinates] }));

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
      const radius = size * 0.436;
      const projection = geoOrthographic()
        .translate([center, center])
        .scale(radius)
        .clipAngle(90.1)
        .precision(0.25)
        .rotate(rotation);
      const path = geoPath(projection, context);

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, size, size);

      context.save();
      context.beginPath();
      path(sphere);
      context.clip();

      context.fillStyle = '#e6e3da';
      context.fillRect(0, 0, size, size);

      context.beginPath();
      path(graticule);
      context.setLineDash([1, 5.2]);
      context.strokeStyle = 'rgba(45, 45, 40, 0.28)';
      context.lineWidth = 0.48;
      context.stroke();
      context.setLineDash([]);

      context.beginPath();
      path(land);
      context.fillStyle = 'rgba(47, 49, 44, 0.1)';
      context.fill();
      context.strokeStyle = 'rgba(39, 40, 36, 0.54)';
      context.lineWidth = 0.42;
      context.stroke();

      context.save();
      context.beginPath();
      path(land);
      context.clip();
      const dotStep = clamp(radius * 0.045, 6.6, 8.4);
      const dotRadius = Math.max(1.05, dotStep * 0.18);
      const left = center - radius;
      const right = center + radius;
      const top = center - radius;
      const bottom = center + radius;
      context.fillStyle = '#2c2d29';
      for (let row = 0, y = top; y <= bottom; row += 1, y += dotStep) {
        const offset = row % 2 ? dotStep * 0.5 : 0;
        for (let x = left + offset; x <= right; x += dotStep) {
          const distance = Math.hypot(x - center, y - center) / radius;
          if (distance > 1) continue;
          const grain = Math.sin(x * 0.075 + y * 0.047) * 0.08;
          context.globalAlpha = Math.max(0.38, 0.68 - distance * 0.18 + grain);
          context.beginPath();
          context.arc(x, y, dotRadius, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.restore();

      const projectVisiblePoint = (coordinates) => {
        let projected;
        const stream = projection.stream({
          point(x, y) { projected = [x, y]; },
          lineStart() {},
          lineEnd() {},
          polygonStart() {},
          polygonEnd() {},
          sphere() {},
        });
        stream.point(coordinates[0], coordinates[1]);
        return projected;
      };

      context.strokeStyle = 'rgba(27, 58, 44, 0.48)';
      context.lineWidth = clamp(radius * 0.005, 0.58, 0.86);
      regionalConnections.forEach((connection) => {
        context.beginPath();
        path(connection);
        context.stroke();
      });

      regionalMarkers.forEach((marker) => {
        const projected = projectVisiblePoint(marker.coordinates);
        if (!projected) return;
        const [x, y] = projected;
        const markerRadius = clamp(radius * 0.015, 2.6, 3.8);

        context.beginPath();
        context.arc(x, y, markerRadius * 1.95, 0, Math.PI * 2);
        context.fillStyle = 'rgba(183, 122, 54, 0.2)';
        context.fill();

        context.beginPath();
        context.arc(x, y, markerRadius, 0, Math.PI * 2);
        context.fillStyle = '#1b3a2c';
        context.fill();
        context.strokeStyle = '#f4efe2';
        context.lineWidth = 1.15;
        context.stroke();
      });

      const paperFalloff = context.createRadialGradient(center - radius * 0.26, center - radius * 0.28, radius * 0.08, center, center, radius * 1.04);
      paperFalloff.addColorStop(0, 'rgba(255, 255, 252, 0)');
      paperFalloff.addColorStop(0.72, 'rgba(249, 247, 241, 0)');
      paperFalloff.addColorStop(1, 'rgba(45, 45, 40, 0.12)');
      context.fillStyle = paperFalloff;
      context.fillRect(0, 0, size, size);
      context.restore();

      context.beginPath();
      path(sphere);
      context.strokeStyle = 'rgba(41, 42, 38, 0.66)';
      context.lineWidth = 0.8;
      context.stroke();
    };

    const render = (timestamp) => {
      if (!isVisible) {
        frameId = undefined;
        return;
      }
      const elapsed = Math.min(timestamp - lastFrame || 16, 40);
      lastFrame = timestamp;
      if (!prefersReducedMotion && !isDragging && timestamp - lastDraw >= 16) {
        rotation[0] += elapsed * (autoRotationDegreesPerSecond / 1000);
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
      <canvas ref={canvasRef} className="landing-global-globe-canvas" aria-label="Interactive rotating printed globe" />
    </div>
  );
}
