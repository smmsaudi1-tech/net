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

    const eyeLight = new THREE.PointLight(theme === 'dark' ? 0x00f0ff : 0x0066ff, 4, 30);
    eyeLight.position.set(0, 0.2, 3);
    scene.add(eyeLight);

    // 3. MECHANICAL ROBOTIC ANDROID SCULPTURE
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Main Robotic Head Chassis
    const headGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x18181b : 0xe4e4e7,
      metalness: 0.95,
      roughness: 0.1
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.scale.set(1, 1.2, 1);
    robotGroup.add(headMesh);

    // Optical Laser Sensor Visor
    const visorGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.2, 32);
    const visorMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x09090b : 0x18181b,
      metalness: 1.0,
      roughness: 0.05
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.position.set(0, 0.2, 0.95);
    robotGroup.add(visorMesh);

    // Mechanical Gear Ring 1 (Horizontal)
    const gearGeo1 = new THREE.TorusGeometry(2.2, 0.04, 16, 100);
    const gearMat1 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xa3a3a3 : 0x525252,
      wireframe: true
    });
    const gearRing1 = new THREE.Mesh(gearGeo1, gearMat1);
    gearRing1.rotation.x = Math.PI / 3;
    robotGroup.add(gearRing1);

    // Mechanical Gear Ring 2 (Vertical)
    const gearGeo2 = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
    const gearMat2 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x525252 : 0xa3a3a3,
      wireframe: true
    });
    const gearRing2 = new THREE.Mesh(gearGeo2, gearMat2);
    gearRing2.rotation.y = Math.PI / 4;
    robotGroup.add(gearRing2);

    // Orbiting Mechanical Circuit Satellites
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const satMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xffffff : 0x000000,
      metalness: 1.0,
      roughness: 0.05
    });

    for (let i = 0; i < 16; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 16) * Math.PI * 2;
      sat.position.set(3.1 * Math.cos(angle), Math.sin(angle * 2) * 0.5, 3.1 * Math.sin(angle));
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

      robotGroup.rotation.y = elapsedTime * 0.2 + targetX;
      robotGroup.rotation.x = Math.sin(elapsedTime * 1.5) * 0.05 + targetY;

      gearRing1.rotation.z = elapsedTime * 0.25;
      gearRing2.rotation.z = -elapsedTime * 0.3;

      satellites.forEach((sat, idx) => {
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.02;
        const angle = elapsedTime * 0.4 + (idx / 16) * Math.PI * 2;
        sat.position.x = 3.1 * Math.cos(angle);
        sat.position.z = 3.1 * Math.sin(angle);
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
