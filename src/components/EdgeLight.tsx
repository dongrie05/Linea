"use client";

import { useEffect, useRef } from "react";

/**
 * Borda com um ponto de luz a percorrer o contorno.
 * A rotação é só transform. Parada fora do ecrã e com o separador escondido.
 */
export default function EdgeLight({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={`edge ${className}`}>
      <span className="edge-mask" aria-hidden="true">
        <span className="edge-spin can-spin">
          <span className="edge-rotor" />
        </span>
      </span>
      <span className="edge-face">{children}</span>
    </span>
  );
}
