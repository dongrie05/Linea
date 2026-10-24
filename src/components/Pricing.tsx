import Link from "next/link";
import HoverLift from "@/components/HoverLift";
import Reveal from "@/components/Reveal";
import { EXTRA_CALL_EUR, PLANS } from "@/lib/site";

export default function Pricing() {
  const extra = EXTRA_CALL_EUR.toLocaleString("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <section id="precos" className="section-anchor bg-section">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-measure">
          <h2 className="section-title">Preços</h2>
          <p className="mt-4 max-w-measure">
            O plano muda o volume de chamadas. O que a Linea faz é igual em
            todos.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {PLANS.map((plan, index) => (
            <li key={plan.id}>
              <Reveal className="h-full" delay={index * 0.06}>
                <HoverLift className="surface-card flex h-full flex-col p-6">
                  <h3 className="title-sm">{plan.name}</h3>
                  <p className="mt-4 flex items-baseline gap-1">
                    <span className="text-[2.75rem] font-semibold tabular-nums tracking-[-0.03em]">
                      {plan.priceEur} €
                    </span>
                    <span className="text-muted">por mês</span>
                  </p>
                  <p className="mt-2 text-muted">
                    {plan.callsPerMonth.toLocaleString("pt-PT")} chamadas por
                    mês
                  </p>
                  <Link
                    href={`/formulario?plano=${plan.id}`}
                    className="btn btn-primary mt-8"
                  >
                    Quero entrar no piloto
                  </Link>
                </HoverLift>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="caption mt-6">Chamada extra: {extra} €.</p>
      </div>
    </section>
  );
}
