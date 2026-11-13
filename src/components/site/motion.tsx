"use client";

import { useEffect } from "react";

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const start = performance.now();
  const dur = 1100;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** Mostra as falas de uma conversa uma a uma; com data-loop recomeça. */
function playSequence(root: HTMLElement, signal: AbortSignal) {
  const steps = Array.from(
    root.querySelectorAll<HTMLElement>(
      ".bubble, .call-card__done, .app__result"
    )
  );
  let timer = 0;
  let i = 0;

  const run = () => {
    if (signal.aborted) return;
    if (i < steps.length) {
      steps[i].classList.add("is-on");
      i += 1;
      timer = window.setTimeout(run, i === steps.length ? 3600 : 1400);
      return;
    }
    for (const el of steps) el.classList.remove("is-on");
    i = 0;
    timer = window.setTimeout(run, 800);
  };

  root.classList.add("is-live");
  timer = window.setTimeout(run, 500);
  signal.addEventListener("abort", () => window.clearTimeout(timer));
}

export function SiteMotion() {
  useEffect(() => {
    const ctrl = new AbortController();
    const { signal } = ctrl;
    const html = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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

    const progressSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-progress]")
    );
    const words = Array.from(
      document.querySelectorAll<HTMLElement>("[data-words]")
    );

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const vh = window.innerHeight;
        const max = document.documentElement.scrollHeight - vh;
        html.style.setProperty("--scroll", String(max > 0 ? y / max : 0));
        nav?.classList.toggle("is-scrolled", y > 12);
        actionbar?.classList.toggle("is-shown", y > vh * 0.7);

        for (const s of progressSections) {
          const r = s.getBoundingClientRect();
          const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
          s.style.setProperty("--p", p.toFixed(3));
        }

        for (const block of words) {
          const r = block.getBoundingClientRect();
          const p = Math.min(
            1,
            Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35))
          );
          const spans = block.querySelectorAll("span");
          const lit = Math.round(p * spans.length);
          spans.forEach((sp, k) => sp.classList.toggle("is-lit", k < lit));
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true, signal });
    window.addEventListener("resize", onScroll, { signal });
    onScroll();

    if (reduce) {
      html.classList.add("motion-off");
      return () => ctrl.abort();
    }

    html.classList.add("motion-on");

    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          if (el.matches("[data-count]")) countUp(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal], .app, .flow, .pilot")
      .forEach(el => io.observe(el));

    const seqIo = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          playSequence(e.target as HTMLElement, signal);
          seqIo.unobserve(e.target);
        }
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll<HTMLElement>("[data-sequence]").forEach(el => {
      el.classList.add("is-armed");
      seqIo.observe(el);
    });

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

    return () => {
      ctrl.abort();
      io.disconnect();
      seqIo.disconnect();
    };
  }, []);

  return null;
}
