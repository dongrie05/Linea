"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const ctrl = new AbortController();
    const { signal } = ctrl;
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const toggle =
      document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
    const actionbar = document.querySelector<HTMLElement>("[data-actionbar]");

    toggle?.addEventListener(
      "click",
      () => {
        const open = !nav?.classList.contains("is-open");
        nav?.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      },
      { signal }
    );
    nav?.querySelectorAll(".nav__links a").forEach(a =>
      a.addEventListener(
        "click",
        () => {
          nav.classList.remove("is-open");
          toggle?.setAttribute("aria-expanded", "false");
        },
        { signal }
      )
    );

    const onScroll = () => {
      const y = window.scrollY;
      nav?.classList.toggle("is-scrolled", y > 12);
      actionbar?.classList.toggle("is-shown", y > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true, signal });
    onScroll();

    const base =
      document.querySelector("script[data-base]")?.getAttribute("data-base") ||
      "";
    import(/* webpackIgnore: true */ `${base}/assets/moments/moments.js`).catch(
      () => {}
    );

    document.addEventListener(
      "pointermove",
      e => {
        const card = (e.target as HTMLElement).closest?.<HTMLElement>(".spot");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      },
      { passive: true, signal }
    );

    return () => ctrl.abort();
  }, []);

  return null;
}
