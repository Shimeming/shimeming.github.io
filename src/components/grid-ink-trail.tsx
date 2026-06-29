'use client';

import { useEffect, useRef } from 'react';

/**
 * Brush-style ink trail that follows the cursor across the blueprint grid.
 * - Colour is read from the `--primary` token, so it tracks light/dark.
 * - Stroke width swells when the cursor slows and thins when it moves fast.
 * - Stamps fade out, leaving a transient trail.
 * Renders an absolutely-positioned canvas; the parent must be `relative`.
 */

type Stamp = { x: number; y: number; r: number; life: number };

// Brush feel (matches the approved "blue brush, default size" preset).
const W_MIN = 3;
const W_MAX = 12;
const BASE_ALPHA = 0.5;
const SPACING = 1.4;     // px between stamps along the path
const FADE = 0.02;       // life lost per frame (~0.8s lifetime)
const MAX_STAMPS = 1200;
const SPRITE = 64;       // pre-rendered brush sprite size (px)

const GridInkTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Honour reduced-motion: no trail at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // --- soft brush sprite, tinted from --primary and rebuilt on theme change ---
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = SPRITE;
    const sctx = sprite.getContext('2d')!;
    const buildSprite = () => {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim();
      const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
      const r = m ? parseInt(m[1], 16) : 30;
      const g = m ? parseInt(m[2], 16) : 95;
      const b = m ? parseInt(m[3], 16) : 204;
      sctx.clearRect(0, 0, SPRITE, SPRITE);
      const grad = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
      grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, SPRITE, SPRITE);
    };
    buildSprite();
    const themeObserver = new MutationObserver(buildSprite);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });

    // --- canvas sizing (DPR aware) ---
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // --- trail state ---
    const stamps: Stamp[] = [];
    let smoothR: number | null = null;
    let last: { x: number; y: number; t: number } | null = null;

    const emit = (x0: number, y0: number, x1: number, y1: number, dt: number) => {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const dist = Math.hypot(dx, dy);
      if (dist > 140) return; // ignore big jumps (cursor re-entry)
      const speed = dist / Math.max(dt, 1); // px per ms
      const k = Math.min(speed / 2, 1);
      const target = W_MAX - k * (W_MAX - W_MIN); // slow → thick, fast → thin
      smoothR = smoothR == null ? target : smoothR + (target - smoothR) * 0.35;
      const steps = Math.max(1, Math.floor(dist / SPACING));
      for (let i = 0; i < steps; i++) {
        const f = i / steps;
        stamps.push({ x: x0 + dx * f, y: y0 + dy * f, r: smoothR, life: 1 });
      }
      while (stamps.length > MAX_STAMPS) stamps.shift();
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        last = null;
        smoothR = null;
        return;
      }
      const t = performance.now();
      if (last) emit(last.x, last.y, x, y, t - last.t);
      last = { x, y, t };
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let i = stamps.length - 1; i >= 0; i--) {
        const s = stamps[i];
        s.life -= FADE;
        if (s.life <= 0) {
          stamps.splice(i, 1);
          continue;
        }
        const r = Math.max(s.r, 0.5);
        ctx.globalAlpha = BASE_ALPHA * s.life;
        ctx.drawImage(sprite, s.x - r, s.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 h-full w-full'
    />
  );
};

export default GridInkTrail;
