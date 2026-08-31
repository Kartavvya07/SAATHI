import * as React from 'react';
import { useEffect, useRef } from 'react';

const R_SPHERE = 2.5;
const BASE_N = 200;
const BASE_LINK = 1.0954; // sqrt(1.2)
const FOCAL = 1.303; // 1 / tan(75deg / 2)

const VERT_SRC = `
precision highp float;

attribute vec3 a_p0;
attribute vec3 a_p1;
attribute vec2 a_corner;

uniform mat3  uRot;
uniform vec2  uRes;
uniform float uDist, uWidth;

varying float v_depth;

void main(){
  float ar = uRes.x / max(uRes.y, 1.0);

  vec3 r0 = uRot * a_p0;
  vec3 r1 = uRot * a_p1;

  float w0 = max(uDist - r0.z, 0.05);
  float w1 = max(uDist - r1.z, 0.05);
  vec4 c0 = vec4((FOCAL_/ar) * r0.x, FOCAL_ * r0.y, 0.0, w0);
  vec4 c1 = vec4((FOCAL_/ar) * r1.x, FOCAL_ * r1.y, 0.0, w1);

  vec2 n0 = c0.xy / c0.w;
  vec2 n1 = c1.xy / c1.w;
  vec2 dir = (n1 - n0) * vec2(ar, 1.0);
  dir = normalize(dir + vec2(1e-6));
  vec2 perp = vec2(-dir.y, dir.x) / vec2(ar, 1.0);

  vec4 sel = mix(c0, c1, a_corner.x);
  sel.xy += perp * a_corner.y * uWidth * sel.w;

  v_depth = mix(r0.z, r1.z, a_corner.x) / ${R_SPHERE.toFixed(2)};
  gl_Position = sel;
}
`.replace(/FOCAL_/g, FOCAL.toFixed(4));

const FRAG_SRC = `
precision mediump float;

uniform vec3  uBase, uAccent;
uniform float uFade;

varying float v_depth;

void main(){
  float t = clamp(v_depth * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(uBase, uAccent, t);
  float a = mix(1.0 - uFade, 1.0, t);
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('ConstellationShell shader error:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function parseColor(input: string | undefined, fb: [number, number, number]): [number, number, number] {
  if (!input) return fb;
  const str = String(input).trim();
  if (str.charAt(0) === '#') {
    let hex = str.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return [r / 255, g / 255, b / 255];
    }
    return fb;
  }
  const m = str.match(/[\d.]+/g);
  if (m && m.length >= 3) {
    return [
      Math.min(255, parseFloat(m[0])) / 255,
      Math.min(255, parseFloat(m[1])) / 255,
      Math.min(255, parseFloat(m[2])) / 255,
    ];
  }
  return fb;
}

function num(v: unknown, fb: number): number {
  return typeof v === 'number' && isFinite(v) ? v : fb;
}

function clampN(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CORNERS = [
  [0, -1], [1, -1], [1, 1],
  [0, -1], [1, 1], [0, 1],
];

function net(n: number, linkScale: number): { p0: Float32Array; p1: Float32Array; corner: Float32Array; edges: number } {
  const R = rng(1337);
  const px = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const theta = R() * Math.PI * 2;
    const phi = Math.acos(R() * 2 - 1);
    const s = Math.sin(phi);
    px[i * 3] = R_SPHERE * s * Math.cos(theta);
    px[i * 3 + 1] = R_SPHERE * s * Math.sin(theta);
    px[i * 3 + 2] = R_SPHERE * Math.cos(phi);
  }
  const link = BASE_LINK * Math.sqrt(BASE_N / n) * linkScale;
  const l2 = link * link;
  const ea: number[] = [];
  const eb: number[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = px[i * 3] - px[j * 3];
      const dy = px[i * 3 + 1] - px[j * 3 + 1];
      const dz = px[i * 3 + 2] - px[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < l2) {
        ea.push(i);
        eb.push(j);
      }
    }
  }
  const edges = ea.length;
  const p0 = new Float32Array(edges * 6 * 3);
  const p1 = new Float32Array(edges * 6 * 3);
  const corner = new Float32Array(edges * 6 * 2);
  for (let e = 0; e < edges; e++) {
    const i = ea[e];
    const j = eb[e];
    for (let c = 0; c < 6; c++) {
      const k = e * 6 + c;
      p0[k * 3] = px[i * 3];
      p0[k * 3 + 1] = px[i * 3 + 1];
      p0[k * 3 + 2] = px[i * 3 + 2];
      p1[k * 3] = px[j * 3];
      p1[k * 3 + 1] = px[j * 3 + 1];
      p1[k * 3 + 2] = px[j * 3 + 2];
      corner[k * 2] = CORNERS[c][0];
      corner[k * 2 + 1] = CORNERS[c][1];
    }
  }
  return { p0, p1, corner, edges };
}

export interface ConstellationShellProps {
  className?: string;
  style?: React.CSSProperties;
  baseColor?: string;
  accentColor?: string;
  density?: number;
  speed?: number;
  hover?: number;
  distance?: number;
  fade?: number;
  link?: number;
  lineWidth?: number;
}

export function ConstellationShell({
  className = '',
  style,
  baseColor = '#476F9E',
  accentColor = '#2563EB',
  density = 280,
  speed = 22,
  hover = 80,
  distance = 52,
  fade = 68,
  link = 150,
  lineWidth = 14,
}: ConstellationShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ptrRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 });
  const vRef = useRef<Record<string, number | string>>({});

  vRef.current = {
    base: baseColor,
    accent: accentColor,
    density,
    speed,
    hover,
    distance,
    fade,
    link,
    lineWidth,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      depth: false,
      premultipliedAlpha: true,
    });
    if (!gl) {
      console.warn('ConstellationShell: WebGL not supported on this browser');
      return;
    }

    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxDpr = isMobile ? 1.2 : 2.0;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('ConstellationShell program error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const aP0 = gl.getAttribLocation(prog, 'a_p0');
    const aP1 = gl.getAttribLocation(prog, 'a_p1');
    const aCorner = gl.getAttribLocation(prog, 'a_corner');
    gl.enableVertexAttribArray(aP0);
    gl.enableVertexAttribArray(aP1);
    gl.enableVertexAttribArray(aCorner);

    const locs: Record<string, WebGLUniformLocation | null> = {};
    const u = (name: string) => {
      if (!(name in locs)) locs[name] = gl.getUniformLocation(prog, name);
      return locs[name];
    };

    const b0 = gl.createBuffer();
    const b1 = gl.createBuffer();
    const bc = gl.createBuffer();
    let builtN = 0;
    let builtLink = 0;
    let verts = 0;

    const build = (n: number, linkScale: number) => {
      const g = net(n, linkScale);
      gl.bindBuffer(gl.ARRAY_BUFFER, b0);
      gl.bufferData(gl.ARRAY_BUFFER, g.p0, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, b1);
      gl.bufferData(gl.ARRAY_BUFFER, g.p1, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, bc);
      gl.bufferData(gl.ARRAY_BUFFER, g.corner, gl.STATIC_DRAW);
      builtN = n;
      builtLink = linkScale;
      verts = g.edges * 6;
    };

    const effectiveDensity = isMobile
      ? Math.round(clampN(num(vRef.current.density, 280) * 0.55, 60, 200))
      : Math.round(clampN(num(vRef.current.density, 280), 80, 500));

    const effectiveLink = clampN(num(vRef.current.link, 150), 40, 200) / 100;
    build(effectiveDensity, effectiveLink);

    let raf = 0;
    let last = performance.now();
    let clock = 0;

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const rawSpeed = prefersReducedMotion ? 0 : (num(vRef.current.speed, 22) / 50);
      clock = (clock + dt * rawSpeed) % 3600;

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const cw = container.clientWidth || 400;
      const ch = container.clientHeight || 400;
      const bw = Math.max(1, Math.round(cw * dpr));
      const bh = Math.max(1, Math.round(ch * dpr));

      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, bw, bh);

      const ptr = ptrRef.current;
      const pk = 1 - Math.exp(-dt * 3.5);
      ptr.x += (ptr.tx - ptr.x) * pk;
      ptr.y += (ptr.ty - ptr.y) * pk;

      const hv = (prefersReducedMotion || isMobile) ? 0 : (num(vRef.current.hover, 80) / 100);
      
      // Symmetrical, full-range 360-degree orbital calculation for both axes
      const orbitRange = Math.PI * 1.25; // Balanced full orbital span
      const ay = clock * 0.12 + ptr.x * orbitRange * hv;
      const ax = clock * 0.08 - ptr.y * orbitRange * hv;

      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);

      // Orthonormal Ry * Rx rotation matrix in WebGL column-major format
      const rot = new Float32Array([
        cy,        0,   -sy,
        sy * sx,   cx,  cy * sx,
        sy * cx,  -sx,  cy * cx,
      ]);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      gl.bindBuffer(gl.ARRAY_BUFFER, b0);
      gl.vertexAttribPointer(aP0, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, b1);
      gl.vertexAttribPointer(aP1, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, bc);
      gl.vertexAttribPointer(aCorner, 2, gl.FLOAT, false, 0, 0);

      gl.uniformMatrix3fv(u('uRot'), false, rot);
      gl.uniform2f(u('uRes'), bw, bh);
      gl.uniform1f(u('uDist'), clampN(num(vRef.current.distance, 52), 20, 120) / 10);
      gl.uniform1f(u('uWidth'), (clampN(num(vRef.current.lineWidth, 14), 5, 100) / 100) * 0.0016);
      gl.uniform1f(u('uFade'), clampN(num(vRef.current.fade, 68), 0, 100) / 100);

      const cb = parseColor(vRef.current.base as string, [0.278, 0.435, 0.62]);
      const ca = parseColor(vRef.current.accent as string, [0.145, 0.388, 0.922]);
      gl.uniform3f(u('uBase'), cb[0], cb[1], cb[2]);
      gl.uniform3f(u('uAccent'), ca[0], ca[1], ca[2]);

      gl.drawArrays(gl.TRIANGLES, 0, verts);
      raf = requestAnimationFrame(render);
    };

    // Normalized pointer tracking: -1 (left/top) to 0 (center) to +1 (right/bottom)
    const onMove = (e: MouseEvent) => {
      if (isMobile) return;
      const r = container.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;
      
      const centerX = r.left + r.width / 2;
      const centerY = r.top + r.height / 2;
      
      const nx = (e.clientX - centerX) / (r.width / 2);
      const ny = (e.clientY - centerY) / (r.height / 2);
      
      ptrRef.current.tx = clampN(nx, -1.5, 1.5);
      ptrRef.current.ty = clampN(ny, -1.5, 1.5);
    };

    const onLeave = () => {
      ptrRef.current.tx = 0;
      ptrRef.current.ty = 0;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full block"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default ConstellationShell;
