import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeDScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffffff, 4, 100);
    mainLight.position.set(6, 6, 6);
    scene.add(mainLight);

    const mouseLight = new THREE.PointLight(0xffffff, 3, 50);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. HOLOGRAPHIC QUANTUM GLOBE & DEVELOPER MATRIX SCULPTURE
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Inner Metallic Globe Sphere
    const globeGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: false
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    mainGroup.add(globeMesh);

    // Holographic Lattice Outer Wireframe Shell
    const shellGeo = new THREE.IcosahedronGeometry(2.1, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x525252,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    mainGroup.add(shellMesh);

    // Equatorial Binary Orbit Ring
    const ringGeo = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    mainGroup.add(orbitRing);

    // Orbiting Satellite Nodes (Representing Live Productions)
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.05
    });

    for (let i = 0; i < 12; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 12) * Math.PI * 2;
      const radius = 3.1;

      sat.position.x = radius * Math.cos(angle);
      sat.position.z = radius * Math.sin(angle);
      sat.position.y = Math.sin(angle * 2) * 0.5;

      mainGroup.add(sat);
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

      mouseLight.position.x = (e.clientX / window.innerWidth) * 10 - 5;
      mouseLight.position.y = -(e.clientY / window.innerHeight) * 10 + 5;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation
      mainGroup.rotation.y = elapsedTime * 0.2 + targetX;
      mainGroup.rotation.x = elapsedTime * 0.1 + targetY;

      shellMesh.rotation.y = -elapsedTime * 0.15;
      orbitRing.rotation.z = elapsedTime * 0.2;

      // Orbit Satellites
      satellites.forEach((sat, idx) => {
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.02;
        const angle = elapsedTime * 0.5 + (idx / 12) * Math.PI * 2;
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
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[480px] sm:h-[620px] relative overflow-hidden pointer-events-none flex items-center justify-center"
    />
  );
};
