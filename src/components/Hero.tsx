"use client";

import { useEffect, useState } from "react";
import CallSheet from "@/components/CallSheet";
import Pending from "@/components/Pending";
import TalkCard from "@/components/TalkCard";

type Panel = "falar" | "receber" | null;

export default function Hero() {
  const [panel, setPanel] = useState<Panel>(null);

  useEffect(() => {
    const apply = (value: string | null) => {
      if (value === "falar" || value === "receber") {
        setPanel(value);
        return;
      }
      setPanel(current => (current && value === null ? null : current));
    };

    const fromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "falar" || hash === "receber") {
        apply(hash);
        return;
      }
      if (hash) setPanel(null);
    };

    const onOpen = (event: Event) => {
      apply((event as CustomEvent<string>).detail);
    };

    fromHash();
    window.addEventListener("linea-open", onOpen);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener("linea-open", onOpen);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  return (
    <section
      id="topo"
      className="relative px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36"
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-page text-center">
        <p className="label">Para clínicas dentárias em Portugal</p>
        <h1 className="display-hero mx-auto mt-5 max-w-[18ch] sm:max-w-none">
          O paciente liga.
          <span className="mt-3 block">A Linea atende.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-measure">
          Quando a receção está com alguém na cadeira, ou a clínica já fechou, a
          Linea atende o telefone em português de Portugal. Responde com a
          informação da sua clínica e marca a consulta na agenda.
        </p>
        <div
          id="falar"
          className="mt-8 flex scroll-mt-28 flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setPanel("falar")}
          >
            Falar com a Linea
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPanel("receber")}
          >
            Receber uma chamada
          </button>
        </div>
        {panel === "falar" ? <TalkCard onClose={() => setPanel(null)} /> : null}
        <div className="mx-auto mt-6 max-w-measure text-left sm:text-center">
          <p className="caption">
            Vai falar com uma assistente de IA. A demonstração usa uma clínica
            inventada, a Clínica Exemplo.
          </p>
          <Pending>
            Duração máxima da demonstração, em minutos. A especificação sugere
            3.
          </Pending>
          <Pending>
            A frase «A chamada não é gravada.» só entra no site se a gravação
            estiver mesmo desligada no assistente de demonstração.
          </Pending>
        </div>
      </div>
      <CallSheet open={panel === "receber"} onClose={() => setPanel(null)} />
    </section>
  );
}
