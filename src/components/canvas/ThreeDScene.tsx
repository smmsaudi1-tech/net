import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { useSiteContent } from '../../context/SiteContentContext';

export const ThreeDScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const { getText } = useSiteContent();

  const splineUrl = getText('hero.spline_url', '');

  useEffect(() => {
    // If user provided a custom Spline model URL, render via <spline-viewer>
    if (splineUrl && splineUrl.trim() !== '' && splineUrl !== 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || 500;
    const h = container.clientHeight || 500;

    // 1. Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.0 : 1.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 3);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff007f, 3);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    const mouseLight = new THREE.PointLight(0xffffff, 3, 20);
    mouseLight.position.set(0, 0, 5);
    scene.add(mouseLight);

    // 3. Cybernetic 3D Core Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Core 1: Outer Holographic Armor Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x18181b,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.4 : 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // Core 2: Inner Glossy Faceted Crystal
    const innerGeo = new THREE.OctahedronGeometry(1.2, 3);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: theme === 'dark' ? 0x0f0f15 : 0xf4f4f5,
      metalness: 0.95,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      transmission: 0.3,
      ior: 1.6
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Core 3: Dual Interlocking Neon Rings
    const ringGeo1 = new THREE.TorusGeometry(2.5, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x00f0ff : 0x2563eb
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.9, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xff007f : 0xd946ef
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // Core 4: Ambient Floating Particle Swarm
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: theme === 'dark' ? 0xffffff : 0x000000,
      transparent: true,
      opacity: 0.6
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particlePoints);

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = x * 0.7;
      targetRotX = -y * 0.7;

      mouseLight.position.x = x * 4;
      mouseLight.position.y = y * 4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      outerMesh.rotation.y = elapsedTime * 0.3;
      outerMesh.rotation.x = elapsedTime * 0.2;

      innerMesh.rotation.y = -elapsedTime * 0.4;
      innerMesh.rotation.z = elapsedTime * 0.25;

      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.x = elapsedTime * 0.6;

      particlePoints.rotation.y = elapsedTime * 0.05;

      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

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
  }, [theme, splineUrl]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center overflow-hidden">
      {splineUrl && splineUrl.trim() !== '' && splineUrl !== 'undefined' ? (
        <spline-viewer
          url={splineUrl}
          loading-anim
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      )}
    </div>
  );
};
