"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const RestOrb = dynamic(() => import("@/components/RestOrb"), { ssr: false });

function allowsWebGL() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) {
    return false;
  }
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") || probe.getContext("webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export default function VoiceOrb() {
  const [useGl, setUseGl] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!allowsWebGL()) return;
    const win = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId = 0;
    let timeoutId = 0;
    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(() => setUseGl(true), { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(() => setUseGl(true), 180);
    }
    return () => {
      if (idleId && win.cancelIdleCallback) win.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const onReady = useCallback(() => setLive(true), []);
  const onFail = useCallback(() => setLive(false), []);

  return (
    <div className="orb-slot">
      <div
        className={`orb-poster orb-breathe${live ? " is-covered" : ""}`}
        aria-hidden="true"
      />
      {useGl ? (
        <div className={`orb-canvas-wrap${live ? " is-shown" : ""}`}>
          <RestOrb onReady={onReady} onFail={onFail} />
        </div>
      ) : null}
      <p className="sr-only">Orbe em repouso. Pronta.</p>
    </div>
  );
}
