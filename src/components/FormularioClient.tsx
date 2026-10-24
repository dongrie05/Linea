"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Pending from "@/components/Pending";

export default function FormularioClient() {
  const params = useSearchParams();
  const plano = params.get("plano") ?? undefined;

  return (
    <div>
      <div className="mx-auto max-w-page px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <div className="max-w-measure">
          <h1 className="display-hero">Fale comigo.</h1>
          <p className="mt-4">
            Diga-me o nome da clínica e a cidade. Respondo eu.
          </p>
          <Pending>Prazo real de resposta.</Pending>
          <p className="lede mt-4">
            O pedido abre no WhatsApp ou no email. Não fica gravado neste site.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-page px-5 pb-16 sm:px-8">
        <div className="surface-card max-w-measure p-5 sm:p-8">
          <ContactForm initialPlan={plano} />
        </div>
      </div>
    </div>
  );
}
