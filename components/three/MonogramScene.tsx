"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MONOGRAM_BAR, MONOGRAM_SHAPES, MONOGRAM_VIEWBOX, type Polygon } from "@/lib/brand";

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

const toShape = (poly: Polygon) => {
  const { width, height } = MONOGRAM_VIEWBOX;
  const s = new THREE.Shape();
  // Centre on origin and flip Y (SVG y-down → three y-up); scale to ~3 units wide.
  const k = 3 / width;
  poly.forEach(([x, y], i) => {
    const px = (x - width / 2) * k;
    const py = (height / 2 - y) * k;
    if (i === 0) s.moveTo(px, py);
    else s.lineTo(px, py);
  });
  s.closePath();
  return s;
};

/** Studio reflections generated procedurally — no HDR download needed. */
function Environment() {
  const gl = useThree((state) => state.gl);
  const env = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    return texture;
  }, [gl]);
  useEffect(() => () => env.dispose(), [env]);
  return <primitive object={env} attach="environment" />;
}

function Sculpture({ pointer, scroll, quality, animate }: SceneInput & { quality: Props["quality"]; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  const blades = useRef<THREE.Group>(null);

  const { body, bar } = useMemo(() => {
    const extrude: THREE.ExtrudeGeometryOptions = {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.022,
      bevelSegments: quality === "high" ? 4 : 1,
    };
    const body = new THREE.ExtrudeGeometry(Object.values(MONOGRAM_SHAPES).map(toShape), extrude);
    body.translate(0, 0, -0.21);
    const bar = new THREE.ExtrudeGeometry(toShape(MONOGRAM_BAR), { ...extrude, depth: 0.6 });
    bar.translate(0, 0, -0.3);
    return { body, bar };
  }, [quality]);

  useEffect(() => () => {
    body.dispose();
    bar.dispose();
  }, [body, bar]);

  const chrome = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e9e9ea", metalness: 1, roughness: 0.16, envMapIntensity: 1.25 }),
    [],
  );
  const red = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c81020", emissive: "#ff202d", emissiveIntensity: 0.32, metalness: 0, roughness: 0.62, envMapIntensity: 0.12 }),
    [],
  );
  const matte = useMemo(() => new THREE.MeshStandardMaterial({ color: "#121212", metalness: 0.15, roughness: 0.82 }), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const d = Math.min(delta, 1 / 20);

    // Reduced motion: a single composed pose, no pointer or scroll response.
    if (!animate) {
      g.rotation.set(0.08, -0.32, 0);
      return;
    }

    // Pointer tilt + a slow idle drift; scroll turns the object and lifts it away.
    const idle = Math.sin(t * 0.35) * 0.12;
    const targetY = -0.32 + pointer.current.x * 0.35 + idle + s * 1.1;
    const targetX = 0.08 - pointer.current.y * 0.22 + s * 0.25;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, Math.sin(t * 0.6) * 0.05 + s * 0.9, 4, d);
    const scale = 1 - s * 0.18;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, scale, 4, d));

    if (halo.current) halo.current.rotation.z = t * 0.05 + s * 0.8;
    if (blades.current) blades.current.rotation.z = -t * 0.03 - s * 0.4;
  });

  return (
    <group ref={group}>
      <mesh geometry={body} material={chrome} castShadow />
      <mesh geometry={bar} material={red} />

      {/* Matte architectural halo — faceted, not a glowing ring */}
      <mesh ref={halo} position={[0, 0, -0.9]} material={matte}>
        <torusGeometry args={[2.15, 0.07, quality === "high" ? 8 : 4, 8]} />
      </mesh>
      <group ref={blades} position={[0, 0, -1.3]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]} material={matte}>
            <boxGeometry args={[5.4, 0.035, 0.035]} />
          </mesh>
        ))}
      </group>
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

export default function MonogramScene({ pointer, scroll, quality, animate, active, onReady }: Props) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: quality === "high", powerPreference: "high-performance", alpha: true }}
      camera={{ position: [0, 0, 8.4], fov: 35 }}
      frameloop={!active ? "never" : animate ? "always" : "demand"}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden
    >
      <Environment />
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      {/* Controlled red illumination from behind-left */}
      <pointLight position={[-3, -1.5, -1.5]} intensity={28} color="#ff202d" distance={10} />
      <pointLight position={[2.5, 2, 2]} intensity={6} color="#ffffff" distance={10} />
      <Sculpture pointer={pointer} scroll={scroll} quality={quality} animate={animate} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
