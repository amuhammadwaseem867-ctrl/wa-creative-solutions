/**
 * Shared three.js "photo studio" for portfolio CGI boards.
 *
 * Usage inside a board (ES module, with the import map from README.md):
 *
 *   import * as THREE from "three";
 *   import { createStudio, roundedBox, phone, done } from "/design/portfolio/_lib/studio.js";
 *   const s = createStudio({ background: "#0d0d0f" });
 *   s.scene.add(roundedBox(2, 1, 0.2, 0.05, new THREE.MeshPhysicalMaterial({ color: "#ddd" })));
 *   s.camera.position.set(0, 1.5, 6); s.camera.lookAt(0, 0, 0);
 *   done(s);            // renders the final frame and signals the renderer
 *
 * Everything is procedural: no HDR files or network access needed.
 */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

window.__ASYNC = true;

/**
 * Creates a full-viewport renderer, scene, camera, softbox environment and lights.
 * @param {object} o
 * @param {string} [o.background] scene background colour (CSS colour) or null for transparent
 * @param {number} [o.exposure] tone-mapping exposure
 * @param {number} [o.fov] camera field of view
 * @param {"soft"|"dramatic"|"bright"} [o.lighting] lighting preset
 * @param {string} [o.accent] optional coloured rim panel in the environment (CSS colour)
 * @param {number} [o.pixelRatio] supersampling factor (2 = crisp; slower)
 */
export function createStudio(o = {}) {
  const {
    background = "#0c0c0d",
    exposure = 1.0,
    fov = 30,
    lighting = "soft",
    accent = null,
    pixelRatio = 2,
    canvas = null,
  } = o;
  const width = window.innerWidth;
  const height = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas || undefined,
    antialias: true,
    alpha: background === null,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if (!canvas) {
    renderer.domElement.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;display:block";
    document.body.appendChild(renderer.domElement);
  }

  const scene = new THREE.Scene();
  if (background !== null) scene.background = new THREE.Color(background);
  scene.environment = studioEnvironment(renderer, { lighting, accent });

  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.05, 200);
  camera.position.set(0, 1.2, 6);
  camera.lookAt(0, 0, 0);

  // Key + fill lights (the environment provides reflections; these add shape and shadows).
  const key = new THREE.DirectionalLight("#ffffff", lighting === "dramatic" ? 2.6 : lighting === "bright" ? 2.0 : 1.6);
  key.position.set(4, 7, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 30;
  key.shadow.radius = 6;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const fill = new THREE.DirectionalLight("#ffffff", lighting === "dramatic" ? 0.25 : 0.6);
  fill.position.set(-5, 3, 2);
  scene.add(fill);
  const ambient = new THREE.HemisphereLight("#ffffff", "#202020", lighting === "bright" ? 0.6 : 0.25);
  scene.add(ambient);

  return {
    THREE,
    renderer,
    scene,
    camera,
    lights: { key, fill, ambient },
    /** Adds an invisible floor that only receives shadows. */
    shadowCatcher({ y = 0, opacity = 0.35, size = 40 } = {}) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.ShadowMaterial({ opacity }));
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = y;
      plane.receiveShadow = true;
      scene.add(plane);
      return plane;
    },
    /**
     * Adds a seamless photo-studio sweep ("cyc"): floor that curves smoothly up into a back wall.
     * @param {object} o color, y (floor height), radius (curve radius), back (z distance behind the origin where the floor starts curving up; keep it behind your subject)
     */
    cyclorama({ color = "#e9e6e1", y = 0, radius = 4, back = 6, roughness = 0.92 } = {}) {
      const width = 80;
      const floorLen = 40; // towards the camera from the curve start
      const wallH = 40;
      const segs = 160;
      const total = floorLen + (Math.PI / 2) * radius + wallH;
      const geo = new THREE.PlaneGeometry(width, total, 1, segs);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        // v runs 0..total from the front edge of the floor to the top of the wall
        const v = (pos.getY(i) + total / 2);
        let py;
        let pz;
        if (v <= floorLen) {
          py = y;
          pz = -back + (floorLen - v);
        } else if (v <= floorLen + (Math.PI / 2) * radius) {
          const a = (v - floorLen) / radius;
          py = y + radius - Math.cos(a) * radius;
          pz = -back - Math.sin(a) * radius;
        } else {
          py = y + radius + (v - floorLen - (Math.PI / 2) * radius);
          pz = -back - radius;
        }
        pos.setXYZ(i, pos.getX(i), py, pz);
      }
      geo.computeVertexNormals();
      const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, side: THREE.DoubleSide });
      const sweep = new THREE.Mesh(geo, mat);
      sweep.receiveShadow = true;
      scene.add(sweep);
      return sweep;
    },
    render() {
      renderer.render(scene, camera);
    },
  };
}

/** Procedural softbox environment for realistic reflections. */
export function studioEnvironment(renderer, { lighting = "soft", accent = null } = {}) {
  const room = new THREE.Scene();
  room.background = new THREE.Color(lighting === "bright" ? "#3a3a3a" : "#070707");
  const panel = (w, h, color, intensity, pos, rot) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide }),
    );
    m.position.set(...pos);
    m.rotation.set(...rot);
    room.add(m);
  };
  const k = lighting === "dramatic" ? 1.4 : lighting === "bright" ? 1.1 : 1;
  panel(7, 1.6, "#ffffff", 3 * k, [0, 4.6, 0.5], [Math.PI / 2, 0, 0]); // overhead strip
  panel(1.4, 7, "#ffffff", 1.8 * k, [-5, 0.5, 1], [0, Math.PI / 2, 0]); // left strip
  panel(4, 4, "#ffffff", lighting === "dramatic" ? 0.35 : 0.9, [4.5, 1, 3], [0, -Math.PI / 3, 0]); // fill box
  panel(10, 1.2, "#ffffff", 0.3, [0, -4, 0], [-Math.PI / 2, 0, 0]); // floor bounce
  if (accent) panel(0.4, 6, accent, 3, [4.8, 0, -2.5], [0, -Math.PI / 4, 0]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(room, 0.02).texture;
  pmrem.dispose();
  return tex;
}

/** Rounded box mesh (casts and receives shadows). */
export function roundedBox(w, h, d, radius, material, segments = 6) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, segments, radius), material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Flat rounded-rectangle geometry with UVs normalised to 0..1 (for screens and labels). */
export function roundedRectGeometry(w, h, r, segments = 12) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, segments);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - x) / w, (pos.getY(i) - y) / h);
  uv.needsUpdate = true;
  return g;
}

/** Loads an image (e.g. an earlier rendered board under /public/...) as an sRGB texture. */
export function loadTexture(url, { anisotropy = 8 } = {}) {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = anisotropy;
        resolve(t);
      },
      undefined,
      reject,
    );
  });
}

/**
 * Draws onto a 2D canvas and returns it as a texture.
 * Wait for fonts first (`await document.fonts.ready`) if the drawing uses web fonts.
 */
export function canvasTexture(width, height, draw) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");
  draw(ctx, width, height);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Screen material: shows a texture at true colour (not affected by lighting/tone mapping). */
export function screenMaterial(texture) {
  return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
}

/**
 * Smartphone mockup (≈ 0.75 × 1.6 units), screen facing +Z. Returns a Group.
 * @param {THREE.Texture} screenTexture portrait texture (e.g. a 390x844 UI render)
 */
export function phone(screenTexture, { frameColor = "#1b1b1d", metalness = 0.6 } = {}) {
  const g = new THREE.Group();
  const w = 0.78;
  const h = 1.62;
  const body = roundedBox(w, h, 0.085, 0.11, new THREE.MeshPhysicalMaterial({ color: frameColor, metalness, roughness: 0.35, clearcoat: 1 }));
  g.add(body);
  const glass = new THREE.Mesh(roundedRectGeometry(w - 0.03, h - 0.03, 0.1), new THREE.MeshPhysicalMaterial({ color: "#050505", roughness: 0.08, clearcoat: 1 }));
  glass.position.z = 0.0435;
  g.add(glass);
  if (screenTexture) {
    const screen = new THREE.Mesh(roundedRectGeometry(w - 0.07, h - 0.07, 0.085), screenMaterial(screenTexture));
    screen.position.z = 0.0445;
    g.add(screen);
  }
  return g;
}

/**
 * Laptop mockup (≈ 3.2 units wide), opened at `angle` radians. Returns a Group whose origin is the hinge.
 * @param {THREE.Texture} screenTexture 16:10 texture (e.g. a 1600x1000 UI render)
 */
export function laptop(screenTexture, { color = "#b9babd", angle = 1.9 } = {}) {
  const g = new THREE.Group();
  const metal = new THREE.MeshPhysicalMaterial({ color, metalness: 0.85, roughness: 0.32 });
  const base = roundedBox(3.2, 0.08, 2.2, 0.04, metal);
  base.position.set(0, 0.04, 1.1);
  g.add(base);
  // Keyboard well + trackpad
  const well = new THREE.Mesh(roundedRectGeometry(2.7, 0.95, 0.04), new THREE.MeshStandardMaterial({ color: "#2b2b2e", roughness: 0.7 }));
  well.rotation.x = -Math.PI / 2;
  well.position.set(0, 0.0815, 0.62);
  g.add(well);
  const keys = new THREE.Group();
  const keyMat = new THREE.MeshStandardMaterial({ color: "#161618", roughness: 0.55 });
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 14; c++) {
      const k = new THREE.Mesh(roundedRectGeometry(0.165, 0.15, 0.02), keyMat);
      k.rotation.x = -Math.PI / 2;
      k.position.set(-1.235 + c * 0.19, 0.0825, 0.25 + r * 0.18);
      keys.add(k);
    }
  }
  g.add(keys);
  const pad = new THREE.Mesh(roundedRectGeometry(1.1, 0.68, 0.05), new THREE.MeshPhysicalMaterial({ color, metalness: 0.7, roughness: 0.45 }));
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(0, 0.0815, 1.6);
  g.add(pad);
  const lid = new THREE.Group();
  lid.rotation.x = -(angle - Math.PI / 2);
  const shell = roundedBox(3.2, 2.1, 0.05, 0.04, metal);
  shell.position.set(0, 1.05, -0.025);
  lid.add(shell);
  const bezel = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 2.0), new THREE.MeshPhysicalMaterial({ color: "#060606", roughness: 0.1, clearcoat: 1 }));
  bezel.position.set(0, 1.05, 0.001);
  lid.add(bezel);
  if (screenTexture) {
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.96, 1.85), screenMaterial(screenTexture));
    screen.position.set(0, 1.07, 0.002);
    lid.add(screen);
  }
  g.add(lid);
  return g;
}

/**
 * Printed sheet / card / box face with a texture on the front (+Z) face.
 * Use for business cards, letterheads, book covers, packaging fronts.
 */
export function printed(w, h, thickness, frontTexture, { edgeColor = "#f2f0eb", roughness = 0.75, backTexture = null } = {}) {
  const edge = new THREE.MeshStandardMaterial({ color: edgeColor, roughness });
  const front = frontTexture ? new THREE.MeshStandardMaterial({ map: frontTexture, roughness }) : edge;
  const back = backTexture ? new THREE.MeshStandardMaterial({ map: backTexture, roughness }) : edge;
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, thickness), [edge, edge, edge, edge, front, back]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Renders the final frame and tells the board renderer the image is ready. */
export function done(studio) {
  studio.render();
  requestAnimationFrame(() => {
    studio.render();
    window.__READY = true;
  });
}
