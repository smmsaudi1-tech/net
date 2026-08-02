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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 4, 100);
    pointLight.position.set(6, 6, 6);
    scene.add(pointLight);

    const mouseLight = new THREE.PointLight(0xffffff, 3, 50);
    mouseLight.position.set(0, 0, 4);
    scene.add(mouseLight);

    // 3. PROGRAMMING & CODE-THEMED 3D SCULPTURE
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Outer Glass Code Cube Matrix
    const cubeGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true
    });
    const codeCube = new THREE.Mesh(cubeGeo, cubeMat);
    mainGroup.add(codeCube);

    // Inner Glowing Core (Architectural Compiler Node)
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.05,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Orbiting Binary Ring 1 (Horizontal Code Stream)
    const ringGeo1 = new THREE.TorusGeometry(2.8, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x525252, wireframe: true });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // Orbiting Binary Ring 2 (Vertical Code Stream)
    const ringGeo2 = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa3a3a3, wireframe: true });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // Orbiting Code Brackets & Syntax Bits (< />, { }, 01)
    const syntaxNodes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.1
    });

    for (let i = 0; i < 24; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const radius = 3.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      node.position.x = radius * Math.sin(phi) * Math.cos(theta);
      node.position.y = radius * Math.sin(phi) * Math.sin(theta);
      node.position.z = radius * Math.cos(phi);

      mainGroup.add(node);
      syntaxNodes.push(node);
    }

    // 4. Mouse & Scroll Interaction Physics
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

      // Continuous 3D Code Cube Rotation
      mainGroup.rotation.y = elapsedTime * 0.25 + targetX;
      mainGroup.rotation.x = elapsedTime * 0.15 + targetY;

      coreMesh.rotation.y = -elapsedTime * 0.4;
      codeCube.rotation.z = elapsedTime * 0.1;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Pulse Orbiting Nodes
      syntaxNodes.forEach((node, idx) => {
        node.rotation.x += 0.02;
        node.rotation.y += 0.02;
        node.position.y += Math.sin(elapsedTime * 2.5 + idx) * 0.004;
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
