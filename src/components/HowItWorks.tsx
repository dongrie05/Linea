const STEPS = [
  {
    title: "A chamada entra",
    text: "A Linea atende na linha que a empresa já usa.",
  },
  {
    title: "A conversa fica escrita",
    text: "Perguntas e respostas aparecem em texto, à medida que a chamada decorre.",
  },
  {
    title: "A marcação entra na agenda",
    text: "Se a Linea não souber responder, a chamada segue para si.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="section-anchor mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="max-w-measure">
        <h2 className="section-title">Como funciona</h2>
        <p className="lede mt-4">Três momentos, na mesma chamada.</p>
      </div>
      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <p className="caption tabular-nums">{index + 1}</p>
            <h3 className="mt-3 text-[1.35rem] font-semibold tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="mt-2 text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
