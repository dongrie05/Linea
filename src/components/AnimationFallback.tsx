"use client";

import { useEffect } from "react";

export default function AnimationFallback() {
  useEffect(() => {
    // Force all elements to be visible immediately
    const forceVisibility = () => {
      // Target all elements with opacity:0 or transform styles
      const selectors = [
        '[style*="opacity:0"]',
        '[style*="opacity: 0"]',
        '[style*="transform:translateY"]',
        '[style*="transform: translateY"]',
        '[style*="transform:translateX"]',
        '[style*="transform: translateX"]',
        '[style*="transform:scale"]',
        '[style*="transform: scale"]',
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const htmlElement = element as HTMLElement;
          if (
            htmlElement.style.opacity === "0" ||
            htmlElement.style.opacity === "0px"
          ) {
            htmlElement.style.opacity = "1";
          }
          if (
            htmlElement.style.transform &&
            htmlElement.style.transform !== "none"
          ) {
            htmlElement.style.transform = "none";
          }
        });
      });

      // Also target motion elements specifically
      const motionElements = document.querySelectorAll("[data-framer-motion]");
      motionElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (
          htmlElement.style.opacity === "0" ||
          htmlElement.style.opacity === "0px"
        ) {
          htmlElement.style.opacity = "1";
        }
        if (
          htmlElement.style.transform &&
          htmlElement.style.transform !== "none"
        ) {
          htmlElement.style.transform = "none";
        }
      });
    };

    // Run immediately
    forceVisibility();

    // Run again after a short delay to catch any late-loading elements
    const timer = setTimeout(forceVisibility, 100);
    const timer2 = setTimeout(forceVisibility, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return null;
}
