"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Hero3DScene from "./Hero3DScene";

export function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 45%, #7c3aed 100%)",
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0.35, 0.05, 1.95], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["transparent"]} />
        <Suspense
          fallback={
            <mesh>
              <sphereGeometry args={[0.1]} />
              <meshBasicMaterial color="#0369a1" />
            </mesh>
          }
        >
          <Hero3DScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
