"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 60;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const seed = i * 7.13;
    const theta = (seed % 1) * Math.PI * 2;
    const r = 4 + ((seed * 3) % 1) * 6;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = ((seed * 2) % 1) * 4 - 2;
    positions[i * 3 + 2] = Math.sin(theta) * r * 0.4;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8b5cf6"
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ProjectsAmbientScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <AmbientParticles />
      </Canvas>
    </div>
  );
}
