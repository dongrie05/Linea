import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/site/logo";
import { DemoCall } from "./demo-call";

export const metadata: Metadata = {
  title: "Demonstração da Linea",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function DemoPage() {
  return (
    <main className="demo-page wrap">
      <Link className="nav__logo" href="/">
        <LogoMark /> Linea
      </Link>
      <section className="demo-session" aria-labelledby="demo-title">
        <h1 id="demo-title">Experimente a Linea</h1>
        <p>
          Fale com a receção de uma clínica dentária fictícia e simule uma
          marcação.
        </p>
        <DemoCall />
        <p className="demo-session__note">
          Cada chamada dura até três minutos. Use dados fictícios durante a
          demonstração.
        </p>
      </section>
    </main>
  );
}
