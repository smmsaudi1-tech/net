import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export const ThreeDScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || 500;
    const h = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.7 : 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 5, 100);
    pointLight1.position.set(6, 6, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(theme === 'dark' ? 0x00f0ff : 0x0066ff, 4, 50);
    pointLight2.position.set(-6, -6, 4);
    scene.add(pointLight2);

    const mouseLight = new THREE.PointLight(0xffffff, 3, 30);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. BRAND-NEW 3D SCULPTURE: CYBERNETIC HELIX MONOLITH & INTERLOCKING RINGS
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Double-Stranded Quantum Helix
    const helixGeo = new THREE.TorusKnotGeometry(1.6, 0.28, 140, 20, 3, 5);
    const helixMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x262626 : 0x18181b,
      metalness: 0.95,
      roughness: 0.08,
      wireframe: false
    });
    const helixMesh = new THREE.Mesh(helixGeo, helixMat);
    mainGroup.add(helixMesh);

    // Ring 1 (X-Axis Interlocking Armor)
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xa3a3a3 : 0x525252,
      wireframe: true
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // Ring 2 (Y-Axis Interlocking Armor)
    const ringGeo2 = new THREE.TorusGeometry(3.0, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x525252 : 0x71717a,
      wireframe: true
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // Ring 3 (Z-Axis Outer Perimeter)
    const ringGeo3 = new THREE.TorusGeometry(3.4, 0.02, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x737373 : 0xa1a1aa,
      wireframe: true
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 6;
    mainGroup.add(ring3);

    // Orbiting Floating Micro-Nodes
    const nodes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.IcosahedronGeometry(0.22, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x000000,
      metalness: 1.0,
      roughness: 0.05
    });

    for (let i = 0; i < 18; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / 18) * Math.PI * 2;
      node.position.set(3.5 * Math.cos(angle), Math.sin(angle * 2) * 0.7, 3.5 * Math.sin(angle));
      mainGroup.add(node);
      nodes.push(node);
    }

    // 4. Mouse Tracking Physics
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (e.clientX - windowHalfX) * 0.0018;
      targetY = (e.clientY - windowHalfY) * 0.0018;

      mouseLight.position.x = (e.clientX / window.innerWidth) * 10 - 5;
      mouseLight.position.y = -(e.clientY / window.innerHeight) * 10 + 5;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth || 500;
      const nh = container.clientHeight || 500;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous Dynamic Rotations
      mainGroup.rotation.y = elapsedTime * 0.2 + targetX;
      mainGroup.rotation.x = elapsedTime * 0.12 + targetY;

      helixMesh.rotation.z = elapsedTime * 0.2;
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;
      ring3.rotation.x = elapsedTime * 0.15;

      nodes.forEach((node, idx) => {
        node.rotation.x += 0.02;
        node.rotation.y += 0.02;
        const angle = elapsedTime * 0.45 + (idx / 18) * Math.PI * 2;
        node.position.x = 3.5 * Math.cos(angle);
        node.position.z = 3.5 * Math.sin(angle);
        node.position.y = Math.sin(angle * 3) * 0.8;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[450px] sm:h-[580px] relative overflow-hidden pointer-events-none flex items-center justify-center min-h-[400px]"
    />
  );
};
