// Hero visual: the 21 MediaPipe hand landmarks, rendered like a product shot.
// Colours come from CSS variables (--hand-joint, --hand-bone, --hand-tip, --hand-dust) so a theme can restyle it.
// It cycles through gestures; swatches below let visitors pick one.
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

type Joint3 = [number, number, number];
export interface Pose {
  name: string;
  curl: Joint3[]; // per finger (thumb, index, middle, ring, pinky): MCP, PIP, DIP bend in radians
  spread: number[]; // per finger sideways rotation in radians
}

const BENT: Joint3 = [1.45, 1.75, 1.05];
const STRAIGHT: Joint3 = [0.06, 0.08, 0.05];
const THUMB_IN: Joint3 = [0.55, 0.75, 0.55];
const THUMB_OUT: Joint3 = [0.05, 0.08, 0.06];

// Names follow MediaPipe Gesture Recognizer's built-in categories.
export const POSES: Pose[] = [
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

const TIPS = new Set([4, 8, 12, 16, 20]);
const CENTER = new Vector3(0.05, 2.15, 0);

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

/** A crisp disc with a soft 1px edge, so points read as solid dots on white. */
function dotTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.62, 'rgba(255,255,255,1)');
  grad.addColorStop(0.78, 'rgba(255,255,255,0.35)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const copyCurl = (c: Joint3[]) => c.map((j) => [...j] as Joint3);

export function mountHandScene(stage: HTMLElement) {
  const canvas = stage.querySelector('canvas');
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

  const css = getComputedStyle(stage);
  const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  const INK = new Color(token('--hand-joint', '#f5f5f7'));
  const ACCENT = new Color(token('--hand-tip', '#2997ff'));
  const BONE = new Color(token('--hand-bone', '#6e6e73'));
  const DUST_COLOR = new Color(token('--hand-dust', '#48484a'));

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  const hand = new Group();
  scene.add(hand);

  const sprite = dotTexture();
  const positions = new Float32Array(21 * 3);
  const colors = new Float32Array(21 * 3);
  for (let i = 0; i < 21; i++) (TIPS.has(i) ? ACCENT : INK).toArray(colors, i * 3);

  const pointGeo = new BufferGeometry();
  pointGeo.setAttribute('position', new BufferAttribute(positions, 3));
  pointGeo.setAttribute('color', new BufferAttribute(colors, 3));
  const joints = new Points(
    pointGeo,
    new PointsMaterial({ size: 0.25, map: sprite, vertexColors: true, transparent: true, alphaTest: 0.05, blending: NormalBlending }),
  );
  // Soft ring around fingertips, like a selection state
  const tipGeo = new BufferGeometry();
  const tipPos = new Float32Array(5 * 3);
  tipGeo.setAttribute('position', new BufferAttribute(tipPos, 3));
  const tipHalo = new Points(
    tipGeo,
    new PointsMaterial({ size: 0.7, map: sprite, color: ACCENT, transparent: true, opacity: 0.22, depthWrite: false, blending: NormalBlending }),
  );
  hand.add(tipHalo, joints);

  const bonePos = new Float32Array(BONES.length * 2 * 3);
  const boneGeo = new BufferGeometry();
  boneGeo.setAttribute('position', new BufferAttribute(bonePos, 3));
  const bones = new LineSegments(boneGeo, new LineBasicMaterial({ color: BONE, transparent: true, opacity: 0.9 }));
  hand.add(bones);

  // Faint dust for depth
  const DUST = 260;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    const r = 3.4 + Math.random() * 5;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    dustPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    dustPos[i * 3 + 1] = r * Math.cos(ph) * 0.55;
    dustPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 2;
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute('position', new BufferAttribute(dustPos, 3));
  const dust = new Points(
    dustGeo,
    new PointsMaterial({ size: 0.045, map: sprite, color: DUST_COLOR, transparent: true, opacity: 0.9, depthWrite: false }),
  );
  scene.add(dust);

  // ---- Pose state: hold, then morph to the next pose (or to the one a visitor picked) ----
  const HOLD = 2.6;
  const MORPH = 1.0;
  const curl: Joint3[] = copyCurl(POSES[0].curl);
  const spread = [...POSES[0].spread];
  let fromCurl = copyCurl(curl);
  let fromSpread = [...spread];
  let target = 0;
  let morphStart = -1;
  let holdStart = performance.now() / 1000;
  let autoAfter = 0; // auto-cycling resumes after this time (seconds)

  const emit = (i: number) => stage.dispatchEvent(new CustomEvent('pose', { detail: { index: i, name: POSES[i].name } }));

  function startMorph(i: number, t: number) {
    fromCurl = copyCurl(curl);
    fromSpread = [...spread];
    target = i;
    morphStart = t;
    emit(i);
  }

  function writePose() {
    solve(curl, spread, positions);
    BONES.forEach(([a, b], i) => {
      bonePos.set(positions.subarray(a * 3, a * 3 + 3), i * 6);
      bonePos.set(positions.subarray(b * 3, b * 3 + 3), i * 6 + 3);
    });
    [4, 8, 12, 16, 20].forEach((p, i) => tipPos.set(positions.subarray(p * 3, p * 3 + 3), i * 3));
    pointGeo.attributes.position.needsUpdate = true;
    boneGeo.attributes.position.needsUpdate = true;
    tipGeo.attributes.position.needsUpdate = true;
  }

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = Math.max(8.4, 6.8 / camera.aspect);
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

  let visible = true;
  let raf = 0;
  const clock = () => performance.now() / 1000;

  function frame() {
    const t = clock();
    if (morphStart < 0) {
      if (t - holdStart > HOLD && t > autoAfter) startMorph((target + 1) % POSES.length, t);
    }
    const m = morphStart < 0 ? 1 : ease(Math.min((t - morphStart) / MORPH, 1));
    const to = POSES[target];
    const breathe = Math.sin(t * 1.7) * 0.035;
    for (let f = 0; f < 5; f++) {
      for (let j = 0; j < 3; j++) curl[f][j] = fromCurl[f][j] + (to.curl[f][j] - fromCurl[f][j]) * m + breathe * (j + 1) * 0.3;
      spread[f] = fromSpread[f] + (to.spread[f] - fromSpread[f]) * m;
    }
    if (morphStart >= 0 && m >= 1) {
      morphStart = -1;
      holdStart = t;
    }
    writePose();

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    const rect = stage.getBoundingClientRect();
    const stageBottom = rect.bottom + window.scrollY;
    const scroll = Math.min(Math.max(window.scrollY / Math.max(stageBottom, 1), 0), 1);
    hand.rotation.y = Math.sin(t * 0.35) * 0.45 + pointer.x * 0.3 + scroll * 1.2;
    hand.rotation.x = -0.1 + pointer.y * 0.15 + scroll * 0.4;
    hand.rotation.z = Math.sin(t * 0.25) * 0.04;
    hand.position.y = -0.12 + Math.sin(t * 0.8) * 0.05 + scroll * 1.0;
    hand.scale.setScalar(1 - scroll * 0.2);
    dust.rotation.y = t * 0.02;
    renderer.render(scene, camera);
    if (visible) raf = requestAnimationFrame(frame);
  }

  // Swatches (or anything else) can ask for a pose: stage.dispatchEvent(new CustomEvent('pose:goto', {detail: i}))
  stage.addEventListener('pose:goto', (e) => {
    const i = (e as CustomEvent<number>).detail;
    if (i === target && morphStart < 0) return;
    const t = clock();
    autoAfter = t + 6;
    startMorph(i, t);
    if (reduced) {
      for (let f = 0; f < 5; f++) {
        curl[f] = [...POSES[i].curl[f]] as Joint3;
        spread[f] = POSES[i].spread[f];
      }
      morphStart = -1;
      writePose();
      renderer.render(scene, camera);
    }
  });

  resize();
  new ResizeObserver(() => {
    resize();
    if (reduced) renderer.render(scene, camera);
  }).observe(stage);
  emit(0);

  if (reduced) {
    writePose();
    hand.rotation.set(-0.1, -0.3, 0);
    renderer.render(scene, camera);
    stage.classList.add('ready');
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
