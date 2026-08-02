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

    // 1. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.9 : 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const cyanLight = new THREE.PointLight(theme === 'dark' ? 0x00f0ff : 0x0066ff, 5, 20);
    cyanLight.position.set(-4, 3, 3);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight(theme === 'dark' ? 0xff007f : 0xaa00ff, 4, 20);
    magentaLight.position.set(4, -3, -2);
    scene.add(magentaLight);

    // Mouse tracker light
    const mouseLight = new THREE.PointLight(0xffffff, 2, 15);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. Futuristic 3D Cyber Crystal Core Group
    const group = new THREE.Group();
    scene.add(group);

    // Core 1: Outer Icosahedron Wireframe Armor
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x18181b,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.35 : 0.45,
      metalness: 0.9,
      roughness: 0.1
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Core 2: Inner Glossy Faceted Gem Crystal
    const innerGeo = new THREE.OctahedronGeometry(1.2, 2);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0x111111 : 0xf4f4f5,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      transmission: 0.2,
      ior: 1.5
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Core 3: Orbital Cyber Ring 1 (X-Y Plane)
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x00f0ff : 0x2563eb,
      wireframe: false
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // Core 4: Orbital Cyber Ring 2 (Y-Z Plane)
    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xff007f : 0xd946ef,
      wireframe: false
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // Core 5: Floating Floating Quantum Particles Swarm
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7;
      particlePositions[i + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i + 2] = (Math.random() - 0.5) * 7;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: theme === 'dark' ? 0xffffff : 0x000000,
      transparent: true,
      opacity: 0.6
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    group.add(particlePoints);

    // 4. Mouse Interactive Parallax & Animation Loop
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = x * 0.8;
      targetRotX = -y * 0.8;

      mouseLight.position.x = x * 3;
      mouseLight.position.y = y * 3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation
      outerMesh.rotation.y = elapsedTime * 0.3;
      outerMesh.rotation.x = elapsedTime * 0.2;

      innerMesh.rotation.y = -elapsedTime * 0.4;
      innerMesh.rotation.z = elapsedTime * 0.25;

      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.x = elapsedTime * 0.6;

      particlePoints.rotation.y = elapsedTime * 0.05;

      // Smooth mouse lerping
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
