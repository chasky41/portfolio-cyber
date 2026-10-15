"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useApp } from "@/lib/app-context";

type Api = { setTheme: (t: "dark" | "light") => void };

/**
 * Topologie réseau 3D (nœuds + liens), réactive à la souris et au scroll.
 * Aucune ressource externe ; se désactive proprement sans WebGL.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<Api | null>(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // pas de WebGL : le fond CSS statique reste affiché
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);
    camera.position.z = 42;
    const group = new THREE.Group();
    scene.add(group);

    const N = mobile ? 70 : 140;
    const BOX = { x: 78, y: 48, z: 34 };
    const LINK = mobile ? 11 : 12.5;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    const kind = new Uint8Array(N); // 0 cyan, 1 bleu, 2 vert
    const nodeCol = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * BOX.x;
      pos[i * 3 + 1] = (Math.random() - 0.5) * BOX.y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * BOX.z;
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
      const r = Math.random();
      kind[i] = r < 0.82 ? 0 : r < 0.94 ? 1 : 2;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeCol, 3));
    const sc = document.createElement("canvas");
    sc.width = sc.height = 64;
    const sx = sc.getContext("2d");
    if (sx) {
      const g = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "#fff");
      g.addColorStop(0.3, "#fff");
      g.addColorStop(1, "rgba(255,255,255,0)");
      sx.fillStyle = g;
      sx.fillRect(0, 0, 64, 64);
    }
    const sprite = new THREE.CanvasTexture(sc);
    const nodeMat = new THREE.PointsMaterial({ map: sprite, size: 1.1, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false });
    const points = new THREE.Points(nodeGeo, nodeMat);
    group.add(points);

    const MAXSEG = N * 7;
    const linePos = new Float32Array(MAXSEG * 6);
    const lineCol = new Float32Array(MAXSEG * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.frustumCulled = false;
    group.add(lines);

    // Polyèdre filaire en arrière-plan (« core » du SOC)
    const coreGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(10, 1));
    const coreMat = new THREE.LineBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.3, depthWrite: false });
    const core = new THREE.LineSegments(coreGeo, coreMat);
    core.position.set(mobile ? 6 : 26, mobile ? 14 : 3, -14);
    scene.add(core);
    const coreGeo2 = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(5.5, 0));
    const core2 = new THREE.LineSegments(coreGeo2, new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.45, depthWrite: false }));
    core.add(core2);

    const palette = {
      dark: { c: [0, 0.95, 1], b: [0.1, 0.45, 1], g: [0, 1, 0.4], blend: THREE.AdditiveBlending as THREE.Blending, line: 0.55, core: 0x0066ff, core2: 0x00f3ff },
      light: { c: [0.0, 0.45, 0.7], b: [0.05, 0.25, 0.75], g: [0.1, 0.6, 0.2], blend: THREE.NormalBlending as THREE.Blending, line: 0.4, core: 0x0b5cad, core2: 0x0288d1 },
    };
    let pal: (typeof palette)["dark"] | (typeof palette)["light"] = palette.dark;
    let lineBase = pal.line;

    function applyTheme(t: "dark" | "light") {
      pal = palette[t];
      lineBase = pal.line;
      for (let i = 0; i < N; i++) {
        const c = kind[i] === 0 ? pal.c : kind[i] === 1 ? pal.b : pal.g;
        nodeCol.set(c, i * 3);
      }
      nodeGeo.attributes.color.needsUpdate = true;
      lineMat.blending = pal.blend;
      lineMat.opacity = t === "dark" ? 1 : 0.55;
      nodeMat.blending = pal.blend;
      nodeMat.needsUpdate = true;
      lineMat.needsUpdate = true;
      coreMat.color.setHex(pal.core);
      (core2.material as THREE.LineBasicMaterial).color.setHex(pal.core2);
    }
    api.current = { setTheme: applyTheme };
    applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    function updateLinks() {
      let s = 0;
      const L2 = LINK * LINK;
      for (let i = 0; i < N && s < MAXSEG; i++) {
        const ax = pos[i * 3], ay = pos[i * 3 + 1], az = pos[i * 3 + 2];
        for (let j = i + 1; j < N && s < MAXSEG; j++) {
          const dx = ax - pos[j * 3], dy = ay - pos[j * 3 + 1], dz = az - pos[j * 3 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < L2) {
            const k = (1 - Math.sqrt(d2) / LINK) * lineBase;
            const o = s * 6;
            linePos[o] = ax; linePos[o + 1] = ay; linePos[o + 2] = az;
            linePos[o + 3] = pos[j * 3]; linePos[o + 4] = pos[j * 3 + 1]; linePos[o + 5] = pos[j * 3 + 2];
            const ci = kind[i] === 2 || kind[j] === 2 ? pal.g : pal.c;
            for (let q = 0; q < 2; q++) {
              lineCol[o + q * 3] = ci[0] * k;
              lineCol[o + q * 3 + 1] = ci[1] * k;
              lineCol[o + q * 3 + 2] = ci[2] * k;
            }
            s++;
          }
        }
      }
      lineGeo.setDrawRange(0, s * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
    }

    function step(t: number) {
      for (let i = 0; i < N; i++) {
        for (let a = 0; a < 3; a++) {
          const k = i * 3 + a;
          pos[k] += vel[k];
          const lim = (a === 0 ? BOX.x : a === 1 ? BOX.y : BOX.z) / 2;
          if (pos[k] > lim || pos[k] < -lim) vel[k] *= -1;
        }
      }
      nodeGeo.attributes.position.needsUpdate = true;
      updateLinks();
      group.rotation.y += (mouse.x * 0.25 - group.rotation.y) * 0.03;
      group.rotation.x += (mouse.y * 0.12 - group.rotation.x) * 0.03;
      const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const p = Math.min(window.scrollY / scrollMax, 1);
      camera.position.z += (42 - p * 10 - camera.position.z) * 0.05;
      camera.position.y += (-p * 8 - camera.position.y) * 0.05;
      core.rotation.y = t * 0.00008;
      core.rotation.x = t * 0.00005;
      core2.rotation.y = -t * 0.00012;
      renderer.render(scene, camera);
    }

    let raf = 0;
    const loop = (t: number) => {
      if (!document.hidden) step(t);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) {
      for (let k = 0; k < 40; k++) step(0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    const onResize = () => {
      resize();
      if (reduce) step(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      api.current = null;
      nodeGeo.dispose(); nodeMat.dispose(); sprite.dispose(); lineGeo.dispose(); lineMat.dispose();
      coreGeo.dispose(); coreMat.dispose(); coreGeo2.dispose();
      (core2.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    api.current?.setTheme(theme);
  }, [theme]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1] h-full w-full" />;
}
