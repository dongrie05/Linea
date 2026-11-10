import { LogoMark, PhoneIcon } from "@/components/site/logo";

const ACTION = "Experimentar a Linea";

export function SiteNav({ home = "" }: { home?: string }) {
  const to = (id: string) => `${home}#${id}`;
  return (
    <header className="nav nav--centre">
      <div className="wrap nav__bar">
        <a className="skip-link" href={to("top")}>
          Saltar para o conteúdo
        </a>
        <a className="nav__logo" href={home || "#top"}>
          <LogoMark />
          Linea
        </a>
        <nav className="nav__links" aria-label="Secções">
          <div className="nav__item">
            <a className="nav__link" href={to("chamadas")}>
              Chamadas{" "}
              <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M3 4.5l3 3 3-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                <div className="menu-col span-4">
                  <p className="t-label">Produto</p>
                  <a href={to("chamadas")}>
                    Painel de chamadas
                    <span>A lista e a chamada aberta</span>
                  </a>
                  <a href={to("passos")}>
                    Três passos
                    <span>Da chamada ao recado</span>
                  </a>
                  <a href={to("fluxo")}>
                    Destinos
                    <span>Agenda, email e equipa</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <a className="nav__link" href={to("precos")}>
              Preços
            </a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href={to("piloto")}>
              Piloto
            </a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href={to("perguntas")}>
              Perguntas
            </a>
          </div>
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary" href={to("pedido")}>
            <PhoneIcon />
            {ACTION}
          </a>
        </div>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded="false"
          aria-label="Menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M2 5h14M2 13h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export function SiteFooter({ home = "" }: { home?: string }) {
  const to = (id: string) => `${home}#${id}`;
  return (
    <footer className="footer closing" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--word">
          <div className="section-head--split">
            <div>
              <h2 id="close-h">Experimente a Linea nas suas chamadas</h2>
              <p className="t-lead">
                Respondemos por email para marcar a chamada de demonstração.
              </p>
            </div>
            <a className="btn btn--primary" href={to("pedido")}>
              <PhoneIcon />
              {ACTION}
            </a>
          </div>
          <p className="close__word" aria-hidden="true">
            Linea
          </p>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <a className="nav__logo" href={home || "#top"}>
                <LogoMark />
                Linea
              </a>
              <p className="footer__lede">
                Atende o telefone. De dia e de noite.
              </p>
            </div>
            <div className="span-2 footer__col">
              <h3>Chamadas</h3>
              <ul>
                <li>
                  <a href={to("chamadas")}>Painel</a>
                </li>
                <li>
                  <a href={to("passos")}>Passos</a>
                </li>
                <li>
                  <a href={to("fluxo")}>Destinos</a>
                </li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Preços</h3>
              <ul>
                <li>
                  <a href={to("precos")}>Planos</a>
                </li>
                <li>
                  <a href={to("piloto")}>Piloto</a>
                </li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Perguntas</h3>
              <ul>
                <li>
                  <a href={to("perguntas")}>Respostas</a>
                </li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Contacto</h3>
              <ul>
                <li>
                  <a href={to("pedido")}>Pedido</a>
                </li>
                <li>
                  <a href="mailto:linea.atendedor@gmail.com">Email</a>
                </li>
                <li>
                  <a href="tel:+351927699882">+351 927 699 882</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>© 2026 Linea. Um produto Dongrie Labs.</span>
            <div className="socials" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ActionBar({ home = "" }: { home?: string }) {
  return (
    <nav className="actionbar" aria-label="Ação rápida">
      <a className="btn btn--primary" href={`${home}#pedido`}>
        <PhoneIcon />
        {ACTION}
      </a>
    </nav>
  );
}
