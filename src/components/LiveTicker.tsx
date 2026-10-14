const CALLS = [
  "Corte · quinta 15:00",
  "Barba · sábado de manhã",
  "Consulta · pedido de marcação",
  "Avaliação · esta semana",
  "Mesa para dois · sexta",
  "Jantar · reserva às 20:00",
  "Corte de criança · quarta",
  "Retorno de consulta · terça",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={hidden ? "ticker-clone" : undefined} aria-hidden={hidden}>
      {CALLS.map(item => (
        <li key={item} className="ticker-item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function LiveTicker() {
  return (
    <section className="ticker" aria-label="Chamadas de exemplo">
      <div className="mx-auto flex max-w-page items-baseline justify-between gap-4 px-5 pb-3 pt-4 sm:px-8">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-violet">
          Chamadas de exemplo
        </p>
        <p className="caption">Ilustrativas. Não são chamadas reais.</p>
      </div>
      <div className="ticker-window pb-4">
        <div className="ticker-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
