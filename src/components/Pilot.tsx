import Link from "next/link";
import { PILOT_OFFER } from "@/lib/site";

export default function Pilot() {
  const price =
    PILOT_OFFER.founderPriceEur == null
      ? "um preço de fundador, ainda sem valor em euros"
      : `${PILOT_OFFER.founderPriceEur}€ por mês`;

  const setup = PILOT_OFFER.includesSetup
    ? PILOT_OFFER.setupNotes
      ? `A configuração está incluída: ${PILOT_OFFER.setupNotes}.`
      : "A configuração está incluída."
    : "A configuração não está incluída nesta proposta.";

  return (
    <section
      id="piloto"
      className="section-anchor mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="max-w-measure">
        <h2 className="section-title">Programa piloto</h2>
        <p className="lede mt-4">
          Uma oferta de quem está a construir a Linea, para os primeiros{" "}
          {PILOT_OFFER.maxBusinesses} negócios. A proposta é {price}. {setup}
        </p>
        {PILOT_OFFER.status !== "confirmed" && (
          <p className="mt-4 text-[1.0625rem]">
            Estes termos ainda estão por confirmar. Não são uma oferta fechada.
          </p>
        )}
        <Link href="/formulario" className="btn btn-primary mt-8">
          Entrar no piloto
        </Link>
      </div>
    </section>
  );
}
