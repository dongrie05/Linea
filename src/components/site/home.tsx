import type { CSSProperties, ReactNode } from "react";
import {
  FAQ_ITEMS,
  PLANS_PRICES_CTA,
  FORM_NOTE,
  SPECIAL_NOTE,
  SPECIAL_VALID_NOTE,
  TRIAL_CTA,
  CONFIRM_NOTE,
  MESSAGES_NOTE,
  extraMinutePrices,
  PILOT,
  PLANS,
  formatEuro,
  planMessagesLabel,
} from "@/lib/site";
import { ActionBar, SiteFooter, SiteNav } from "@/components/site/chrome";
import { LeadForm } from "@/components/site/lead-form";
import {
  ArrowIcon,
  CheckIcon,
  LogoMark,
  Orb,
  PhoneIcon,
} from "@/components/site/logo";
import { SiteMotion } from "@/components/site/motion";
import {
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_PHONE_WHATSAPP,
} from "@/lib/contact";

const d = (i: number) => ({ "--i": i }) as CSSProperties;

const HERO_CALL = [
  ["in", "Boa tarde, queria marcar uma consulta para quinta."],
  ["out", "Claro. Quinta tem vaga às 15:30. Pode ser?"],
  ["in", "Pode, obrigado."],
  ["out", "Fica marcado. Vai receber a confirmação por SMS."],
] as const;

const CALLS = [
  ["Clínica", "Marcação de quinta", "Em curso", "agora"],
  ["Oficina", "Orçamento de travões", "Marcado", "6 min"],
  ["Restaurante", "Mesa para seis", "Marcado", "9 min"],
  ["Clínica", "Cancelar a consulta", "Recado", "14 min"],
  ["Escritório", "Recado para a sócia", "Recado", "21 min"],
  ["Loja", "Horário de sábado", "Respondida", "28 min"],
] as const;

const SECTORS = [
  "Clínicas",
  "Clínicas dentárias",
  "Oficinas",
  "Restaurantes",
  "Escritórios",
  "Lojas",
  "Cabeleireiros",
  "Fisioterapia",
];

const STEPS = [
  {
    n: "01",
    title: "Recebe a chamada",
    text: "A chamada entra no número que a empresa já usa. Não muda nada para quem liga.",
  },
  {
    n: "02",
    title: "Responde em português",
    text: "A Linea pergunta o nome e o motivo, consulta a agenda e responde ao que lhe perguntam.",
  },
  {
    n: "03",
    title: "Regista e confirma",
    text: `A marcação ou o recado fica no painel e no email. ${CONFIRM_NOTE}`,
  },
];

const DESTINATIONS = [
  ["Agenda", "A consulta fica marcada"],
  ["WhatsApp ou SMS", "Confirmação, conforme o plano"],
  ["Email", "O recado chega à equipa"],
] as const;

const STATEMENT =
  "Enquanto atende um cliente, a Linea atende o próximo. Percebe o que a pessoa precisa, marca e deixa tudo registado.";

function SectionHead({
  id,
  title,
  text,
}: {
  id: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <div className="head" data-reveal>
      <h2 id={id}>{title}</h2>
      {text ? <p className="head__text">{text}</p> : null}
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <SiteMotion />
      <SiteNav />
      <main id="top">
        <section className="hero" aria-labelledby="hero-h">
          <div className="wrap hero__inner" id="conteudo">
            <div className="hero__text">
              <h1 id="hero-h" className="hero__title">
                {"Atendemos sempre.".split(" ").map((w, i) => (
                  <span className="word" key={w}>
                    <span style={d(i)}>{w}</span>
                  </span>
                ))}
              </h1>
              <p className="hero__promise">
                Atendedor de chamadas com IA. A sua clínica nunca perde uma
                chamada.
              </p>
              <p className="hero__lead">
                A Linea atende o telefone e marca consultas e reservas, de dia e
                de noite. {CONFIRM_NOTE}
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary btn--lg" href="#precos">
                  {PLANS_PRICES_CTA}
                </a>
                <a className="btn btn--ghost btn--lg" href="#chamadas">
                  Ver uma chamada
                </a>
              </div>
              <p className="hero__note">{SPECIAL_NOTE}</p>
            </div>

            <div className="hero__stage" aria-hidden="true">
              <Orb />
              <div className="hero__bars">
                {Array.from({ length: 13 }, (_, i) => (
                  <span key={i} style={d(i)} />
                ))}
              </div>
              <div className="call-card" data-sequence>
                <div className="call-card__head">
                  <span className="dot dot--live" />
                  <span>Chamada em curso</span>
                  <span className="call-card__time">00:42</span>
                </div>
                <ul className="call-card__lines">
                  {HERO_CALL.map(([who, text]) => (
                    <li key={text} className={`bubble bubble--${who}`}>
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="call-card__done">
                  <CheckIcon />
                  Quinta, 15:30 · SMS enviado
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee" id="setores" aria-label="Para quem">
          <p className="marquee__label">
            Para quem não pode largar o que está a fazer para atender
          </p>
          <div className="marquee__track" aria-hidden="true">
            {[0, 1].map(k => (
              <div className="marquee__row" key={k}>
                {SECTORS.map(s => (
                  <span key={s}>
                    {s}
                    <i />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <p className="sr-only">{SECTORS.join(", ")}.</p>
        </section>

        <section className="section" id="chamadas" aria-labelledby="chamadas-h">
          <div className="wrap">
            <SectionHead
              id="chamadas-h"
              title="Cada chamada fica registada."
              text="A lista mostra quem ligou e porquê. A chamada aberta mostra o que foi dito e o que ficou marcado."
            />
            <div
              className="app"
              data-reveal
              role="img"
              aria-label="Painel da Linea com a lista de chamadas e a chamada da clínica aberta"
            >
              <div className="app__bar" aria-hidden="true">
                <span className="app__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="app__crumb">
                  Linea <i>/</i> <b>Chamadas de hoje</b>
                </span>
              </div>
              <div className="app__body" aria-hidden="true">
                <ul className="app__list">
                  {CALLS.map((row, i) => (
                    <li
                      key={row.join("-")}
                      className={`app__row${i === 0 ? " is-on" : ""}`}
                      style={d(i)}
                    >
                      <span className="avatar">{row[0].slice(0, 2)}</span>
                      <span className="app__who">
                        <b>{row[0]}</b>
                        <span>{row[1]}</span>
                      </span>
                      <span
                        className={`tag tag--${row[2] === "Em curso" ? "live" : row[2] === "Marcado" ? "ok" : "muted"}`}
                      >
                        {row[2]}
                      </span>
                      <span className="app__age">{row[3]}</span>
                    </li>
                  ))}
                </ul>
                <div className="app__open">
                  <div className="app__open-head">
                    <Orb size="sm" />
                    <div>
                      <b>Clínica · marcação</b>
                      <span>
                        <span className="dot dot--live" /> Em chamada
                      </span>
                    </div>
                  </div>
                  <div className="app__chat" data-sequence>
                    <p className="app__day">Hoje, 9:41</p>
                    <p className="bubble bubble--in">
                      Queria marcar uma consulta para quinta.
                    </p>
                    <p className="bubble bubble--out">
                      Quinta tem vaga às 15:30. Fica registada em nome da
                      chamada.
                    </p>
                    <p className="bubble bubble--in">Perfeito, obrigado.</p>
                    <div className="app__result">
                      <span className="tag tag--ok">
                        <CheckIcon /> Marcado quinta, 15:30
                      </span>
                      <span className="tag tag--ok">
                        <CheckIcon /> SMS enviado
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="passos"
          aria-labelledby="passos-h"
          data-progress
        >
          <div className="wrap">
            <SectionHead
              id="passos-h"
              title="O número não muda. Muda quem atende."
            />
            <ol className="steps">
              <span className="steps__line" aria-hidden="true">
                <span />
              </span>
              {STEPS.map((s, i) => (
                <li className="step" key={s.n} data-reveal style={d(i)}>
                  <span className="step__n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="fluxo" aria-labelledby="fluxo-h">
          <div className="wrap">
            <SectionHead
              id="fluxo-h"
              title="Cada chamada chega ao sítio certo."
              text={`A chamada entra no número da empresa. A Linea marca na agenda e envia o recado por email a quem está de serviço. ${CONFIRM_NOTE}`}
            />
            <div
              className="flow"
              data-reveal
              role="img"
              aria-label="Uma chamada entra na Linea, que marca na agenda, envia a confirmação por WhatsApp ou SMS conforme o plano e o recado por email."
            >
              <div className="flow__node flow__node--in">
                <span className="flow__icon">
                  <PhoneIcon />
                </span>
                <b>Chamada</b>
                <span>Número da empresa</span>
              </div>
              <svg
                className="flow__wire flow__wire--in"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 5 H100" />
              </svg>
              <div className="flow__core">
                <Orb size="sm" />
                <b>Linea</b>
              </div>
              <svg
                className="flow__wire flow__wire--out"
                viewBox="0 0 100 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 60 C 50 60 50 10 100 10" />
                <path d="M0 60 H100" />
                <path d="M0 60 C 50 60 50 110 100 110" />
              </svg>
              <div className="flow__outs">
                {DESTINATIONS.map(([t, s], i) => (
                  <div
                    className="flow__node flow__node--out"
                    key={t}
                    style={d(i)}
                  >
                    <span className="flow__check">
                      <CheckIcon />
                    </span>
                    <b>{t}</b>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="statement"
          id="marca"
          aria-label="O que a Linea faz"
          data-words
        >
          <div className="wrap">
            <p className="statement__text">
              {STATEMENT.split(" ").map((w, i) => (
                <span key={`${w}-${i}`}>{w} </span>
              ))}
            </p>
          </div>
        </section>

        <section className="section" id="demo" aria-labelledby="demo-h">
          <div className="wrap">
            <div className="pilot spot" data-reveal>
              <span className="pilot__glow" aria-hidden="true" />
              <div className="pilot__text">
                <h2 id="demo-h">Experimente a Linea.</h2>
                <p>
                  Fale com a receção de uma clínica dentária fictícia. Pergunte
                  pelos horários ou simule uma marcação no navegador.
                </p>
                <p>Já recebeu um convite? Abra o link para começar.</p>
              </div>
              <div className="pilot__side">
                <dl className="pilot__facts">
                  <div>
                    <dt>Por convite</dt>
                    <dd>1 ou 3 tentativas</dd>
                  </div>
                  <div>
                    <dt>Por chamada</dt>
                    <dd>Até 3 minutos</dd>
                  </div>
                  <div>
                    <dt>Validade</dt>
                    <dd>7 dias</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="precos" aria-labelledby="precos-h">
          <div className="wrap">
            <SectionHead
              id="precos-h"
              title={
                <>
                  Três planos.
                  <br />
                  Sem taxa de setup.
                </>
              }
              text={`O minuto extra custa ${extraMinutePrices()}. ${MESSAGES_NOTE}`}
            />
            <div className="plans">
              {PLANS.map((plan, i) => {
                const featured = plan.id === "Growth";
                return (
                  <article
                    key={plan.id}
                    className={`plan spot${featured ? " plan--featured" : ""}`}
                    data-reveal
                    style={d(i)}
                  >
                    <div className="plan__top">
                      <h3>{plan.name}</h3>
                      {featured ? (
                        <span className="tag tag--accent">Mais pedido</span>
                      ) : null}
                    </div>
                    <p className="plan__was">
                      <span className="sr-only">Preço normal: </span>
                      <s>{plan.priceEur} €/mês</s>
                    </p>
                    <p className="plan__price">
                      <span className="sr-only">Preço especial: </span>
                      <span data-count={plan.founderPriceEur}>
                        {plan.founderPriceEur}
                      </span>
                      <span className="plan__cur">€</span>
                      <span className="plan__per">/mês</span>
                    </p>
                    <p className="plan__founder">{SPECIAL_VALID_NOTE}</p>
                    <ul className="plan__list">
                      <li>
                        <CheckIcon />
                        {plan.minutesPerMonth} minutos incluídos
                      </li>
                      <li>
                        <CheckIcon />
                        Minuto extra a {formatEuro(plan.extraMinuteEur)} €
                      </li>
                      {plan.messagesPerMonth > 0 ? (
                        <li>
                          <CheckIcon />
                          {planMessagesLabel(plan.messagesPerMonth)}
                        </li>
                      ) : null}
                    </ul>
                    <a
                      className={`btn ${featured ? "btn--primary" : "btn--ghost"} btn--block`}
                      href="#pedido"
                      data-plan={plan.name}
                    >
                      Quero o {plan.name}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="piloto" aria-labelledby="piloto-h">
          <div className="wrap">
            <div className="pilot spot" data-reveal>
              <span className="pilot__glow" aria-hidden="true" />
              <div className="pilot__text">
                <h2 id="piloto-h">Período experimental de 2 semanas.</h2>
                <p>
                  Experimente a LINEA durante {PILOT.trialWeeks} semanas nas
                  suas chamadas. Depois, paga o preço especial do plano nos
                  primeiros {PILOT.specialMonths} meses.
                </p>
                <a className="btn btn--primary btn--lg" href="#pedido">
                  {TRIAL_CTA}
                  <ArrowIcon />
                </a>
              </div>
              <div className="pilot__side">
                <dl className="pilot__facts">
                  <div style={d(0)}>
                    <dt>Duração</dt>
                    <dd>{PILOT.trialWeeks} semanas</dd>
                  </div>
                  <div style={d(1)}>
                    <dt>Preço especial</dt>
                    <dd>
                      <span data-count={PILOT.specialMonths}>
                        {PILOT.specialMonths}
                      </span>{" "}
                      meses
                    </dd>
                  </div>
                </dl>
                <div className="pilot__deposit" style={d(2)}>
                  <table>
                    <caption>Caução do período experimental</caption>
                    <thead className="sr-only">
                      <tr>
                        <th scope="col">Plano</th>
                        <th scope="col">Caução</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PLANS.map(plan => (
                        <tr key={plan.id}>
                          <th scope="row">{plan.name}</th>
                          <td>{plan.depositEur} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p>Devolvida se avançar para um plano.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="perguntas"
          aria-labelledby="perguntas-h"
        >
          <div className="wrap faq-wrap">
            <div className="faq-side" data-reveal>
              <h2 id="perguntas-h">Antes de experimentar.</h2>
              <p className="head__text">
                Sobre minutos, cancelamento e o que a Linea não faz.
              </p>
              <a className="link" href="#pedido">
                Fazer outra pergunta <ArrowIcon />
              </a>
            </div>
            <div className="faq">
              {FAQ_ITEMS.map(([q, a], i) => (
                <details
                  className="faq__item"
                  key={q}
                  data-reveal
                  style={d(i)}
                  open={i === 0}
                >
                  <summary>
                    {q}
                    <span className="faq__icon" aria-hidden="true" />
                  </summary>
                  <div className="faq__body">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="pedido" aria-labelledby="pedido-h">
          <div className="wrap request">
            <div className="request__side" data-reveal>
              <h2 id="pedido-h">Peça para experimentar a LINEA</h2>
              <p className="head__text">{FORM_NOTE}</p>
              <ul className="contacts">
                {CONTACT_PHONES.map(phone => (
                  <li key={phone.e164}>
                    <a href={`tel:${phone.e164}`}>
                      <span className="contacts__icon">
                        <PhoneIcon />
                      </span>
                      <span>
                        <b>Telefone</b>
                        {phone.display}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`https://wa.me/${CONTACT_PHONE_WHATSAPP}`}>
                    <span className="contacts__icon">
                      <LogoMark size={20} />
                    </span>
                    <span>
                      <b>WhatsApp</b>
                      Mensagem direta
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <span className="contacts__icon">@</span>
                    <span>
                      <b>Email</b>
                      {CONTACT_EMAIL}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="request__form" data-reveal>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <ActionBar />
    </>
  );
}
