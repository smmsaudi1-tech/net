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
    // If splineUrl is active and loaded via <spline-viewer>, we don't need Three.js fallback canvas
    if (splineUrl && splineUrl !== 'undefined' && splineUrl !== '') return;

    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || 500;
    const h = container.clientHeight || 500;

    // 1. Three.js Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting
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

    // 3. Cyber Crystal Sculpture Group
    const group = new THREE.Group();
    scene.add(group);

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

    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x00f0ff : 0x2563eb
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xff007f : 0xd946ef
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      outerMesh.rotation.y = elapsedTime * 0.3;
      outerMesh.rotation.x = elapsedTime * 0.2;
      innerMesh.rotation.y = -elapsedTime * 0.4;
      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.x = elapsedTime * 0.6;
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [theme, splineUrl]);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center overflow-hidden">
      {splineUrl && splineUrl !== 'undefined' && splineUrl !== '' ? (
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
