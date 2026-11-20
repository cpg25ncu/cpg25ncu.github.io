// Hero visual: the 21 MediaPipe hand landmarks as a glowing 3D point cloud that morphs between gestures.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

type Joint3 = [number, number, number];
interface Pose {
  name: string;
  curl: Joint3[]; // per finger (thumb, index, middle, ring, pinky): MCP, PIP, DIP bend in radians
  spread: number[]; // per finger sideways rotation in radians
}

const BENT: Joint3 = [1.45, 1.75, 1.05];
const STRAIGHT: Joint3 = [0.06, 0.08, 0.05];
const THUMB_IN: Joint3 = [0.55, 0.75, 0.55];
const THUMB_OUT: Joint3 = [0.05, 0.08, 0.06];

// Names follow MediaPipe Gesture Recognizer's built-in categories.
const POSES: Pose[] = [
  { name: 'Open_Palm', curl: [THUMB_OUT, STRAIGHT, STRAIGHT, STRAIGHT, STRAIGHT], spread: [0.12, 0.12, 0, -0.08, -0.2] },
  { name: 'Victory', curl: [THUMB_IN, STRAIGHT, STRAIGHT, BENT, BENT], spread: [0, 0.2, -0.12, 0, 0] },
  { name: 'ILoveYou', curl: [THUMB_OUT, STRAIGHT, BENT, BENT, STRAIGHT], spread: [0.25, 0.06, 0, 0, -0.28] },
  { name: 'Pointing_Up', curl: [THUMB_IN, STRAIGHT, BENT, BENT, BENT], spread: [0, 0, 0, 0, 0] },
  { name: 'Closed_Fist', curl: [[0.75, 0.95, 0.7], BENT, BENT, BENT, BENT], spread: [0, 0, 0, 0, 0] },
];

// Hand-local frame: y towards the fingers, x to the right, z towards the viewer (palm side).
const FINGERS = [
  { base: [-0.45, 0.45, 0.15], dir: [-0.75, 0.66], lens: [0.75, 0.58, 0.48], bend: [0.62, 0, 0.78] },
  { base: [-0.78, 2.35, 0], dir: [-0.12, 1], lens: [0.95, 0.6, 0.48], bend: [0, 0, 1] },
  { base: [-0.12, 2.5, 0], dir: [0, 1], lens: [1.05, 0.68, 0.5], bend: [0, 0, 1] },
  { base: [0.52, 2.35, 0], dir: [0.1, 1], lens: [0.98, 0.62, 0.46], bend: [0, 0, 1] },
  { base: [1.08, 2.0, 0], dir: [0.24, 1], lens: [0.75, 0.48, 0.4], bend: [0, 0, 1] },
];

const BONES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

const FINGER_COLORS = ['#5ee7ff', '#6c8cff', '#b36bff', '#ff6bb5', '#ffb36b'].map((c) => new Color(c));
const WRIST_COLOR = new Color('#f7f8f8');
const PALM_COLOR = new Color('#9aa3b5');
const CENTER = new Vector3(0.05, 2.15, 0);

function landmarkColor(i: number): Color {
  return i === 0 ? WRIST_COLOR : FINGER_COLORS[Math.floor((i - 1) / 4)];
}

function solve(curl: Joint3[], spread: number[], out: Float32Array) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  FINGERS.forEach((f, fi) => {
    const a = spread[fi];
    const dx = f.dir[0] * Math.cos(a) - f.dir[1] * Math.sin(a);
    const dy = f.dir[0] * Math.sin(a) + f.dir[1] * Math.cos(a);
    const n = Math.hypot(dx, dy);
    const d = [dx / n, dy / n, 0];
    let p = [f.base[0], f.base[1], f.base[2]];
    let phi = 0;
    const idx = 1 + fi * 4;
    out[idx * 3] = p[0];
    out[idx * 3 + 1] = p[1];
    out[idx * 3 + 2] = p[2];
    for (let j = 0; j < 3; j++) {
      phi += curl[fi][j];
      const c = Math.cos(phi);
      const s = Math.sin(phi);
      const dir = [c * d[0] + s * f.bend[0], c * d[1] + s * f.bend[1], c * d[2] + s * f.bend[2]];
      p = [p[0] + f.lens[j] * dir[0], p[1] + f.lens[j] * dir[1], p[2] + f.lens[j] * dir[2]];
      const k = (idx + j + 1) * 3;
      out[k] = p[0];
      out[k + 1] = p[1];
      out[k + 2] = p[2];
    }
  });
  for (let i = 0; i < 21; i++) {
    out[i * 3] -= CENTER.x;
    out[i * 3 + 1] -= CENTER.y;
    out[i * 3 + 2] -= CENTER.z;
  }
}

function dotTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  grad.addColorStop(0.55, 'rgba(255,255,255,0.18)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export function mountHandScene(stage: HTMLElement) {
  const canvas = stage.querySelector('canvas');
  const label = document.querySelector<HTMLElement>('[data-gesture-label]');
  if (!canvas) return;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    stage.classList.add('no-webgl');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const hand = new Group();
  scene.add(hand);

  const sprite = dotTexture();
  const positions = new Float32Array(21 * 3);
  const colors = new Float32Array(21 * 3);
  for (let i = 0; i < 21; i++) landmarkColor(i).toArray(colors, i * 3);

  const pointGeo = new BufferGeometry();
  pointGeo.setAttribute('position', new BufferAttribute(positions, 3));
  pointGeo.setAttribute('color', new BufferAttribute(colors, 3));
  const core = new Points(
    pointGeo,
    new PointsMaterial({ size: 0.26, map: sprite, vertexColors: true, transparent: true, depthWrite: false, blending: AdditiveBlending }),
  );
  const halo = new Points(
    pointGeo,
    new PointsMaterial({ size: 0.95, map: sprite, vertexColors: true, transparent: true, opacity: 0.35, depthWrite: false, blending: AdditiveBlending }),
  );
  hand.add(halo, core);

  const bonePos = new Float32Array(BONES.length * 2 * 3);
  const boneCol = new Float32Array(BONES.length * 2 * 3);
  BONES.forEach(([a, b], i) => {
    const palm = a === 0 || (a % 4 === 1 && b % 4 === 1);
    const ca = palm ? PALM_COLOR : landmarkColor(b);
    const cb = palm ? PALM_COLOR : landmarkColor(b);
    ca.toArray(boneCol, i * 6);
    cb.toArray(boneCol, i * 6 + 3);
  });
  const boneGeo = new BufferGeometry();
  boneGeo.setAttribute('position', new BufferAttribute(bonePos, 3));
  boneGeo.setAttribute('color', new BufferAttribute(boneCol, 3));
  const bones = new LineSegments(
    boneGeo,
    new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.7, blending: AdditiveBlending, depthWrite: false }),
  );
  hand.add(bones);

  // Ambient dust for depth
  const DUST = 520;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    const r = 3.2 + Math.random() * 5.5;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    dustPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    dustPos[i * 3 + 1] = r * Math.cos(ph) * 0.6;
    dustPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 2;
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute('position', new BufferAttribute(dustPos, 3));
  const dust = new Points(
    dustGeo,
    new PointsMaterial({ size: 0.06, map: sprite, color: 0x8a9bd8, transparent: true, opacity: 0.55, depthWrite: false, blending: AdditiveBlending }),
  );
  scene.add(dust);

  const curl: Joint3[] = POSES[0].curl.map((j) => [...j] as Joint3);
  const spread = [...POSES[0].spread];

  function writePose() {
    solve(curl, spread, positions);
    BONES.forEach(([a, b], i) => {
      bonePos.set(positions.subarray(a * 3, a * 3 + 3), i * 6);
      bonePos.set(positions.subarray(b * 3, b * 3 + 3), i * 6 + 3);
    });
    pointGeo.attributes.position.needsUpdate = true;
    boneGeo.attributes.position.needsUpdate = true;
  }

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = Math.max(10, 7.4 / camera.aspect);
    camera.updateProjectionMatrix();
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );

  const HOLD = 2.6;
  const MORPH = 1.1;
  let poseIndex = 0;
  let visible = true;
  let raf = 0;
  const start = performance.now();

  function setLabel(name: string) {
    if (label) label.textContent = name;
  }
  setLabel(POSES[0].name);

  function frame(now: number) {
    const t = (now - start) / 1000;
    const cycle = HOLD + MORPH;
    const n = Math.floor(t / cycle);
    const local = t - n * cycle;
    const from = POSES[n % POSES.length];
    const to = POSES[(n + 1) % POSES.length];
    const m = local < HOLD ? 0 : ease((local - HOLD) / MORPH);
    if (m > 0.5 && poseIndex !== (n + 1) % POSES.length) {
      poseIndex = (n + 1) % POSES.length;
      setLabel(to.name);
    } else if (m <= 0.5 && poseIndex !== n % POSES.length) {
      poseIndex = n % POSES.length;
      setLabel(from.name);
    }
    const breathe = Math.sin(t * 1.7) * 0.04;
    for (let f = 0; f < 5; f++) {
      for (let j = 0; j < 3; j++) curl[f][j] = from.curl[f][j] + (to.curl[f][j] - from.curl[f][j]) * m + breathe * (j + 1) * 0.3;
      spread[f] = from.spread[f] + (to.spread[f] - from.spread[f]) * m;
    }
    writePose();

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    const rect = stage.getBoundingClientRect();
    const stageBottom = rect.bottom + window.scrollY;
    const scroll = Math.min(Math.max(window.scrollY / Math.max(stageBottom, 1), 0), 1);
    hand.rotation.y = Math.sin(t * 0.35) * 0.5 + pointer.x * 0.35 + scroll * 1.4;
    hand.rotation.x = -0.12 + pointer.y * 0.18 + scroll * 0.5;
    hand.rotation.z = Math.sin(t * 0.25) * 0.05;
    hand.position.y = Math.sin(t * 0.8) * 0.06 + scroll * 1.2;
    hand.scale.setScalar(1 - scroll * 0.25);
    dust.rotation.y = t * 0.02;
    renderer.render(scene, camera);
    if (visible) raf = requestAnimationFrame(frame);
  }

  resize();
  new ResizeObserver(resize).observe(stage);

  if (reduced) {
    writePose();
    hand.rotation.set(-0.12, -0.35, 0);
    renderer.render(scene, camera);
    return;
  }

  new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting && document.visibilityState === 'visible';
    if (visible && !was) raf = requestAnimationFrame(frame);
    if (!visible) cancelAnimationFrame(raf);
  }).observe(stage);

  document.addEventListener('visibilitychange', () => {
    const on = document.visibilityState === 'visible';
    if (on && !visible) {
      visible = true;
      raf = requestAnimationFrame(frame);
    } else if (!on) {
      visible = false;
      cancelAnimationFrame(raf);
    }
  });

  stage.classList.add('ready');
  raf = requestAnimationFrame(frame);
}
