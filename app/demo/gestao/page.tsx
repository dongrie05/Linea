import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/site/logo";
import { InviteManager } from "./invite-manager";

export const metadata: Metadata = {
  title: "Gestão de convites",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ManageDemoPage() {
  return (
    <main className="demo-page wrap">
      <Link className="nav__logo" href="/">
        <LogoMark /> Linea
      </Link>
      <section
        className="demo-session demo-manager"
        aria-labelledby="demo-title"
      >
        <h1 id="demo-title">Convites da Linea</h1>
        <InviteManager />
      </section>
    </main>
  );
}
