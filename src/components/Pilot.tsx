import Link from "next/link";
import EdgeLight from "@/components/EdgeLight";
import Pending from "@/components/Pending";
import Reveal from "@/components/Reveal";
import { PILOT_OFFER } from "@/lib/site";

export default function Pilot() {
  return (
    <section id="piloto" className="section-anchor bg-section">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <EdgeLight className="edge-card max-w-measure">
            <div className="pilot-card p-6 sm:p-10">
              <p className="label">Piloto</p>
              <h2 className="section-title mt-4">
                Piloto para as primeiras clínicas.
              </h2>
              <Pending>Número de vagas.</Pending>
              <p className="mt-6">
                Configuro a Linea com o guião da sua clínica, ativamos juntos o
                reencaminhamento e no fim vemos quantas chamadas a Linea atendeu
                e quantas marcações fez.
              </p>
              <Pending>
                Duração e custo do piloto. O plano interno propõe 14 dias
                grátis, ainda sem confirmação.
              </Pending>
              <p className="mt-6">
                Quem entra no piloto fica com o preço de fundador, por mês,
                durante um prazo ainda por fechar.
              </p>
              <Pending>Valor em euros e durante quanto tempo.</Pending>
              {PILOT_OFFER.status !== "confirmed" ? (
                <p className="caption mt-6">
                  Termos ainda por fechar. Falamos antes de qualquer
                  compromisso.
                </p>
              ) : null}
              <Link href="/#contacto" className="btn btn-primary mt-8">
                Quero entrar no piloto
              </Link>
            </div>
          </EdgeLight>
        </Reveal>
      </div>
    </section>
  );
}
