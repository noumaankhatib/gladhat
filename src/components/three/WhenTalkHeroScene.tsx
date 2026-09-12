import { useEffect, useRef } from 'react';

const INK = 0x17213b;
const SIGNAL = 0xff7a00;
const ELECTRIC = 0x3155ff;

export function WhenTalkHeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = mountRef.current;
    if (!container || reduced) return;

    let rafId = 0;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    import('three').then((THREE) => {
      if (disposed || !container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.z = 4.2;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const wireMat = new THREE.MeshBasicMaterial({
        color: ELECTRIC,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const coreMat = new THREE.MeshBasicMaterial({
        color: SIGNAL,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });

      const outer = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 1), wireMat);
      const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), coreMat);
      group.add(outer, inner);

      const ringGeo = new THREE.TorusGeometry(1.65, 0.012, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0.12 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.4;
      group.add(ring);

      let pointerX = 0;
      let pointerY = 0;

      const onPointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      container.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', onResize);

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        outer.rotation.x += 0.0018;
        outer.rotation.y += 0.0024;
        inner.rotation.x -= 0.003;
        inner.rotation.y += 0.002;
        ring.rotation.z += 0.001;
        group.rotation.y += (pointerX * 0.18 - group.rotation.y) * 0.04;
        group.rotation.x += (-pointerY * 0.12 - group.rotation.x) * 0.04;
        renderer.render(scene, camera);
      };

      animate();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        container.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        outer.geometry.dispose();
        inner.geometry.dispose();
        ringGeo.dispose();
        wireMat.dispose();
        coreMat.dispose();
        ringMat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className="when-talk-hero__canvas" aria-hidden="true" />;
}
