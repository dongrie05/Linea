"use client";

import { useEffect } from "react";

export default function AnimationFallback() {
  useEffect(() => {
    // Force animations to run after a short delay
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[style*="opacity:0"]');
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (htmlElement.style.opacity === "0") {
          htmlElement.style.opacity = "1";
          htmlElement.style.transform = "translateY(0) translateX(0) scale(1)";
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
