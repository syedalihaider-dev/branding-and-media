"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";
import { galleryState } from "@/components/Clients/galleryState";

/**
 * The client gallery: a dark, quiet hall the camera glides through.
 * Client names are set as large typography in space, each under its own
 * pool of warm light; project imagery unveils behind them with a single
 * travelling signal line; everyone else on the client list drifts in the
 * periphery; the walk ends inside a slow ring of press names.
 *
 * Craft & perf notes:
 *  - depth of field is faked with mip-bias sampling (no post-processing)
 *  - "fog" is opacity by distance over an ink clear colour
 *  - text is rasterised once to canvas textures with the page's own fonts
 *  - ~40 draw calls, no shadows, no lights; reads mutable state only
 */

export type GalleryItem = {
  name: string;
  type: "sans" | "serif";
  image?: string;
  quote?: boolean;
};

const VIEW = 7.5; // camera distance from a station when it's "in front of you"
const GAP = 15; // distance between stations
const FAR = 36;

const stationZ = (i: number) => -i * GAP;

// ───────────────────────── Shaders ─────────────────────────

const planeVertex = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += sin(uv.x * 3.14159) * uBend;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const planeFragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uBlur;
  uniform float uReveal;
  uniform float uIsText;
  uniform float uReflect;
  varying vec2 vUv;
  void main() {
    // Depth of field: sample a blurrier mip the further from focus.
    vec4 t = texture2D(uTex, vUv, uBlur);
    vec4 col;
    if (uIsText > 0.5) {
      col = vec4(uColor, t.a);
    } else {
      vec3 c = t.rgb;
      float lum = dot(c, vec3(0.299, 0.587, 0.114));
      c = mix(c, vec3(lum) * vec3(1.03, 0.98, 0.92), 0.18);
      c = mix(vec3(0.055, 0.05, 0.043), c, 0.9);
      // Unveil from the bottom with a hot signal line riding the edge.
      float r = uReveal * 1.1 - 0.05;
      float shown = 1.0 - smoothstep(r - 0.015, r, vUv.y);
      float line = smoothstep(r - 0.012, r, vUv.y) - smoothstep(r, r + 0.012, vUv.y);
      c += vec3(1.0, 0.29, 0.11) * line * 1.6 * step(uReveal, 0.999);
      vec2 d = abs(vUv - 0.5) * 2.0;
      float edge = 1.0 - smoothstep(0.94, 1.0, max(d.x, d.y));
      col = vec4(c, max(shown, line) * edge);
    }
    if (uReflect > 0.5) col.a *= (1.0 - smoothstep(0.0, 0.55, vUv.y)) * 0.13;
    gl_FragColor = vec4(col.rgb, col.a * uOpacity);
  }
`;

const beamFragment = /* glsl */ `
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    // A soft cone of light falling from above.
    float w = mix(0.5, 0.12, vUv.y);
    float a = 1.0 - smoothstep(0.0, w, abs(vUv.x - 0.5));
    a *= smoothstep(0.0, 0.45, vUv.y) * (0.55 + 0.45 * vUv.y);
    gl_FragColor = vec4(vec3(1.0, 0.82, 0.66), a * uOpacity);
  }
`;

const dustVertex = /* glsl */ `
  uniform float uTime;
  uniform float uScale;
  uniform float uCamZ;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y = mod(p.y + uTime * (0.04 + aSeed * 0.08) + 3.5, 7.0) - 3.5;
    p.x += sin(uTime * 0.2 + aSeed * 40.0) * 0.15;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float dist = -mv.z;
    gl_PointSize = (1.0 + aSeed * 2.2) * uScale / dist;
    vAlpha = (1.0 - smoothstep(14.0, 30.0, dist)) * smoothstep(0.5, 2.5, dist) * (0.35 + 0.65 * aSeed);
  }
`;

const dustFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vec3(1.0, 0.9, 0.78), a * vAlpha * 0.5);
  }
`;

// ───────────────────────── Text textures ─────────────────────────

type Fonts = { sans: string; serif: string };

function readFonts(): Fonts {
  const root = getComputedStyle(document.documentElement);
  const sans = root.getPropertyValue("--font-archivo").trim() || getComputedStyle(document.body).fontFamily;
  const serif = root.getPropertyValue("--font-instrument").trim() || "serif";
  return { sans, serif };
}

function splitLines(text: string, max: number) {
  if (text.length <= max) return [text];
  const words = text.split(" ");
  let best = [text];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const diff = Math.abs(a.length - b.length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = [a, b];
    }
  }
  return best;
}

type TextTex = { texture: THREE.CanvasTexture; aspect: number };
type TextReq = [text: string, type: "sans" | "serif", px: number, maxChars: number];
const textKey = (r: TextReq) => r.join("|");
const QUOTE = "“";

function textTexture(
  text: string,
  type: "sans" | "serif",
  fonts: Fonts,
  px: number,
  maxChars: number,
): TextTex {
  const sans = type === "sans";
  const lines = splitLines(sans ? text.toUpperCase() : text, maxChars);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const setup = () => {
    ctx.font = sans ? `800 ${px}px ${fonts.sans}` : `italic 400 ${px * 1.12}px ${fonts.serif}`;
    if (sans && "fontStretch" in ctx) ctx.fontStretch = "condensed";
    if ("letterSpacing" in ctx) ctx.letterSpacing = sans ? `${-0.03 * px}px` : `${-0.02 * px}px`;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "alphabetic";
  };
  setup();
  const lineH = px * (sans ? 0.86 : 0.95);
  const pad = Math.round(px * 0.3);
  const width = Math.max(...lines.map((l) => ctx.measureText(l).width));
  canvas.width = Math.ceil(width + pad * 2);
  canvas.height = Math.ceil(lineH * (lines.length - 1) + px * 1.02 + pad * 2);
  setup(); // resizing resets context state
  lines.forEach((l, i) => ctx.fillText(l, pad, pad + px * 0.8 + i * lineH));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  return { texture, aspect: canvas.width / canvas.height };
}

// ───────────────────────── Plane ─────────────────────────

type PlaneSpec = {
  key: string;
  tex: THREE.Texture;
  isText: boolean;
  color?: THREE.ColorRepresentation;
  position: [number, number, number];
  width: number;
  aspect: number;
  rotationY?: number;
  baseOpacity?: number;
  extraBlur?: number;
  reveal?: boolean;
  reflect?: boolean;
  floorY?: number;
  drift?: number;
  /** World z for fog / focus when the plane lives inside a moving group */
  worldZ?: number;
  /** Distance band over which the plane dissolves before reaching the lens */
  nearFade?: [number, number];
};

function makeMaterial(spec: PlaneSpec, shared?: Record<string, THREE.IUniform>) {
  const uniforms = shared ?? {
    uTex: { value: spec.tex },
    uColor: { value: new THREE.Color(spec.color ?? "#ede8df") },
    uOpacity: { value: 0 },
    uBlur: { value: 0 },
    uReveal: { value: spec.reveal ? 0 : 1 },
    uIsText: { value: spec.isText ? 1 : 0 },
    uBend: { value: 0 },
  };
  return new THREE.ShaderMaterial({
    vertexShader: planeVertex,
    fragmentShader: planeFragment,
    uniforms: { ...uniforms, uReflect: { value: shared ? 1 : 0 } },
    transparent: true,
    depthWrite: false,
    side: shared ? THREE.DoubleSide : THREE.FrontSide,
  });
}

function Plane({ spec, geometry }: { spec: PlaneSpec; geometry: THREE.PlaneGeometry }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mirror = useRef<THREE.Mesh>(null);
  const { material, reflection } = useMemo(() => {
    const m = makeMaterial(spec);
    // The reflection shares the same uniform objects, so one write drives both.
    const r = spec.reflect ? makeMaterial(spec, m.uniforms) : null;
    return { material: m, reflection: r };
  }, [spec]);
  useEffect(
    () => () => {
      material.dispose();
      reflection?.dispose();
    },
    [material, reflection],
  );

  const height = spec.width / spec.aspect;
  const seed = useMemo(() => (spec.position[0] * 13.1 + spec.position[2] * 7.7) % 6.28, [spec]);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const u = (m.material as THREE.ShaderMaterial).uniforms;
    const dist = state.camera.position.z - (spec.worldZ ?? spec.position[2]);
    const fog = 1 - THREE.MathUtils.smoothstep(dist, 18, FAR);
    const [n0, n1] = spec.nearFade ?? [0.9, 3.6];
    const near = THREE.MathUtils.smoothstep(dist, n0, n1);
    u.uOpacity.value = fog * near * (spec.baseOpacity ?? 1);
    u.uBlur.value = Math.min(4, Math.abs(dist - VIEW) * 0.32 + (spec.extraBlur ?? 0));
    if (spec.reveal) u.uReveal.value = 1 - THREE.MathUtils.smoothstep(dist, 9.5, 17);
    // A whisper of paper-like flex with speed — clamped so type never warps.
    const bend = spec.isText ? 0 : THREE.MathUtils.clamp(scrollState.velocity * 0.004, -0.18, 0.18);
    u.uBend.value += (bend - u.uBend.value) * 0.1;
    const visible = u.uOpacity.value > 0.003;
    m.visible = visible;
    const t = state.clock.elapsedTime;
    m.position.y = spec.position[1] + Math.sin(t * 0.32 + seed) * (spec.drift ?? 0.05);
    if (mirror.current) {
      mirror.current.visible = visible;
      mirror.current.position.y = 2 * (spec.floorY ?? -2) - m.position.y;
    }
  });

  return (
    <>
      <mesh
        ref={mesh}
        geometry={geometry}
        material={material}
        position={spec.position}
        rotation={[0, spec.rotationY ?? 0, 0]}
        scale={[spec.width, height, 1]}
      />
      {reflection && (
        <mesh
          ref={mirror}
          geometry={geometry}
          material={reflection}
          position={[spec.position[0], 2 * (spec.floorY ?? -2) - spec.position[1], spec.position[2]]}
          rotation={[0, spec.rotationY ?? 0, 0]}
          scale={[spec.width, -height, 1]}
        />
      )}
    </>
  );
}

// ───────────────────────── Beams + dust ─────────────────────────

function Beam({ position, scale, geometry }: { position: [number, number, number]; scale: [number, number]; geometry: THREE.PlaneGeometry }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: planeVertex,
        fragmentShader: beamFragment,
        uniforms: { uOpacity: { value: 0 }, uBend: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );
  useEffect(() => () => material.dispose(), [material]);
  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const dist = state.camera.position.z - position[2];
    const o = (1 - THREE.MathUtils.smoothstep(dist, 14, 30)) * THREE.MathUtils.smoothstep(dist, 2, 6) * 0.16;
    (m.material as THREE.ShaderMaterial).uniforms.uOpacity.value = o;
    m.visible = o > 0.002;
  });
  return <mesh ref={mesh} geometry={geometry} material={material} position={position} scale={[scale[0], scale[1], 1]} />;
}

function Dust({ count, zStart, zEnd, width }: { count: number; zStart: number; zEnd: number; width: number }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    // Deterministic scatter (no Math.random in render).
    for (let i = 0; i < count; i++) {
      const r1 = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const r2 = (Math.sin(i * 78.233) * 12345.6789) % 1;
      const r3 = (Math.sin(i * 39.425) * 24634.6345) % 1;
      pos[i * 3] = r1 * width;
      pos[i * 3 + 1] = r2 * 3.5;
      pos[i * 3 + 2] = zEnd + Math.abs(r3) * (zStart - zEnd);
      seed[i] = Math.abs((Math.sin(i * 4.1414) * 9876.54321) % 1);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count, zStart, zEnd, width]);
  const dpr = useThree((s) => s.viewport.dpr);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dustVertex,
        fragmentShader: dustFragment,
        uniforms: { uTime: { value: 0 }, uScale: { value: 40 * dpr }, uCamZ: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [dpr],
  );
  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );
  useFrame((state) => {
    const p = points.current;
    if (p) (p.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
  });
  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}

// ───────────────────────── Press ring ─────────────────────────

function PressRing({ specs, z, geometry, spin }: { specs: PlaneSpec[]; z: number; geometry: THREE.PlaneGeometry; spin: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.z = spin
      ? -(galleryState.u * 0.55) - state.clock.elapsedTime * 0.025
      : Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    // Keep each name upright as the ring turns.
    g.children.forEach((c) => (c.rotation.z = -g.rotation.z));
  });
  return (
    <group ref={group} position={[0, 0.15, z]}>
      {specs.map((s) => (
        <Plane key={s.key} spec={s} geometry={geometry} />
      ))}
    </group>
  );
}

// ───────────────────────── Camera ─────────────────────────

function Rig({ count, ringZ, compact }: { count: number; ringZ: number; compact: boolean }) {
  const look = useRef(new THREE.Vector3());
  const pointer = useRef({ x: 0, y: 0 });
  const startZ = stationZ(0) + VIEW + 13;

  useFrame((state, delta) => {
    const cam = state.camera;
    const u = galleryState.u;
    // Camera z along the journey (u = i + 1 → in front of station i).
    let z: number;
    if (u <= 1) z = THREE.MathUtils.lerp(startZ, stationZ(0) + VIEW, u);
    else if (u <= count) {
      const i = Math.floor(u - 1);
      z = THREE.MathUtils.lerp(stationZ(i) + VIEW, stationZ(Math.min(i + 1, count - 1)) + VIEW, u - 1 - i);
    } else z = THREE.MathUtils.lerp(stationZ(count - 1) + VIEW, ringZ + (compact ? 7 : 8.5), Math.min(1, u - count));

    const k = 1 - Math.exp(-delta * 5);
    cam.position.z += (z - cam.position.z) * k;
    pointer.current.x += (scrollState.pointerX - pointer.current.x) * k * 0.5;
    pointer.current.y += (scrollState.pointerY - pointer.current.y) * k * 0.5;

    // Lean gently toward whichever side the current name sits on.
    const nearest = Math.round(Math.min(Math.max(u - 1, 0), count - 1));
    const lean = u > 0.5 && u < count + 0.5 ? (nearest % 2 === 0 ? -1 : 1) * (compact ? 0 : 0.35) : 0;
    const tx = lean + pointer.current.x * 0.35;
    cam.position.x += (tx - cam.position.x) * k * 0.6;
    cam.position.y = 0.1 + pointer.current.y * 0.2;
    look.current.set(cam.position.x * 0.4 - pointer.current.x * 0.4, -0.05, cam.position.z - 10);
    cam.lookAt(look.current);
    cam.rotation.z += scrollState.velocity * -0.0005;
  });
  return null;
}

// ───────────────────────── Scene ─────────────────────────

function Scene({
  items,
  ambient,
  press,
  compact,
}: {
  items: GalleryItem[];
  ambient: string[];
  press: string[];
  compact: boolean;
}) {
  const imageSrcs = useMemo(() => items.filter((i) => i.image).map((i) => i.image!), [items]);
  const images = useLoader(THREE.TextureLoader, imageSrcs);
  const gl = useThree((s) => s.gl);
  const viewAspect = useThree((s) => s.size.width / s.size.height);
  // Horizontal layout scale: compositions are authored for ~16:10.
  const wf = compact ? 1 : Math.min(1.15, Math.max(0.62, viewAspect / 1.6));
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 12, 1), []);
  const [type, setType] = useState<Map<string, TextTex> | null>(null);

  // Rasterise every name once the page's own webfonts are available —
  // one name per idle slice, so building the gallery never blocks a frame.
  useEffect(() => {
    let alive = true;
    const f = readFonts();
    const requests: TextReq[] = [
      ...items.map((i): TextReq => [i.name, i.type, 180, i.type === "sans" ? 13 : 16]),
      [QUOTE, "serif", 420, 4],
      ...ambient.map((n, k): TextReq => [n, k % 3 === 1 ? "serif" : "sans", 110, 16]),
      ...press.map((n, k): TextReq => [n, k % 2 ? "serif" : "sans", 150, 20]),
    ];
    const map = new Map<string, TextTex>();
    const idle = (cb: () => void) =>
      window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 500 }) : window.setTimeout(cb, 16);
    const step = () => {
      if (!alive) return;
      const r = requests.shift();
      if (!r) return setType(map);
      map.set(textKey(r), textTexture(r[0], r[1], f, r[2], r[3]));
      idle(step);
    };
    Promise.all([document.fonts.load(`800 100px ${f.sans}`), document.fonts.load(`italic 400 100px ${f.serif}`)])
      .catch(() => {})
      .then(() => idle(step));
    return () => {
      alive = false;
      map.forEach((t) => t.texture.dispose());
    };
  }, [items, ambient, press]);

  useEffect(() => {
    images.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
      t.needsUpdate = true;
    });
  }, [images, gl]);

  const ringZ = stationZ(items.length - 1) - 22;

  const layout = useMemo(() => {
    if (!type) return null;
    const tt = (text: string, t: "sans" | "serif", px: number, max: number) => type.get(textKey([text, t, px, max]))!;
    const planes: PlaneSpec[] = [];
    const beams: { position: [number, number, number]; scale: [number, number] }[] = [];
    let imageIndex = 0;

    items.forEach((item, i) => {
      const z = stationZ(i);
      // side: +1 → imagery right, name left (and vice versa)
      const side = i % 2 === 0 ? 1 : -1;
      const name = tt(item.name, item.type, 180, item.type === "sans" ? 13 : 16);
      const nameW = compact ? 2.4 : Math.min(4.6, 2.1 * name.aspect) * wf;
      planes.push({
        key: `name-${i}`,
        tex: name.texture,
        isText: true,
        position: compact ? [0, 1.15, z + 0.4] : [-side * 1.75 * wf, 0.9, z + 0.4],
        width: nameW,
        aspect: name.aspect,
        rotationY: compact ? 0 : side * 0.1,
        nearFade: [2.2, 5.5],
      });
      if (item.image) {
        const tex = images[imageIndex++];
        const img = tex.image as { width: number; height: number };
        const aspect = img.width / img.height;
        const h = compact ? Math.min(1.35, 2.3 / aspect) : (aspect > 1.5 ? 2.4 : 2.9) * Math.min(1, wf);
        planes.push({
          key: `img-${i}`,
          tex,
          isText: false,
          position: compact ? [0, -0.2, z - 0.9] : [side * 2.45 * wf, -0.25, z - 1.4],
          width: h * aspect * Math.min(1, wf),
          aspect,
          rotationY: compact ? 0 : -side * 0.14,
          reveal: true,
          reflect: true,
          floorY: compact ? -1.25 : -1.95,
          drift: 0.03,
        });
      }
      if (item.quote) {
        const q = tt(QUOTE, "serif", 420, 4);
        planes.push({
          key: `quote-${i}`,
          tex: q.texture,
          isText: true,
          color: "#ff4a1c",
          position: compact ? [0.75, 0.05, z - 1.2] : [side * 2.9 * wf, 0.35, z - 1.6],
          nearFade: [2.2, 5.5],
          width: compact ? 1.2 : 2.4,
          aspect: q.aspect,
          rotationY: compact ? 0 : -side * 0.14,
          drift: 0.08,
        });
      }
      beams.push({
        position: compact ? [0, 1.6, z - 2.6] : [side * 2.2 * wf, 1.7, z - 2.6],
        scale: compact ? [3, 6] : [4.6, 7.5],
      });
    });

    // Everyone else on the client list, drifting in the periphery.
    ambient.forEach((name, k) => {
      const t = tt(name, k % 3 === 1 ? "serif" : "sans", 110, 16);
      const side = k % 2 === 0 ? -1 : 1;
      const w = compact ? 1.5 : 2.2;
      planes.push({
        key: `amb-${k}`,
        tex: t.texture,
        isText: true,
        position: [
          side * (compact ? 1.5 + (k % 2) * 0.3 : (4.4 + (k % 3) * 0.7) * wf),
          ((k * 37) % 5) * 0.55 - 0.9,
          stationZ(0) - 5 - k * ((GAP * (items.length - 0.5)) / ambient.length),
        ],
        width: Math.min(w * 1.6, (w * t.aspect) / 3.2),
        aspect: t.aspect,
        rotationY: side * -0.35,
        baseOpacity: 0.32,
        extraBlur: 0.6,
        drift: 0.12,
      });
    });

    const ring: PlaneSpec[] = press.map((name, k) => {
      const t = tt(name, k % 2 ? "serif" : "sans", 150, 20);
      // Phones: a 2×2 grid above and below the centred copy; wide: a full ring.
      const a = (k / press.length) * Math.PI * 2 + 0.3;
      const grid: [number, number] = [k % 2 ? 0.62 : -0.62, (k < 4 ? 1 : -1) * (Math.floor((k % 4) / 2) ? 1.95 : 2.75)];
      const r = 3.3 * Math.min(1, wf);
      const w = (compact ? 0.36 : 0.82) * t.aspect;
      return {
        key: `press-${k}`,
        tex: t.texture,
        isText: true,
        position: compact ? [grid[0], grid[1], 0] : [Math.cos(a) * r * 1.2, Math.sin(a) * r * 0.64, 0],
        width: Math.min(w, compact ? 1.15 : 3),
        aspect: t.aspect,
        color: k % 2 ? "#ff4a1c" : "#ede8df",
        worldZ: ringZ,
      };
    });

    return { planes, beams, ring };
  }, [type, items, ambient, press, images, compact, ringZ, wf]);

  // Pre-warm off the scroll path: compile every program and upload every
  // texture in idle time, so entering the pin costs nothing.
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    if (!layout) return;
    let alive = true;
    let id = 0;
    const idle = (cb: () => void) =>
      (id = window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 1500 }) : window.setTimeout(cb, 50));
    // Parallel (non-blocking) shader compile where supported, then one
    // texture upload per idle slice.
    const uploads: THREE.Texture[] = [...(type ? [...type.values()].map((t) => t.texture) : []), ...images];
    const upload = () => {
      const t = uploads.shift();
      if (!alive || !t) return;
      gl.initTexture(t);
      idle(upload);
    };
    idle(() => {
      if (!alive) return;
      gl.compileAsync(scene, camera).then(() => alive && idle(upload), () => alive && idle(upload));
    });
    return () => {
      alive = false;
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      clearTimeout(id);
    };
  }, [layout, type, gl, scene, camera, images]);

  useEffect(
    () => () => {
      geometry.dispose();
      images.forEach((t) => t.dispose());
    },
    [geometry, images],
  );

  if (!layout) return null;

  return (
    <>
      <Rig count={items.length} ringZ={ringZ} compact={compact} />
      {layout.beams.map((b, i) => (
        <Beam key={i} position={b.position} scale={b.scale} geometry={geometry} />
      ))}
      {layout.planes.map((s) => (
        <Plane key={s.key} spec={s} geometry={geometry} />
      ))}
      <PressRing specs={layout.ring} z={ringZ} geometry={geometry} spin={!compact} />
      <Dust
        count={compact ? 260 : 520}
        zStart={stationZ(0) + VIEW + 14}
        zEnd={ringZ - 6}
        width={compact ? 4 : 9}
      />
    </>
  );
}

export default function BrandGallery({
  items,
  ambient,
  press,
  active,
  compact,
  onReady,
}: {
  items: GalleryItem[];
  ambient: string[];
  press: string[];
  active: boolean;
  compact: boolean;
  onReady?: () => void;
}) {
  const [dpr] = useState(() => Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5));
  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance", stencil: false }}
      camera={{ fov: compact ? 52 : 40, near: 0.1, far: 80, position: [0, 0.1, stationZ(0) + VIEW + 13] }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x0e0d0b, 1);
        onReady?.();
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene items={items} ambient={ambient} press={press} compact={compact} />
      </Suspense>
    </Canvas>
  );
}
