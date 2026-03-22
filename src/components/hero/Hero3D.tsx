"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Hero3DErrorBoundary } from "./Hero3DErrorBoundary";

const Hero3DCanvas = dynamic(
  () => import("./Hero3DCanvas").then(m => m.Hero3DCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800" />
    ),
  }
);

const gradientStyle = {
  background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 45%, #7c3aed 100%)",
};

/**
 * Background 3D do hero. Com reduced-motion ou falha de WebGL mostra gradient estático.
 */
export default function Hero3D() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className="absolute inset-0" style={gradientStyle} />;
  }

  return (
    <Hero3DErrorBoundary>
      <Hero3DCanvas />
    </Hero3DErrorBoundary>
  );
}
