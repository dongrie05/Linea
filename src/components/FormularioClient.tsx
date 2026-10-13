"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm";

export default function FormularioClient() {
  const params = useSearchParams();
  const plano = params.get("plano") ?? undefined;

  return (
    <div className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-measure">
        <h1 className="section-title">Entrar no piloto</h1>
        <p className="lede mt-4">
          Diga o negócio e o plano. O pedido abre no WhatsApp ou no email. Não
          fica gravado neste site.
        </p>
      </div>
      <div className="mt-10">
        <ContactForm initialPlan={plano} />
      </div>
    </div>
  );
}
