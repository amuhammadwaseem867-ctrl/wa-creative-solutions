"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

export type SceneInput = {
  /** Normalised pointer position, -1..1 */
  pointer: MutableRefObject<{ x: number; y: number }>;
  /** Hero scroll progress, 0 (top) .. 1 (hero scrolled away) */
  scroll: MutableRefObject<number>;
};

type Props = SceneInput & {
  quality: "high" | "low";
  animate: boolean;
  active: boolean;
  onReady: () => void;
};

/*
 * A sphere of light-points lit like the hero: a warm ember key light from directly above
 * (matching the CSS light cone) and a cool silver fill from below-front. Lighting is computed
 * in world space, so the light stays put while the sphere turns.
 */
const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uIntro;
uniform float uScatter;
uniform float uSize;
uniform float uPixelRatio;
attribute float aSeed;
attribute float aSize;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 dir = normalize(position);
  float r = length(position);

  // The shell breathes very slightly, so the surface shimmers rather than sitting still.
  float wave = sin(uTime * 0.7 + aSeed * 6.2831 + dir.y * 4.0) * 0.012;
  vec3 p = dir * (r + wave);

  // Entrance: points converge from a wide cloud, staggered by seed.
  float t = clamp(uIntro * 1.3 - aSeed * 0.3, 0.0, 1.0);
  float e = 1.0 - pow(1.0 - t, 3.0);
  vec3 from = dir * (2.4 + aSeed * 2.6) + vec3(0.0, 1.2 * (aSeed - 0.5), 0.0);
  p = mix(from, p, e);

  // Scrolling away disperses the sphere.
  p *= 1.0 + uScatter * (0.2 + aSeed * 1.2);

  vec4 mv = viewMatrix * modelMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  vec3 n = normalize(mat3(modelMatrix) * dir);
  float key = smoothstep(-0.12, 0.95, n.y);
  float hot = pow(max(n.y, 0.0), 7.0);
  float fill = smoothstep(0.0, 0.95, -n.y * 0.85 + n.z * 0.3);
  float facing = mix(0.3, 1.0, smoothstep(-0.9, 0.6, n.z));

  vec3 ember = mix(vec3(0.95, 0.16, 0.08), vec3(1.0, 0.56, 0.22), key);
  vec3 col = ember * key * 1.75 + vec3(1.0, 0.9, 0.72) * hot * 1.8 + vec3(0.88, 0.9, 0.95) * fill * 1.3 + 0.05;

  float twinkle = 0.62 + 0.38 * sin(uTime * (1.1 + aSeed * 2.4) + aSeed * 50.0);
  float spark = step(0.94, aSeed) * pow(max(0.0, sin(uTime * 1.9 + aSeed * 90.0)), 14.0) * 1.6;

  vColor = col * (twinkle + spark) * facing;
  vAlpha = e * (1.0 - uScatter * 0.65);
  gl_PointSize = uSize * aSize * uPixelRatio * (1.0 + spark * 0.5) / -mv.z;
}
`;

const FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  a *= a * vAlpha;
  // Premultiplied output for additive blending onto a transparent canvas.
  gl_FragColor = vec4(vColor * a, a);
}
`;

/** Mostly a thin shell, with a little interior volume and some stray dust outside it. */
function buildGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  // Deterministic PRNG so the sphere looks identical on every load (and in the static poster).
  let s = 1337;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < count; i++) {
    const z = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const ring = Math.sqrt(1 - z * z);
    const pick = rand();
    const r = pick < 0.86 ? 1 + (rand() - 0.5) * 0.05 : pick < 0.95 ? 0.62 + rand() * 0.36 : 1.04 + rand() * 0.3;
    positions[i * 3] = ring * Math.cos(phi) * r;
    positions[i * 3 + 1] = z * r;
    positions[i * 3 + 2] = ring * Math.sin(phi) * r;
    seeds[i] = rand();
    sizes[i] = 0.55 + Math.pow(rand(), 3) * 1.25;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  return g;
}

function Sphere({ pointer, scroll, quality, animate }: SceneInput & { quality: Props["quality"]; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const dpr = useThree((st) => st.viewport.dpr);
  // Per-frame shader inputs live in a ref so they can be mutated in the render loop.
  const uniforms = useRef({
    uTime: { value: 4 },
    uIntro: { value: animate ? 0 : 1 },
    uScatter: { value: 0 },
    uSize: { value: quality === "high" ? 11 : 14 },
    uPixelRatio: { value: 1 },
  });

  const geometry = useMemo(() => buildGeometry(quality === "high" ? 36000 : 12000), [quality]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor,
    });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms.current);
    };
    return m;
  }, []);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const u = uniforms.current;
    u.uPixelRatio.value = dpr;
    if (!animate) {
      u.uIntro.value = 1;
      g.rotation.set(0.18, -0.6, 0);
      return;
    }
    const d = Math.min(delta, 1 / 20);
    const s = scroll.current;
    const p = pointer.current;
    u.uTime.value += d;
    u.uIntro.value = Math.min(1, u.uIntro.value + Math.min(delta, 0.1) / 2.6);
    u.uScatter.value = THREE.MathUtils.damp(u.uScatter.value, s, 4, d);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.clock.elapsedTime * 0.07 + p.x * 0.35, 2.5, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.18 - p.y * 0.2, 2.5, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, s * 0.6, 3, d);
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

export default function ParticleSphere({ pointer, scroll, quality, animate, active, onReady }: Props) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 2] : [1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true, premultipliedAlpha: true }}
      camera={{ position: [0, 0, 5.2], fov: 35 }}
      frameloop={!active ? "never" : animate ? "always" : "demand"}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
        gl.setClearColor(0x000000, 0);
      }}
      aria-hidden
    >
      <Sphere pointer={pointer} scroll={scroll} quality={quality} animate={animate} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
