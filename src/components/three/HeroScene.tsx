"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FloatingShapes from "./FloatingShapes";
import ParticleField from "./ParticleField";
import SceneLoader from "./SceneLoader";

interface SceneContentProps {
  reducedQuality: boolean;
}

function SceneContent({ reducedQuality }: SceneContentProps) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight
        position={[5, 5, 5]}
        intensity={1}
        color="#6366f1"
        distance={20}
      />
      <pointLight
        position={[-5, -3, 3]}
        intensity={0.6}
        color="#8b5cf6"
        distance={15}
      />
      <pointLight
        position={[0, 3, -5]}
        intensity={0.4}
        color="#06b6d4"
        distance={15}
      />

      <FloatingShapes simplified={reducedQuality} />
      <ParticleField count={reducedQuality ? 80 : 200} />

      {!reducedQuality && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.35}
            mipmapBlur
          />
        </EffectComposer>
      )}

      <Preload all />
    </>
  );
}

interface HeroSceneProps {
  reducedQuality?: boolean;
}

export default function HeroScene({ reducedQuality = false }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={reducedQuality ? [1, 1] : [1, 1.5]}
        frameloop={isVisible ? "always" : "demand"}
        gl={{
          antialias: !reducedQuality,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <SceneLoader>
          <SceneContent reducedQuality={reducedQuality} />
        </SceneLoader>
      </Canvas>
    </div>
  );
}
