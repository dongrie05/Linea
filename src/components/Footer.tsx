import Link from "next/link";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="band-pine border-t border-white/15">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[1.125rem] font-semibold tracking-[-0.02em]">
            Linea
          </p>
          <p className="mt-2 text-[1.0625rem]">Um produto Dongrie Labs</p>
          <div className="caption mt-4 flex flex-col gap-1">
            <a href={`tel:${CONTACT_PHONE_E164}`} className="hover:text-ink">
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé" className="flex flex-col gap-2 text-[0.95rem]">
          <Link href="/#ouvir" className="text-muted hover:text-ink">
            Ouvir um exemplo
          </Link>
          <Link href="/#precos" className="text-muted hover:text-ink">
            Preços
          </Link>
          <Link href="/#faq" className="text-muted hover:text-ink">
            FAQ
          </Link>
          <Link href="/formulario" className="text-muted hover:text-ink">
            Entrar no piloto
          </Link>
        </nav>
      </div>
      <div className="mx-auto max-w-page px-5 pb-10 sm:px-8">
        <p className="caption">© {new Date().getFullYear()} Dongrie Labs</p>
      </div>
    </footer>
  );
}
