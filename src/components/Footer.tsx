import Link from "next/link";
import Logo from "@/components/Logo";
import Pending from "@/components/Pending";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from "@/lib/contact";

const LINKS = [
  { href: "/#politica", label: "Política de privacidade" },
  { href: "/#termos", label: "Termos da demonstração" },
  { href: "/#ouvir", label: "Ouvir" },
  { href: "/#piloto", label: "Piloto" },
  { href: "/#perguntas", label: "Perguntas" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-page gap-10 px-5 py-14 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div className="max-w-measure">
          <Logo height={24} />
          <p className="mt-4">
            Linea. Feito por Gonçalo Dongrie, trabalhador independente.
          </p>
          <Pending>
            NIF e morada, ou manter a frase «Um produto Dongrie Labs» do site
            anterior.
          </Pending>
          <div className="mt-4 flex flex-col gap-1">
            <a href={`tel:${CONTACT_PHONE_E164}`} className="link">
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="link">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2">
          {LINKS.map(item => (
            <Link key={item.href} href={item.href} className="link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-page px-5 pb-10 sm:px-8">
        <p className="caption">© 2026</p>
        <Pending>Nome legal.</Pending>
      </div>
    </footer>
  );
}
