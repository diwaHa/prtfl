"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AccentShape() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.12;
      ref.current.rotation.y = t * 0.18;
    }
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#8b5cf6"
        emissiveIntensity={0.35}
        wireframe
        transparent
        opacity={0.75}
      />
    </mesh>
  );
}

export default function AboutAccentScene() {
  return (
    <div className="relative h-48 md:h-64 w-full rounded-2xl overflow-hidden glass border border-surface-border/40" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#6366f1" />
        <pointLight position={[-2, -1, 2]} intensity={0.4} color="#06b6d4" />
        <AccentShape />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
