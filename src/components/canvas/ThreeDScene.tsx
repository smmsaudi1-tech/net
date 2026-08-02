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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 3.5, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const mouseLight = new THREE.PointLight(0xffffff, 2, 50);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. Abstract Futuristic Object (Group of Metallic Fragments)
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Main Metallic Core Geometry
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Wireframe Outer Shell
    const wireGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x525252,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Orbiting Floating Geometric Fragments
    const fragments: THREE.Mesh[] = [];
    const fragGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const fragMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.1
    });

    for (let i = 0; i < 18; i++) {
      const frag = new THREE.Mesh(fragGeo, fragMat);
      const radius = 2.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      frag.position.x = radius * Math.sin(phi) * Math.cos(theta);
      frag.position.y = radius * Math.sin(phi) * Math.sin(theta);
      frag.position.z = radius * Math.cos(phi);

      frag.rotation.x = Math.random() * Math.PI;
      frag.rotation.y = Math.random() * Math.PI;

      mainGroup.add(frag);
      fragments.push(frag);
    }

    // 4. Mouse Tracking Physics
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (e.clientX - windowHalfX) * 0.0015;
      targetY = (e.clientY - windowHalfY) * 0.0015;

      // Move light with cursor
      mouseLight.position.x = (e.clientX / window.innerWidth) * 10 - 5;
      mouseLight.position.y = -(e.clientY / window.innerHeight) * 10 + 5;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize Handler
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

      wireMesh.rotation.y = -elapsedTime * 0.15;

      // Orbit fragments
      fragments.forEach((frag, idx) => {
        frag.rotation.x += 0.01;
        frag.rotation.y += 0.01;
        frag.position.y += Math.sin(elapsedTime * 2 + idx) * 0.003;
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
      className="w-full h-[450px] sm:h-[600px] relative overflow-hidden pointer-events-none"
    />
  );
};
