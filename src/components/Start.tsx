import Reveal from "@/components/Reveal";

const STEPS = [
  {
    title: "Preenche o guião da clínica.",
    text: "Horário, serviços, preços, regras de marcação e urgências. São 10 minutos. O que deixar em branco, a Linea não diz.",
  },
  {
    title: "Eu configuro e testo.",
    text: "Antes de mexer no seu telefone, ligo eu e confirmo preços, marcações, urgências e recados.",
  },
  {
    title: "Ativa o reencaminhamento.",
    text: "A clínica mantém o número de sempre. Quando ninguém atende, ou fora de horas, a chamada passa para a Linea.",
  },
];

export default function Start() {
  return (
    <section id="como-comeca" className="section-anchor bg-section">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-measure">
          <h2 className="section-title">Dez minutos seus. O resto é comigo.</h2>
        </Reveal>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.06}>
                <p className="label">{index + 1}</p>
                <h3 className="title-sm mt-3">{step.title}</h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="caption mt-10 max-w-measure">
          A chamada reencaminhada é paga pela clínica à operadora, ao preço de
          uma chamada nacional. Para desligar basta um código no telefone, por
          exemplo ##61#, e volta tudo ao que era.
        </p>
      </div>
    </section>
  );
}
