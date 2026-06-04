"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapesProps {
  simplified?: boolean;
}

export default function FloatingShapes({ simplified = false }: FloatingShapesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  // Create materials with custom colors
  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6366f1"),
        emissive: new THREE.Color("#6366f1"),
        emissiveIntensity: 0.3,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  const violetMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b5cf6"),
        emissive: new THREE.Color("#8b5cf6"),
        emissiveIntensity: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      }),
    []
  );

  const cyanMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#06b6d4"),
        emissive: new THREE.Color("#06b6d4"),
        emissiveIntensity: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      }),
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.x = time * 0.15;
      icosaRef.current.rotation.z = time * 0.1;
      icosaRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.y = time * 0.15;
      torusRef.current.position.x = Math.cos(time * 0.3) * 2;
      torusRef.current.position.y = Math.sin(time * 0.4) * 0.5 + 0.5;
      torusRef.current.position.z = Math.sin(time * 0.3) * 1;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = time * 0.2;
      octaRef.current.rotation.z = time * 0.15;
      octaRef.current.position.x = Math.sin(time * 0.25) * -2;
      octaRef.current.position.y = Math.cos(time * 0.35) * 0.5 - 0.5;
      octaRef.current.position.z = Math.cos(time * 0.25) * 1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Icosahedron */}
      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[1.4, simplified ? 0 : 1]} />
        <primitive object={accentMaterial} attach="material" />
      </mesh>

      {/* Orbiting Torus */}
      <mesh ref={torusRef}>
        <torusKnotGeometry
          args={simplified ? [0.45, 0.12, 64, 8] : [0.5, 0.14, 128, 16]}
        />
        <primitive object={violetMaterial} attach="material" />
      </mesh>

      {/* Orbiting Octahedron */}
      <mesh ref={octaRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <primitive object={cyanMaterial} attach="material" />
      </mesh>

      {/* Small decorative spheres */}
      {Array.from({ length: simplified ? 4 : 8 }).map((_, i) => (
        <SmallOrb key={i} index={i} />
      ))}
    </group>
  );
}

function SmallOrb({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 8) * Math.PI * 2;
  const radius = 2.5 + ((index % 5) + 1) * 0.1;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.x = Math.cos(angle + time * 0.1) * radius;
      ref.current.position.y = Math.sin(time * 0.3 + index) * 0.8;
      ref.current.position.z = Math.sin(angle + time * 0.1) * radius;
      ref.current.scale.setScalar(
        0.8 + Math.sin(time * 0.5 + index * 0.7) * 0.2
      );
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial
        color={index % 2 === 0 ? "#6366f1" : "#8b5cf6"}
        emissive={index % 2 === 0 ? "#6366f1" : "#8b5cf6"}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}
