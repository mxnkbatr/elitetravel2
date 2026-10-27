import { useEffect, useRef, useState } from 'react';
import { PROJECTS, type Lang, type Project } from '../data';

interface Props {
  lang: Lang;
  onPick: (id: string) => void;
}

interface Tip {
  p: Project;
  x: number;
  y: number;
}

/**
 * Canvas "solar system": every shipped product orbits the MD core on one of
 * three tilted rings. Hover shows the product, click jumps to its card.
 */
export default function Orbit({ lang, onPick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    const cv = canvasRef.current!;
    const host = cv.parentElement!;
    const ctx = cv.getContext('2d')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, cx = 0, cy = 0, R = 0;
    let hovered: Node | null = null;
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let visible = true;

    const stars = Array.from({ length: 170 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.2, a: Math.random() * 0.6 + 0.15, p: Math.random() * 6.28,
    }));

    const rings = [
      { r: 0.42, incl: 1.12, rot: -0.35, speed: 0.16 },
      { r: 0.68, incl: 1.2, rot: 0.25, speed: -0.1 },
      { r: 0.95, incl: 1.26, rot: -0.12, speed: 0.065 },
    ];
    type Node = { p: Project; ring: (typeof rings)[number]; phase: number; color: string; sx: number; sy: number; depth: number; size: number };
    const nodes: Node[] = PROJECTS.map((p, i) => ({
      p, ring: rings[i % 3], phase: (i / PROJECTS.length) * Math.PI * 2 + (i % 3) * 0.7,
      color: p.kind.length === 2 ? '#ffffff' : p.kind[0] === 'mobile' ? '#ffb547' : '#8ff3ff',
      sx: 0, sy: 0, depth: 0, size: 0,
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const narrow = w < 820;
      cx = narrow ? w * 0.58 : w * 0.74;
      cy = narrow ? h * 0.2 : h * 0.52;
      R = narrow ? Math.min(w * 0.55, h * 0.22) : Math.min(w * 0.26, h * 0.42);
    }

    function project(ring: (typeof rings)[number], angle: number) {
      const x0 = Math.cos(angle) * ring.r * R;
      const z0 = Math.sin(angle) * ring.r * R;
      const incl = ring.incl + tilt.y * 0.3;
      const y1 = z0 * Math.cos(incl);
      const z1 = z0 * Math.sin(incl);
      const rot = ring.rot + tilt.x * 0.2;
      const x2 = x0 * Math.cos(rot) - y1 * Math.sin(rot);
      const y2 = x0 * Math.sin(rot) + y1 * Math.cos(rot);
      const persp = 1 + z1 / (R * 3);
      return { x: cx + x2 * persp, y: cy + y2 * persp, z: z1 };
    }

    let last = performance.now();
    let time = 0;
    function draw(now: number) {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!hovered && !reduced) time += dt;
      tilt.x += (tilt.tx - tilt.x) * 0.06;
      tilt.y += (tilt.ty - tilt.y) * 0.06;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const tw = reduced ? 1 : 0.6 + 0.4 * Math.sin(time * 1.4 + s.p);
        ctx.fillStyle = `rgba(200,215,255,${s.a * tw})`;
        ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, 6.283); ctx.fill();
      }

      for (const ring of rings) {
        ctx.beginPath();
        for (let a = 0; a <= 6.3; a += 0.05) {
          const q = project(ring, a);
          if (a === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = 'rgba(143,165,255,0.22)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const n of nodes) {
        const q = project(n.ring, n.phase + time * n.ring.speed);
        n.sx = q.x; n.sy = q.y; n.depth = q.z;
        n.size = 4 + (q.z / R + 1) * 2.4;
      }
      nodes.filter(n => n.depth < 0).forEach(drawNode);
      drawCore();
      nodes.filter(n => n.depth >= 0).forEach(drawNode);
    }

    function drawCore() {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.32);
      g.addColorStop(0, 'rgba(255,214,140,1)');
      g.addColorStop(0.12, 'rgba(255,181,71,0.95)');
      g.addColorStop(0.35, 'rgba(255,140,60,0.25)');
      g.addColorStop(1, 'rgba(76,125,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 0.32, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#05071a';
      ctx.font = `700 ${Math.max(12, R * 0.07)}px Unbounded, sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('MD', cx, cy + 1);
    }

    function drawNode(n: Node) {
      const active = hovered === n;
      ctx.globalAlpha = n.depth < 0 ? 0.55 : 1;
      const glow = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, n.size * 5);
      glow.addColorStop(0, n.color + '88');
      glow.addColorStop(1, n.color + '00');
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, n.size * 5, 0, 6.283); ctx.fill();
      ctx.fillStyle = n.color;
      ctx.beginPath(); ctx.arc(n.sx, n.sy, active ? n.size * 1.6 : n.size, 0, 6.283); ctx.fill();
      if (active) {
        ctx.strokeStyle = n.color; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(n.sx, n.sy, n.size * 3.2, 0, 6.283); ctx.stroke();
      }
      if (w >= 820) {
        ctx.fillStyle = `rgba(233,237,255,${n.depth < 0 ? 0.45 : 0.85})`;
        ctx.font = '500 12px Onest, sans-serif';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(n.p.name, n.sx + n.size + 8, n.sy);
      }
      ctx.globalAlpha = 1;
    }

    function hit(x: number, y: number) {
      let best: Node | null = null, bd = 22 * 22;
      for (const n of nodes) {
        const d = (n.sx - x) ** 2 + (n.sy - y) ** 2;
        if (d < bd) { bd = d; best = n; }
      }
      return best;
    }

    function local(e: PointerEvent | MouseEvent) {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function onMove(e: PointerEvent) {
      const m = local(e);
      if (!reduced) { tilt.tx = m.x / w - 0.5; tilt.ty = m.y / h - 0.5; }
      if ((e.target as HTMLElement).closest('a, button')) { hovered = null; setTip(null); return; }
      hovered = hit(m.x, m.y);
      host.style.cursor = hovered ? 'pointer' : '';
      setTip(hovered ? { p: hovered.p, x: hovered.sx, y: hovered.sy } : null);
    }
    function onLeave() { hovered = null; setTip(null); host.style.cursor = ''; }
    function onClick(e: MouseEvent) {
      if ((e.target as HTMLElement).closest('a, button')) return;
      const m = local(e);
      const n = hit(m.x, m.y);
      if (n) onPickRef.current(n.p.id);
    }

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(host);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('click', onClick);
    window.addEventListener('resize', resize);
    resize();
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="orbit" aria-hidden="true" />
      {tip && (
        <div className="orbit-tip" style={{ left: tip.x, top: tip.y }}>
          <b>{tip.p.name}</b>
          <span>{tip.p.metric[lang]}</span> · {tip.p.plat.join(', ')}
        </div>
      )}
    </>
  );
}
