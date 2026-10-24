"use client";

import { useEffect, useState } from "react";
import { EXAMPLE_AUDIO_PATH, publicPath } from "@/lib/site";

type AudioState = "checking" | "ready" | "missing";

export default function StoryAudio() {
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

  if (state === "ready") {
    return (
      <div className="mt-8 max-w-measure">
        <audio controls preload="none" src={src} className="w-full">
          O seu browser não reproduz este áudio.
        </audio>
      </div>
    );
  }

  return (
    <p className="lede mt-8 max-w-measure">
      {state === "checking"
        ? "A procurar o exemplo."
        : "O exemplo em áudio ainda não está publicado. Por agora, leia a conversa."}
    </p>
  );
}
