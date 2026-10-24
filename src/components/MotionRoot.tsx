"use client";

import { LazyMotion, domAnimation } from "motion/react";
import { useEffect } from "react";

function MotionPause() {
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      root.dataset.motion = document.hidden ? "off" : "on";
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      delete root.dataset.motion;
    };
  }, []);
  return null;
}

export default function MotionRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
      <MotionPause />
    </LazyMotion>
  );
}
