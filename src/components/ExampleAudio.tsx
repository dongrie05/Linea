"use client";

import { useEffect, useState } from "react";
import { ListenBars } from "@/components/TradeMarks";
import { EXAMPLE_AUDIO_PATH, publicPath } from "@/lib/site";

type AudioState = "checking" | "ready" | "missing";

export default function ExampleAudio() {
  const src = publicPath(EXAMPLE_AUDIO_PATH);
  const [state, setState] = useState<AudioState>("checking");

  useEffect(() => {
    const audio = new Audio();
    let settled = false;

    const ready = () => {
      if (settled) return;
      settled = true;
      setState("ready");
    };
    const missing = () => {
      if (settled) return;
      settled = true;
      setState("missing");
    };

    audio.preload = "metadata";
    audio.addEventListener("loadedmetadata", ready);
    audio.addEventListener("error", missing);
    audio.src = src;

    return () => {
      settled = true;
      audio.removeEventListener("loadedmetadata", ready);
      audio.removeEventListener("error", missing);
      audio.src = "";
    };
  }, [src]);

  return (
    <section id="ouvir" className="band-sand section-anchor">
      <div className="mx-auto grid max-w-page items-end gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-measure">
          <h2 className="display-hero">
            Ouça a <span className="tone-warm">Linea</span>
          </h2>
          <p className="lede mt-4">
            Um exemplo encenado, cerca de 30 segundos. Não é a chamada de um
            cliente.
          </p>
          <div className="mt-8 max-w-measure">
            {state === "ready" ? (
              <audio controls preload="none" src={src} className="w-full">
                O seu browser não reproduz este áudio.
              </audio>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-elevated/70 px-5 py-6">
                <p className="text-[1.0625rem]">
                  {state === "checking"
                    ? "A procurar o exemplo."
                    : "O exemplo em áudio ainda não está publicado."}
                </p>
                {state === "missing" && (
                  <p className="caption mt-2">
                    Falta o ficheiro public/audio/exemplo.mp3.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <ListenBars />
      </div>
    </section>
  );
}
