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

    const mainLight = new THREE.PointLight(0xffffff, 5, 100);
    mainLight.position.set(6, 6, 6);
    scene.add(mainLight);

    const eyeLight = new THREE.PointLight(theme === 'dark' ? 0xffffff : 0x000000, 4, 30);
    eyeLight.position.set(0, 0.3, 3);
    scene.add(eyeLight);

    // 3. FUTURISTIC 3D ROBOT / HUMANOID AI AGENT HEAD & TORSO SCULPTURE
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Head Base Sphere
    const headGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x18181b : 0xe4e4e7,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: false
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.scale.set(1, 1.25, 1);
    robotGroup.add(headMesh);

    // Cybernetic Optical Visor / Eyes
    const visorGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.25, 32);
    const visorMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x09090b,
      metalness: 1.0,
      roughness: 0.05
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.position.set(0, 0.25, 0.95);
    robotGroup.add(visorMesh);

    // Neck Connector
    const neckGeo = new THREE.CylinderGeometry(0.5, 0.65, 0.6, 32);
    const neckMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x27272a : 0x71717a,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true
    });
    const neckMesh = new THREE.Mesh(neckGeo, neckMat);
    neckMesh.position.set(0, -1.5, 0);
    robotGroup.add(neckMesh);

    // Shoulders / Torso Base
    const torsoGeo = new THREE.CylinderGeometry(1.8, 1.2, 0.8, 32);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x18181b : 0xd4d4d8,
      metalness: 0.9,
      roughness: 0.15
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
    torsoMesh.position.set(0, -2.1, 0);
    robotGroup.add(torsoMesh);

    // Outer Wireframe Brain Lattice Halo
    const haloGeo = new THREE.IcosahedronGeometry(2.3, 2);
    const haloMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x71717a : 0xa1a1aa,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    robotGroup.add(haloMesh);

    // Orbiting Data Satellites
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.2, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x000000,
      metalness: 1.0,
      roughness: 0.05
    });

    for (let i = 0; i < 14; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 14) * Math.PI * 2;
      sat.position.set(3.0 * Math.cos(angle), Math.sin(angle * 2) * 0.5, 3.0 * Math.sin(angle));
      robotGroup.add(sat);
      satellites.push(sat);
    }

    // 4. Mouse Tracking Physics
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (e.clientX - windowHalfX) * 0.0018;
      targetY = (e.clientY - windowHalfY) * 0.0018;

      eyeLight.position.x = (e.clientX / window.innerWidth) * 6 - 3;
      eyeLight.position.y = -(e.clientY / window.innerHeight) * 6 + 3;
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

      // Robot Head Tracking & Breathing Movement
      robotGroup.rotation.y = elapsedTime * 0.15 + targetX;
      robotGroup.rotation.x = Math.sin(elapsedTime * 1.5) * 0.05 + targetY;

      haloMesh.rotation.y = -elapsedTime * 0.2;
      visorMesh.rotation.z = Math.sin(elapsedTime * 2) * 0.1;

      satellites.forEach((sat, idx) => {
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.02;
        const angle = elapsedTime * 0.4 + (idx / 14) * Math.PI * 2;
        sat.position.x = 3.0 * Math.cos(angle);
        sat.position.z = 3.0 * Math.sin(angle);
        sat.position.y = Math.sin(angle * 3) * 0.6;
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
