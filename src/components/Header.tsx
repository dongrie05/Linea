"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeTransition, springSettle } from "@/lib/motion";
import { NAV_ITEMS } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const router = useRouter();
  const panelTransition = reduced ? fadeTransition : springSettle;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openTalk = () => {
    setOpen(false);
    const home = document.getElementById("topo");
    if (home) {
      home.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      window.dispatchEvent(new CustomEvent("linea-open", { detail: "falar" }));
      return;
    }
    router.push("/#falar");
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="inline-flex shrink-0">
          <Logo height={28} />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Secções">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-primary hidden md:inline-flex"
            onClick={openTalk}
          >
            Falar com a Linea
          </button>
          <button
            type="button"
            className="btn btn-secondary px-3 md:hidden"
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen(value => !value)}
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="menu-movel"
            aria-label="Secções"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={panelTransition}
            className="overflow-hidden border-t border-line bg-surface md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center rounded-xl px-2 text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={openTalk}
              >
                Falar com a Linea
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
