import Link from "next/link";
import { EXTRA_CALL_EUR, PLANS } from "@/lib/site";

export default function Pricing() {
  const extra = EXTRA_CALL_EUR.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section id="precos" className="section-anchor">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-measure">
          <h2 className="section-title">
            Preços <span className="tone-warm">claros</span>
          </h2>
          <p className="lede mt-4">Três planos. O preço é por mês, em euros.</p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {PLANS.map(plan => (
            <li
              key={plan.id}
              className="product-card flex flex-col p-6 shadow-none"
            >
              <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">
                {plan.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-[2.75rem] font-semibold tracking-[-0.04em] text-warm tabular-nums">
                  {plan.priceEur}€
                </span>
                <span className="text-muted">/mês</span>
              </p>
              <p className="mt-2 text-muted">
                {plan.callsPerMonth.toLocaleString("pt-PT")} chamadas por mês
              </p>
              <Link
                href={`/formulario?plano=${plan.id}`}
                className="btn btn-primary mt-8"
              >
                Entrar no piloto
              </Link>
            </li>
          ))}
        </ul>

        <p className="caption mt-6">
          Chamada extra: {extra}€. O plano não muda o que a Linea faz: atende,
          responde e marca.
        </p>
      </div>
    </section>
  );
}
