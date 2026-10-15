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

/* Ashima Arts 3D simplex noise (MIT) — drives the liquid surface. */
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
vec3 liquid(vec3 p){
  float n = snoise(p * uFreq + vec3(0.0, uTime * 0.22, uTime * 0.12));
  n += 0.12 * snoise(p * uFreq * 2.1 - vec3(uTime * 0.15));
  return p + normalize(p) * n * uAmp;
}
`;

/**
 * Studio environment: black room with white softboxes, so the chrome reflects
 * controlled, graphic light rather than a generic HDR. (Red is deliberately
 * kept out of the reflections — the headline's difference blend would turn it cyan.)
 */
function StudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const env = useMemo(() => {
    const room = new THREE.Scene();
    room.background = new THREE.Color("#050505");
    const panel = (w: number, h: number, color: string, intensity: number, pos: [number, number, number], rot: [number, number, number]) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }),
      );
      m.position.set(...pos);
      m.rotation.set(...rot);
      room.add(m);
    };
    panel(6, 1.4, "#ffffff", 3, [0, 4.5, 1], [Math.PI / 2, 0, 0]); // key strip overhead
    panel(1.2, 7, "#ffffff", 1.6, [-5, 0, 1], [0, Math.PI / 2, 0]); // left rim
    panel(3.5, 3.5, "#ffffff", 0.7, [4, 1, 3], [0, -Math.PI / 3, 0]); // fill
    panel(8, 1, "#ffffff", 0.25, [0, -4, 0], [-Math.PI / 2, 0, 0]); // floor bounce
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(room, 0.02).texture;
    pmrem.dispose();
    room.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
    });
    return texture;
  }, [gl]);
  useEffect(() => () => env.dispose(), [env]);
  return <primitive object={env} attach="environment" />;
}

function LiquidForm({ pointer, scroll, quality, animate }: SceneInput & { quality: Props["quality"]; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  // Per-frame shader inputs live in a ref so they can be mutated in the render loop.
  const uniforms = useRef({ uTime: { value: 3.2 }, uAmp: { value: 0.17 }, uFreq: { value: 0.62 } });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.45, quality === "high" ? 56 : 24), [quality]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const material = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: "#e6e6e8",
      metalness: 1,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.15,
    });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms.current);
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\n${NOISE}`)
        .replace(
          "#include <beginnormal_vertex>",
          /* glsl */ `
          vec3 n0 = normalize(normal);
          vec3 t1 = normalize(abs(n0.y) > 0.99 ? cross(n0, vec3(1.0, 0.0, 0.0)) : cross(n0, vec3(0.0, 1.0, 0.0)));
          vec3 t2 = normalize(cross(n0, t1));
          float eps = 0.012;
          vec3 q0 = liquid(position);
          vec3 q1 = liquid(position + t1 * eps);
          vec3 q2 = liquid(position + t2 * eps);
          vec3 objectNormal = normalize(cross(q1 - q0, q2 - q0));
          #ifdef USE_TANGENT
            vec3 objectTangent = vec3(tangent.xyz);
          #endif`,
        )
        .replace("#include <begin_vertex>", "vec3 transformed = q0;");
    };
    return m;
  }, []);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (!animate) {
      g.rotation.set(0.2, -0.4, 0);
      return;
    }
    const d = Math.min(delta, 1 / 20);
    const s = scroll.current;
    const p = pointer.current;
    const u = uniforms.current;
    u.uTime.value += d * (1 + s * 1.5);
    // Pointer energy subtly excites the surface; scroll stretches the frequency.
    const energy = Math.min(1, Math.hypot(p.x, p.y));
    u.uAmp.value = THREE.MathUtils.damp(u.uAmp.value, 0.17 + energy * 0.06 + s * 0.08, 2, d);
    u.uFreq.value = THREE.MathUtils.damp(u.uFreq.value, 0.62 + s * 0.3, 2, d);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.clock.elapsedTime * 0.08 + p.x * 0.5 + s * 1.2, 2.5, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.15 - p.y * 0.35 + s * 0.4, 2.5, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, s * 1.4, 3, d);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, 1 - s * 0.25, 3, d));
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={material} />
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

export default function BlobScene({ pointer, scroll, quality, animate, active, onReady }: Props) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: quality === "high", powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 5.2], fov: 35 }}
      frameloop={!active ? "never" : animate ? "always" : "demand"}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
      aria-hidden
    >
      <StudioEnvironment />
      <LiquidForm pointer={pointer} scroll={scroll} quality={quality} animate={animate} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
