"use client";

import { useEffect, useState } from "react";
import { EXAMPLE_AUDIO_PATH, publicPath } from "@/lib/site";

type AudioState = "checking" | "ready" | "missing";

export default function StoryAudio() {
  const src = publicPath(EXAMPLE_AUDIO_PATH);
  const [state, setState] = useState<AudioState>("checking");

  useEffect(() => {
    let settled = false;
    const done = (next: AudioState) => {
      if (settled) return;
      settled = true;
      setState(next);
    };

    fetch(src, { method: "HEAD" })
      .then(response => done(response.ok ? "ready" : "missing"))
      .catch(() => done("missing"));

    return () => {
      settled = true;
    };
  }, [src]);

  if (state !== "ready") {
    return (
      <p className="lede mt-8 max-w-measure">
        O exemplo em áudio ainda não está publicado. Por agora, leia a conversa.
      </p>
    );
  }

  return (
    <div className="mt-8 max-w-measure">
      <audio controls preload="none" src={src} className="w-full">
        O seu browser não reproduz este áudio.
      </audio>
    </div>
  );
}
