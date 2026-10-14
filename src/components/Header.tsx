"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/site";
import { fadeTransition, springSettle } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelTransition = reduced ? fadeTransition : springSettle;

  return (
    <header className="material sticky top-0 z-40 border-b border-line/80">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[1.125rem] font-semibold tracking-[-0.02em]"
        >
          <span className="h-4 w-1 rounded-full bg-blue" aria-hidden="true" />
          Linea
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
          <Link
            href="/formulario"
            className="btn btn-primary hidden sm:inline-flex"
          >
            Entrar no piloto
          </Link>
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
            className="overflow-hidden border-t border-line/80 bg-surface md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="min-h-11 rounded-xl px-2 py-2 text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/formulario"
                className="btn btn-primary mt-2"
                onClick={() => setOpen(false)}
              >
                Entrar no piloto
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
