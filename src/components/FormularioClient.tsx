"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm";

export default function FormularioClient() {
  const params = useSearchParams();
  const plano = params.get("plano") ?? undefined;

  return (
    <div>
      <div className="-mt-16 px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-measure">
          <h1 className="display-hero">
            Entrar no <span className="tone-blue">piloto</span>
          </h1>
          <p className="lede mt-4">
            Diga o negócio e o plano. O pedido abre no WhatsApp ou no email. Não
            fica gravado neste site.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-page px-5 py-12 sm:px-8 sm:py-16">
        <div className="paper max-w-measure rounded-2xl border border-line p-5 sm:p-8">
          <ContactForm initialPlan={plano} />
        </div>
      </div>
    </div>
  );
}
