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
    
    // Clear any previous canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.7 : 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffffff, 5, 100);
    mainLight.position.set(6, 6, 6);
    scene.add(mainLight);

    const mouseLight = new THREE.PointLight(
      theme === 'dark' ? 0xffffff : 0x000000,
      3,
      50
    );
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. BESPOKE 3D DEVELOPER CRYSTAL PRISM & TORUS KNOT SCULPTURE
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Multifaceted Quantum Crystal Prism
    const crystalGeo = new THREE.OctahedronGeometry(1.6, 1);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x262626 : 0x18181b,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    mainGroup.add(crystalMesh);

    // Outer Double-Helix Torus Knot Wireframe
    const knotGeo = new THREE.TorusKnotGeometry(2.2, 0.08, 120, 16, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xa3a3a3 : 0x525252,
      wireframe: true
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    mainGroup.add(knotMesh);

    // Orbiting Geometric Shards
    const shards: THREE.Mesh[] = [];
    const shardGeo = new THREE.TetrahedronGeometry(0.28, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x000000,
      metalness: 1.0,
      roughness: 0.05
    });

    for (let i = 0; i < 16; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / 16) * Math.PI * 2;
      const radius = 3.1;

      shard.position.x = radius * Math.cos(angle);
      shard.position.z = radius * Math.sin(angle);
      shard.position.y = Math.sin(angle * 2) * 0.6;

      mainGroup.add(shard);
      shards.push(shard);
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

      mainGroup.rotation.y = elapsedTime * 0.25 + targetX;
      mainGroup.rotation.x = elapsedTime * 0.15 + targetY;

      crystalMesh.rotation.y = -elapsedTime * 0.3;
      knotMesh.rotation.z = elapsedTime * 0.2;

      shards.forEach((shard, idx) => {
        shard.rotation.x += 0.02;
        shard.rotation.y += 0.02;
        const angle = elapsedTime * 0.4 + (idx / 16) * Math.PI * 2;
        shard.position.x = 3.1 * Math.cos(angle);
        shard.position.z = 3.1 * Math.sin(angle);
        shard.position.y = Math.sin(angle * 3) * 0.7;
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
      className="w-full h-[450px] sm:h-[550px] relative overflow-hidden pointer-events-none flex items-center justify-center min-h-[400px]"
    />
  );
};
