import type { CSSProperties } from "react";
import { FOUNDER_CTA, PILOT, PLANS, formatEuro } from "@/lib/site";
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
    text: "A marcação ou o recado fica no painel e no email. Quem ligou recebe a confirmação por SMS.",
  },
];

const DESTINATIONS = [
  ["Agenda", "A consulta fica marcada"],
  ["SMS", "Quem ligou recebe a confirmação"],
  ["Email", "O recado chega à equipa"],
] as const;

const STATEMENT =
  "Enquanto atende um cliente, a Linea atende o próximo. Percebe o que a pessoa precisa, marca e deixa tudo registado.";

const FAQ = [
  [
    "Posso cancelar quando quiser?",
    "Sim. O cancelamento fica disponível a qualquer momento.",
  ],
  [
    "O que conta num minuto de chamada?",
    "Conta o tempo da chamada atendida. O minuto extra custa o valor do plano.",
  ],
  [
    "A caução cobre as chamadas do piloto?",
    `Depende do plano: ${PLANS.map(plan => `${plan.name} ${plan.depositEur}€`).join(", ")}. É devolvida se avançar para um plano.`,
  ],
  [
    "A Linea substitui a equipa?",
    "Atende quando ninguém atende. Não substitui uma decisão que só uma pessoa da empresa pode tomar.",
  ],
  ["Em que língua responde?", "Em português, no número da empresa."],
] as const;

function SectionHead({
  id,
  title,
  text,
}: {
  id: string;
  title: string;
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
                A sua clínica nunca perde uma chamada.
              </p>
              <p className="hero__lead">
                A Linea atende o telefone, marca consultas e envia a confirmação
                por SMS. De dia e de noite.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary btn--lg" href="#pedido">
                  <PhoneIcon />
                  {FOUNDER_CTA}
                </a>
                <a className="btn btn--ghost btn--lg" href="#chamadas">
                  Ver uma chamada
                </a>
              </div>
              <p className="hero__note">
                Preço de fundador: {PILOT.founderDiscountPercent}% de desconto
                para todos. Piloto de duas semanas.
              </p>
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
              text="A chamada entra no número da empresa. A Linea marca na agenda, confirma por SMS e envia o recado por email a quem está de serviço."
            />
            <div
              className="flow"
              data-reveal
              role="img"
              aria-label="Uma chamada entra na Linea, que marca na agenda, envia o SMS e o recado por email."
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

        <section className="section" id="precos" aria-labelledby="precos-h">
          <div className="wrap">
            <SectionHead
              id="precos-h"
              title="Três planos. Sem taxa de setup."
              text="Paga pelos minutos atendidos. O minuto extra muda com o plano."
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
                    <p className="plan__price">
                      <span data-count={plan.priceEur}>{plan.priceEur}</span>
                      <span className="plan__cur">€</span>
                      <span className="plan__per">/mês</span>
                    </p>
                    <p className="plan__founder">
                      {plan.founderPriceEur}€ por mês,{" "}
                      {PILOT.founderDiscountPercent}% de desconto para todos
                    </p>
                    <ul className="plan__list">
                      <li>
                        <CheckIcon />
                        {plan.minutesPerMonth} minutos incluídos
                      </li>
                      <li>
                        <CheckIcon />
                        Minuto extra a {formatEuro(plan.extraMinuteEur)}€
                      </li>
                      <li>
                        <CheckIcon />
                        Caução de {plan.depositEur}€, devolvida ao avançar
                      </li>
                    </ul>
                    <a
                      className={`btn ${featured ? "btn--primary" : "btn--ghost"} btn--block`}
                      href="#pedido"
                    >
                      {FOUNDER_CTA}
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
                <h2 id="piloto-h">
                  {PILOT.founderDiscountPercent}% de desconto para todos.
                </h2>
                <p>
                  O preço de fundador é para quem entra no piloto:{" "}
                  {PLANS.map(
                    plan => `${plan.name} ${plan.founderPriceEur}€`
                  ).join(", ")}{" "}
                  por mês, fixo durante {PILOT.founderMonths} meses. A caução do
                  piloto segue o plano:{" "}
                  {PLANS.map(plan => `${plan.name} ${plan.depositEur}€`).join(
                    ", "
                  )}
                  . É devolvida se avançar.
                </p>
                <a className="btn btn--primary btn--lg" href="#pedido">
                  {FOUNDER_CTA}
                  <ArrowIcon />
                </a>
              </div>
              <dl className="pilot__facts">
                <div style={d(0)}>
                  <dt>Duração</dt>
                  <dd>2 semanas</dd>
                </div>
                <div style={d(1)}>
                  <dt>Caução, conforme o plano</dt>
                  <dd>
                    {PLANS[0].depositEur} a {PLANS[2].depositEur}€
                  </dd>
                </div>
                <div style={d(2)}>
                  <dt>Desconto de fundador</dt>
                  <dd>
                    <span data-count={PILOT.founderDiscountPercent}>
                      {PILOT.founderDiscountPercent}
                    </span>
                    %
                  </dd>
                </div>
                <div style={d(3)}>
                  <dt>Preço fixo durante</dt>
                  <dd>
                    <span data-count={PILOT.founderMonths}>
                      {PILOT.founderMonths}
                    </span>{" "}
                    meses
                  </dd>
                </div>
              </dl>
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
              {FAQ.map(([q, a], i) => (
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
              <h2 id="pedido-h">Fique com o preço de fundador.</h2>
              <p className="head__text">
                O desconto de {PILOT.founderDiscountPercent}% é para todos.
                Preencha o pedido e o preço fica fixo durante{" "}
                {PILOT.founderMonths} meses.
              </p>
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
