"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

/**
 * The hero "media field": real campaign stills and reel frames suspended
 * in a spiral tunnel. Scrolling dollies the camera through them — the
 * visitor literally travels through the work before reading about it.
 *
 * Perf notes:
 *  - one shared geometry, one material instance per plane (12 draw calls)
 *  - no React state updates per frame; everything reads scrollState refs
 *  - DPR clamped, antialias off (planes are photographic, edges are soft)
 *  - frameloop paused by the parent when the hero is off-screen
 */

export type MediaItem = { src: string; aspect: number };

const vertex = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // Velocity bend: planes bow like paper caught in air.
    p.z += sin(uv.x * 3.14159) * uBend;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uOpacity;
  uniform float uShift;
  uniform float uMono;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    // Chromatic split scales with scroll energy — subtle, never constant.
    float r = texture2D(uTex, uv + vec2(uShift, 0.0)).r;
    vec2 gb = texture2D(uTex, uv).gb;
    float b = texture2D(uTex, uv - vec2(uShift, 0.0)).b;
    vec3 col = vec3(r, gb.x, b);
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(lum) * vec3(1.02, 0.98, 0.92), uMono);
    // Warm crush toward ink so type on top always reads.
    col = mix(vec3(0.055, 0.05, 0.043), col, 0.78);
    // Soft frame vignette
    vec2 d = abs(uv - 0.5) * 2.0;
    float edge = 1.0 - smoothstep(0.86, 1.0, max(d.x, d.y));
    gl_FragColor = vec4(col, uOpacity * edge);
  }
`;

type PlaneDef = {
  index: number;
  position: [number, number, number];
  rotationZ: number;
  height: number;
  aspect: number;
};

const TUNNEL_DEPTH = 36;
const CAMERA_START = 6;

function layout(items: MediaItem[], compact: boolean): PlaneDef[] {
  const count = items.length;
  return items.map((item, i) => {
    // Golden-angle spiral keeps planes evenly scattered around the axis
    // so the central column (where the type sits) stays mostly clear.
    const angle = i * 2.39996 + 0.6;
    const radius = (compact ? 1.9 : 2.6) + (i % 3) * 0.45;
    const z = -1.5 - (i / count) * TUNNEL_DEPTH;
    return {
      index: i,
      position: [Math.cos(angle) * radius * 1.35, Math.sin(angle) * radius * 0.75, z],
      rotationZ: (Math.sin(i * 12.9898) * 0.5) * 0.12,
      height: item.aspect > 2 ? 1.25 : 1.7,
      aspect: item.aspect,
    };
  });
}

function Plane({
  def,
  texture,
  geometry,
}: {
  def: PlaneDef;
  texture: THREE.Texture;
  geometry: THREE.PlaneGeometry;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  // Material is created imperatively so the uniform objects we mutate per
  // frame are the exact ones the GPU program reads (no prop cloning).
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uTex: { value: texture },
          uOpacity: { value: 0 },
          uShift: { value: 0 },
          uMono: { value: 0.35 },
          uBend: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
      }),
    [texture],
  );
  useEffect(() => () => material.dispose(), [material]);
  const reveal = useRef(0);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const uniforms = (m.material as THREE.ShaderMaterial).uniforms;
    const camZ = state.camera.position.z;
    const dist = camZ - def.position[2];
    // Fade in from the fog, fade out just before the plane passes the lens.
    const far = 1 - THREE.MathUtils.smoothstep(dist, 12, 26);
    const near = THREE.MathUtils.smoothstep(dist, 0.6, 2.6);
    reveal.current = Math.min(1, reveal.current + delta * 0.6);
    uniforms.uOpacity.value = far * near * reveal.current;
    uniforms.uMono.value = THREE.MathUtils.lerp(0.15, 0.85, THREE.MathUtils.smoothstep(dist, 4, 18));
    uniforms.uShift.value = scrollState.energy * 0.006;
    uniforms.uBend.value = THREE.MathUtils.lerp(uniforms.uBend.value, scrollState.velocity * 0.012, 0.1);
    m.visible = uniforms.uOpacity.value > 0.002;
    // Idle breath
    const t = state.clock.elapsedTime;
    m.position.y = def.position[1] + Math.sin(t * 0.35 + def.index) * 0.06;
    m.rotation.y = Math.sin(t * 0.2 + def.index * 0.7) * 0.06;
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={def.position}
      rotation={[0, 0, def.rotationZ]}
      scale={[def.height * def.aspect, def.height, 1]}
      material={material}
    />
  );
}

function Rig() {
  const look = useRef(new THREE.Vector3(0, 0, -10));
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const camera = state.camera;
    const k = 1 - Math.exp(-delta * 3);
    pointer.current.x += (scrollState.pointerX - pointer.current.x) * k;
    pointer.current.y += (scrollState.pointerY - pointer.current.y) * k;

    const t = state.clock.elapsedTime;
    // Slow idle drift so the scene is alive before anyone scrolls.
    const idle = (Math.sin(t * 0.12) * 0.5 + 0.5) * 1.6;
    const dive = scrollState.hero * (TUNNEL_DEPTH * 0.62);
    const targetZ = CAMERA_START - idle - dive;
    camera.position.z += (targetZ - camera.position.z) * (1 - Math.exp(-delta * 4));
    camera.position.x = pointer.current.x * 0.45;
    camera.position.y = pointer.current.y * 0.3;

    look.current.set(pointer.current.x * -0.6, pointer.current.y * -0.4, camera.position.z - 10);
    camera.lookAt(look.current);
    camera.rotation.z = scrollState.velocity * -0.0009 + Math.sin(t * 0.1) * 0.01;
  });
  return null;
}

function Field({ items, compact }: { items: MediaItem[]; compact: boolean }) {
  const textures = useLoader(
    THREE.TextureLoader,
    items.map((i) => i.src),
  );
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 16, 1), []);
  const defs = useMemo(() => layout(items, compact), [items, compact]);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
      t.needsUpdate = true;
    });
    // Tell the preloader the opening frame's media is on the GPU.
    window.__bmHeroMedia = true;
    window.dispatchEvent(new Event("bm:hero-media"));
  }, [textures, gl]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      textures.forEach((t) => t.dispose());
    };
  }, [geometry, textures]);

  return (
    <>
      {defs.map((def) => (
        <Plane key={def.index} def={def} texture={textures[def.index]} geometry={geometry} />
      ))}
    </>
  );
}

export default function MediaField({
  items,
  active,
  compact,
  onReady,
}: {
  items: MediaItem[];
  active: boolean;
  compact: boolean;
  onReady?: () => void;
}) {
  const [dpr] = useState(() => Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5));
  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false }}
      camera={{ fov: 38, near: 0.1, far: 60, position: [0, 0, CAMERA_START] }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady?.();
      }}
      aria-hidden="true"
    >
      <Rig />
      <Suspense fallback={null}>
        <Field items={items} compact={compact} />
      </Suspense>
    </Canvas>
  );
}
