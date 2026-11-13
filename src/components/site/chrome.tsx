import { ArrowIcon, LogoMark, PhoneIcon } from "@/components/site/logo";
import { FOUNDER_CTA } from "@/lib/site";
import { CONTACT_EMAIL, CONTACT_PHONES } from "@/lib/contact";

const ACTION = FOUNDER_CTA;

const LINKS = [
  ["chamadas", "Chamadas"],
  ["passos", "Como funciona"],
  ["precos", "Preços"],
  ["piloto", "Piloto"],
  ["perguntas", "Perguntas"],
] as const;

export function SiteNav({ home = "" }: { home?: string }) {
  const to = (id: string) => `${home}#${id}`;
  return (
    <header className="nav" data-nav>
      <span className="nav__progress" aria-hidden="true" />
      <div className="wrap nav__bar">
        <a className="skip-link" href="#conteudo">
          Saltar para o conteúdo
        </a>
        <a className="nav__logo" href={home || "#top"}>
          <LogoMark />
          Linea
        </a>
        <nav className="nav__links" id="nav-links" aria-label="Secções">
          {LINKS.map(([id, label]) => (
            <a key={id} className="nav__link" href={to(id)}>
              {label}
            </a>
          ))}
          <a className="btn btn--primary nav__mobile-cta" href={to("pedido")}>
            <PhoneIcon />
            {ACTION}
          </a>
        </nav>
        <a className="btn btn--primary btn--sm nav__cta" href={to("pedido")}>
          <PhoneIcon />
          {ACTION}
        </a>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded="false"
          aria-controls="nav-links"
          aria-label="Abrir menu"
          data-nav-toggle
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export function SiteFooter({ home = "" }: { home?: string }) {
  const to = (id: string) => `${home}#${id}`;
  return (
    <footer className="footer" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing" data-reveal>
          <span className="closing__glow" aria-hidden="true" />
          <h2 id="close-h">
            Experimente a Linea
            <br />
            nas suas chamadas.
          </h2>
          <p>Respondemos por email para marcar a chamada de demonstração.</p>
          <a className="btn btn--primary btn--lg" href={to("pedido")}>
            <PhoneIcon />
            {ACTION}
            <ArrowIcon />
          </a>
        </div>

        <p className="footer__word" aria-hidden="true">
          Linea
        </p>

        <div className="footer__grid">
          <div className="footer__brand">
            <a className="nav__logo" href={home || "#top"}>
              <LogoMark />
              Linea
            </a>
            <p>Atende o telefone. De dia e de noite.</p>
          </div>
          <div className="footer__col">
            <h3>Produto</h3>
            <a href={to("chamadas")}>Painel</a>
            <a href={to("passos")}>Como funciona</a>
            <a href={to("fluxo")}>Destinos</a>
          </div>
          <div className="footer__col">
            <h3>Preços</h3>
            <a href={to("precos")}>Planos</a>
            <a href={to("piloto")}>Piloto</a>
            <a href={to("perguntas")}>Perguntas</a>
          </div>
          <div className="footer__col">
            <h3>Contacto</h3>
            <a href={to("pedido")}>Pedido</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            {CONTACT_PHONES.map(phone => (
              <a key={phone.e164} href={`tel:${phone.e164}`}>
                {phone.display}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__legal">
          <span>© 2026 Linea. Um produto Dongrie Labs.</span>
        </div>
      </div>
    </footer>
  );
}

export function ActionBar({ home = "" }: { home?: string }) {
  return (
    <nav className="actionbar" aria-label="Ação rápida" data-actionbar>
      <a className="btn btn--primary" href={`${home}#pedido`}>
        <PhoneIcon />
        {ACTION}
      </a>
    </nav>
  );
}
