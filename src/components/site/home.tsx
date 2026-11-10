import { PILOT, PLANS, formatEuro } from "@/lib/site";
import { ActionBar, SiteFooter, SiteNav } from "@/components/site/chrome";
import { LeadForm } from "@/components/site/lead-form";

const CALLS = [
  ["Clínica", "Marcação de quinta", "Em curso", "2 min"],
  ["Oficina", "Orçamento de travões", "Em curso", "6 min"],
  ["Restaurante", "Mesa para seis", "Em curso", "9 min"],
  ["Clínica", "Cancelar a consulta", "À espera", "14 min"],
  ["Escritório", "Recado para a sócia", "Fechada", "21 min"],
  ["Loja", "Horário de sábado", "Fechada", "28 min"],
  ["Oficina", "Peça em falta", "Fechada", "36 min"],
  ["Restaurante", "Ementa de grupo", "Fechada", "44 min"],
  ["Clínica", "Resultado de exame", "À espera", "51 min"],
] as const;

function CallVisual({ label }: { label: string }) {
  return (
    <div className="visual-block" role="img" aria-label={label}>
      <svg viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true">
        <rect width="800" height="360" fill="#1f2725" />
        <path
          d="M0 200 C 50 200 50 70 100 70 S 150 320 200 320 250 70 300 70 350 320 400 320 450 70 500 70 550 320 600 320 650 70 700 70 750 200 800 200"
          fill="none"
          stroke="#9fc7b8"
          strokeWidth="10"
        />
      </svg>
    </div>
  );
}

const FLOW = {
  layout: "lanes",
  alt: "Uma chamada entra na Linea, que marca na agenda, envia o recado e avisa a equipa.",
  input: { label: "Chamada", icon: "text:Ch", sub: "Número da empresa" },
  core: { label: "Linea", icon: "text:Li" },
  lanes: [
    { label: "Marcação", icon: "text:Ag", done: true, sub: "Agenda" },
    { label: "Recado", icon: "text:Em", done: true, sub: "Email" },
    { label: "Aviso", icon: "text:Eq", done: true, sub: "Equipa" },
  ],
};

export function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <section
          className="hero hero--split"
          data-enter
          aria-labelledby="hero-h"
        >
          <div className="wrap">
            <div className="hero-text grid hero__grid">
              <div className="hero__text span-5">
                <p className="hero__kicker">
                  <span className="dot" aria-hidden="true" />
                  Caução de {PILOT.depositEur}€ no piloto
                </p>
                <h1 id="hero-h">Atendedor de chamadas para empresas</h1>
                <p className="hero__lead">
                  A Linea atende a chamada, responde em português e regista a
                  marcação ou o recado. O plano Starter custa 99€ por mês e
                  inclui 400 minutos.
                </p>
                <div className="btn-row">
                  <a className="btn btn--primary" href="#pedido">
                    Pedir demonstração
                  </a>
                  <a className="btn btn--secondary" href="#precos">
                    Ver preços
                  </a>
                </div>
              </div>
              <div className="hero__media span-6 start-7">
                <div className="ui ui-panel ui-voice" data-ui="voice">
                  <div className="ui-voice__top">
                    <span className="ui-chip ui-chip--ink">Em chamada</span>
                    <span className="ui-spacer" />
                    <span className="ui-voice__time" data-voice-time>
                      00:42
                    </span>
                  </div>
                  <div className="ui-voice__orb" data-voice-orb />
                  <div className="ui-voice__who">
                    <span className="ui-voice__name">Linea</span>
                    <span className="ui-voice__with">com a receção</span>
                  </div>
                  <div className="ui-voice__cap" data-voice-cap>
                    A marcação de quinta fica às 15:30.
                  </div>
                  <div className="ui-voice__bar">
                    <span className="ui-voice__btn" aria-hidden="true">
                      <svg className="ui-icon" viewBox="0 0 16 16">
                        <rect x="6" y="2" width="4" height="8" rx="2" />
                        <path d="M3.5 8a4.5 4.5 0 0 0 9 0M8 12.5V14" />
                      </svg>
                    </span>
                    <span className="ui-voice__wave" aria-hidden="true">
                      {Array.from({ length: 16 }, (_, i) => (
                        <i
                          key={i}
                          style={{ ["--h" as string]: 6 + ((i * 3) % 12) }}
                        />
                      ))}
                    </span>
                    <span
                      className="ui-voice__btn ui-voice__end"
                      aria-hidden="true"
                    >
                      <svg className="ui-icon" viewBox="0 0 16 16">
                        <path d="M2.2 9.6c3.4-2.6 8.2-2.6 11.6 0l-1.1 1.9-2.5-.9V8.9a7.5 7.5 0 0 0-4.4 0v1.7l-2.5.9z" />
                      </svg>
                    </span>
                  </div>
                  <div className="ly-float">
                    <div className="ly-float__row">
                      <span className="ly-live">Nova</span>
                      <span>2 s</span>
                    </div>
                    <div className="ly-float__title">Chamada atendida</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="chamadas"
          style={{ ["--h" as string]: 1 }}
          aria-labelledby="chamadas-h"
        >
          <div className="wrap">
            <div className="grid">
              <h2 className="span-5" id="chamadas-h">
                Chamadas em aberto
              </h2>
              <p className="span-6 start-7">
                A lista fica à esquerda. A chamada aberta mostra o que foi dito
                e o que ficou marcado.{" "}
                <a className="link" href="#passos">
                  Ver os três passos
                </a>
              </p>
            </div>
            <div
              className="ui app fill"
              role="img"
              aria-label="Painel da Linea com a lista de chamadas e a chamada da clínica aberta"
              data-ui-pause-host
            >
              <div className="app__pane app__pane--list">
                <div className="ui ui-panel ui-win" data-ui="window">
                  <div className="ui-win__bar">
                    <span className="ui-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="ui-win__crumb">
                      Linea <i>/</i> <b>Abertas</b>
                    </span>
                  </div>
                  <div className="ui-win__body">
                    <nav className="ui-win__side" aria-hidden="true">
                      <span className="ui-win__nav is-on">
                        Abertas<em>3</em>
                      </span>
                      <span className="ui-win__nav">
                        À espera<em>2</em>
                      </span>
                      <span className="ui-win__nav">Fechadas</span>
                    </nav>
                    <div className="ui-win__main">
                      <div className="ui-win__cols" aria-hidden="true">
                        <span>Origem</span>
                        <span>Assunto</span>
                        <span>Estado</span>
                        <span>Há</span>
                      </div>
                      <ul className="ui-win__rows">
                        {CALLS.map(row => (
                          <li
                            className="ui-win__row"
                            data-row
                            key={row.join("-")}
                          >
                            <span className="ui-avatar" data-tone="1">
                              {row[0].slice(0, 2)}
                            </span>
                            <span className="ui-win__who">{row[0]}</span>
                            <span className="ui-win__sub">{row[1]}</span>
                            <span className="ui-win__st" data-st>
                              {row[2]}
                            </span>
                            <span className="ui-win__age">{row[3]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="app__pane app__pane--open" data-ui-loop>
                <div className="ui ui-panel ui-chat" data-ui="chat">
                  <div className="ui-head">
                    <span className="ui-agent" aria-hidden="true" />
                    <div className="ui-title">Clínica · marcação</div>
                    <span className="ui-chat__online">Em chamada</span>
                  </div>
                  <div className="ui-chat__body">
                    <div className="ui-chat__day">Hoje, 9:41</div>
                    <div className="ui-msg ui-msg--me" data-chat-q>
                      <span className="ui-msg__text">
                        Queria marcar uma consulta para quinta.
                      </span>
                    </div>
                    <div className="ui-msg ui-msg--bot" data-chat-a>
                      <span
                        className="ui-agent ui-msg__av"
                        aria-hidden="true"
                      />
                      <span className="ui-msg__col">
                        <span className="ui-chat__answer">
                          Quinta tem vaga às 15:30. Fica registada em nome da
                          chamada.
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="ui-chat__input">
                    <span className="ui-chat__ph">Transcrição da chamada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="fluxo"
          style={{ ["--h" as string]: 1 }}
          aria-labelledby="fluxo-h"
        >
          <div className="wrap">
            <h2 id="fluxo-h">Destinos de cada chamada</h2>
            <p className="measure">
              A chamada entra no número da empresa. A Linea marca na agenda,
              envia o recado por email e avisa quem está de serviço.
            </p>
            <div
              className="fluxo__stage panel"
              data-fx="grain-gradient"
              data-fx-seed="7"
              data-visual
            >
              <div
                className="dg"
                data-diagram={JSON.stringify(FLOW)}
                role="img"
                aria-label={FLOW.alt}
              >
                <CallVisual label="Uma chamada segue para a agenda, o email e a equipa" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="passos"
          style={{ ["--h" as string]: 1 }}
          aria-labelledby="passos-h"
        >
          <div className="wrap">
            <div className="section-head">
              <h2 id="passos-h">Passos de cada chamada</h2>
              <p>O número da empresa não muda. Muda quem atende.</p>
            </div>
            <div className="grid">
              <article className="card card--row span-4">
                <span className="step-num">1</span>
                <h3>Recebe a chamada</h3>
                <p>A chamada entra no número que a empresa já usa.</p>
                <div className="ui ui-panel" data-ui="checklist">
                  <p>Número da empresa</p>
                </div>
              </article>
              <article className="card card--row span-4">
                <span className="step-num">2</span>
                <h3>Responde à chamada</h3>
                <p>A Linea pergunta o nome e o motivo da chamada.</p>
                <div className="ui ui-panel" data-ui="checklist">
                  <p>Resposta em português</p>
                </div>
              </article>
              <article className="card card--row span-4">
                <span className="step-num">3</span>
                <h3>Regista a chamada</h3>
                <p>A marcação ou o recado fica no painel e no email.</p>
                <div className="ui ui-panel" data-ui="checklist">
                  <p>Recado no painel</p>
                </div>
              </article>
            </div>
            <CallVisual label="A chamada passa do número da empresa para o recado" />
          </div>
        </section>

        <section
          className="section"
          id="marca"
          data-moment="letters-assemble"
          style={{ ["--h" as string]: 1 }}
          aria-label="Atende a chamada"
        >
          <div className="wrap">
            <h2 className="mo-la__type">Atende as chamadas</h2>
            <p>A Linea fala com quem liga e deixa o resultado à equipa.</p>
          </div>
        </section>

        <section
          className="section"
          id="precos"
          style={{ ["--h" as string]: 1 }}
          aria-labelledby="precos-h"
        >
          <div className="wrap">
            <div className="section-head">
              <h2 id="precos-h">Preços das chamadas</h2>
              <p>
                Três planos. O minuto extra muda com o plano. Sem taxa de setup.
              </p>
            </div>
            <div className="grid">
              {PLANS.map(plan => (
                <article
                  key={plan.id}
                  className={`card card--plan span-4${plan.id === "Growth" ? " is-featured" : ""}`}
                >
                  {plan.id === "Growth" ? (
                    <span className="badge">Mais pedido</span>
                  ) : null}
                  <h3>Plano {plan.name}</h3>
                  <div className="ui ui-panel" data-ui="stat">
                    <p>{plan.minutesPerMonth} minutos</p>
                  </div>
                  <p>
                    {plan.minutesPerMonth} minutos por mês. Minuto extra a{" "}
                    {formatEuro(plan.extraMinuteEur)}€.
                  </p>
                  <p className="price">
                    <span data-monthly={plan.priceEur}>{plan.priceEur}€</span>
                    <span>/mês</span>
                  </p>
                  {plan.id === "Growth" ? (
                    <a className="btn btn--primary" href="#pedido">
                      Pedir demonstração
                    </a>
                  ) : (
                    <a className="btn btn--secondary" href="#pedido">
                      Pedir demonstração
                    </a>
                  )}
                  <ul>
                    <li>{plan.minutesPerMonth} minutos incluídos</li>
                    <li>Minuto extra a {formatEuro(plan.extraMinuteEur)}€</li>
                    <li>
                      Preço de fundador {plan.founderPriceEur}€ por mês no
                      piloto
                    </li>
                  </ul>
                </article>
              ))}
            </div>
            <CallVisual label="Os três planos medem-se em minutos de chamada" />
          </div>
        </section>

        <section
          className="section ground-inverse"
          id="piloto"
          data-moment="line-carries-colour"
          data-moment-opts='{"from":"base"}'
          style={{ ["--h" as string]: 1 }}
          aria-labelledby="piloto-h"
        >
          <div className="wrap">
            <h2 id="piloto-h">Piloto das chamadas</h2>
            <div className="rows">
              <div className="row">
                <b>Duração</b>
                <span>Duas semanas</span>
              </div>
              <div className="row">
                <b>Caução</b>
                <span>
                  {PILOT.depositEur}€, devolvida se avançar para um plano
                </span>
              </div>
              <div className="row">
                <b>Preço de fundador</b>
                <span>
                  Desconto de {PILOT.founderDiscountPercent}% durante{" "}
                  {PILOT.founderMonths} meses
                </span>
              </div>
              <div className="row">
                <b>Valores</b>
                <span>
                  {PLANS.map(
                    plan => `${plan.name} ${plan.founderPriceEur}€`
                  ).join(", ")}{" "}
                  por mês
                </span>
              </div>
            </div>
            <a className="link" href="#pedido">
              Pedir o piloto na demonstração
            </a>
          </div>
        </section>

        <section
          className="section"
          id="perguntas"
          style={{ ["--h" as string]: 1 }}
          aria-labelledby="perguntas-h"
        >
          <div className="wrap grid">
            <div className="span-5">
              <h2 id="perguntas-h">Perguntas sobre chamadas</h2>
              <p>Sobre minutos, cancelamento e o que a Linea não faz.</p>
              <a className="link" href="#contact">
                Contactar a Linea
              </a>
              <CallVisual label="Perguntas sobre minutos, cancelamento e língua" />
            </div>
            <div className="span-6 start-7 faq">
              <div className="faq__item">
                <h3>Posso cancelar as chamadas?</h3>
                <p>Sim. O cancelamento fica disponível a qualquer momento.</p>
              </div>
              <div className="faq__item">
                <h3>O que conta num minuto de chamada?</h3>
                <p>
                  Conta o tempo da chamada atendida. O minuto extra custa o
                  valor do plano.
                </p>
              </div>
              <div className="faq__item">
                <h3>A caução cobre as chamadas do piloto?</h3>
                <p>
                  A caução é de {PILOT.depositEur}€ e é devolvida se avançar
                  para um plano.
                </p>
              </div>
              <div className="faq__item">
                <h3>A Linea substitui todas as chamadas?</h3>
                <p>
                  Atende quando ninguém atende. Não substitui uma decisão que só
                  uma pessoa da empresa pode tomar.
                </p>
              </div>
              <div className="faq__item">
                <h3>Em que língua responde às chamadas?</h3>
                <p>Em português, no número da empresa.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="pedido"
          style={{ ["--h" as string]: 1 }}
          aria-labelledby="pedido-h"
        >
          <div className="wrap grid">
            <div className="span-5">
              <h2 id="pedido-h">Pedido sobre as chamadas</h2>
              <CallVisual label="O pedido pede o nome, a empresa e o plano" />
              <p>Diga o plano e o que quer ver. A resposta segue por email.</p>
            </div>
            <div className="span-6 start-7">
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
