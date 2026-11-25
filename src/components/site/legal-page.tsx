import { ActionBar, SiteFooter, SiteNav } from "@/components/site/chrome";
import { SiteMotion } from "@/components/site/motion";
import { asset } from "@/lib/asset";
import { LEGAL_LINKS, LEGAL_UPDATED } from "@/lib/legal";

const home = asset("/");

/** Moldura comum das páginas legais: navegação, título, texto e rodapé. */
export function LegalPage({
  title,
  lead,
  current,
  children,
}: {
  title: string;
  lead: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteMotion />
      <SiteNav home={home} />
      <main id="top" className="page legal">
        <div className="wrap legal__wrap" id="conteudo">
          <header className="legal__head">
            <h1>{title}</h1>
            <p className="legal__lead">{lead}</p>
            <p className="legal__meta">Última atualização: {LEGAL_UPDATED}</p>
          </header>
          <article className="legal__body">{children}</article>
          <nav className="legal__other" aria-label="Outras páginas legais">
            {LEGAL_LINKS.filter(link => link.href !== current).map(link => (
              <a key={link.href} className="link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </main>
      <SiteFooter home={home} />
      <ActionBar home={home} />
    </>
  );
}
