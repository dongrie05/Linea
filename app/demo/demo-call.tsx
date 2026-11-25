"use client";

import type { DailyCall } from "@daily-co/daily-js";
import { useEffect, useRef, useState } from "react";
import { Orb } from "@/components/site/logo";
import { asset } from "@/lib/asset";

type Status = {
  state: "ready" | "invalid" | "busy" | "exhausted" | "unavailable";
  remaining?: number;
  limit?: number;
  call?: { url: string; roomToken?: string };
};

const unavailable: Status = { state: "unavailable" };

async function demoRequest(
  token: string,
  action: "status" | "start",
  signal: AbortSignal
) {
  const response = await fetch(asset("/api/demo/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, action }),
    signal,
  });
  return (await response.json()) as Status;
}

const statusMessages: Record<Status["state"], string> = {
  ready: "Convite ativo.",
  invalid: "Este convite é inválido, expirou ou foi desativado.",
  busy: "Já existe uma chamada a iniciar ou em curso para este convite. Aguarde e atualize o estado.",
  exhausted: "Este convite já atingiu o limite de tentativas.",
  unavailable:
    "A demonstração está temporariamente indisponível. Tente novamente.",
};

export function DemoCall() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "connecting" | "in-call" | "ending"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [audioBlocked, setAudioBlocked] = useState(false);
  const scope = useRef<AbortController>();
  const live = useRef<{ room: DailyCall; microphone: MediaStream }>();
  const pending = useRef(false);
  const audio = useRef<HTMLAudioElement>(null);
  const voice = useRef<HTMLDivElement>(null);

  async function refresh(invite: string, signal: AbortSignal) {
    try {
      const result = await demoRequest(invite, "status", signal);
      if (!signal.aborted) setStatus(result);
    } catch {
      if (!signal.aborted) setStatus(unavailable);
    }
  }

  async function disconnect() {
    const session = live.current;
    live.current = undefined;
    voice.current?.style.removeProperty("--demo-level");
    session?.microphone.getTracks().forEach(track => track.stop());
    if (audio.current) audio.current.srcObject = null;
    if (session) await session.room.destroy().catch(() => undefined);
  }

  useEffect(() => {
    function readInvite() {
      setToken(window.location.hash.slice(1));
    }
    readInvite();
    window.addEventListener("hashchange", readInvite);
    return () => window.removeEventListener("hashchange", readInvite);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    scope.current = controller;
    setStatus(null);
    setPhase("idle");
    setFeedback("");
    setAudioBlocked(false);
    if (token) void refresh(token, controller.signal);
    return () => {
      controller.abort();
      void disconnect();
    };
  }, [token]);

  async function finish(message: string) {
    if (!live.current || !token || !scope.current) return;
    const { signal } = scope.current;
    setPhase("ending");
    await disconnect();
    if (signal.aborted) return;
    setAudioBlocked(false);
    setFeedback(message);
    await refresh(token, signal);
    if (!signal.aborted) setPhase("idle");
  }

  async function playAudio() {
    if (!audio.current?.srcObject) return;
    try {
      await audio.current.play();
      setAudioBlocked(false);
    } catch {
      setAudioBlocked(true);
    }
  }

  async function startCall() {
    if (!token || !scope.current || pending.current) return;
    pending.current = true;
    const { signal } = scope.current;
    setPhase("connecting");
    setFeedback("");
    let microphone: MediaStream | undefined;
    try {
      try {
        microphone = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        if (!signal.aborted)
          setFeedback(
            "Permita o acesso ao microfone no navegador para iniciar a chamada."
          );
        return;
      }
      const { default: DailyIframe } = await import("@daily-co/daily-js");
      if (signal.aborted) return;
      const result = await demoRequest(token, "start", signal);
      if (signal.aborted) return;
      setStatus(result);
      if (!result.call) return;
      const { url, roomToken } = result.call;
      const track = microphone.getAudioTracks()[0];
      if (!track) throw new Error("Microfone indisponível");
      const room = DailyIframe.createCallObject({
        audioSource: track,
        videoSource: false,
        startVideoOff: true,
      });
      live.current = { room, microphone };
      microphone = undefined;

      room.on("track-started", event => {
        if (
          live.current?.room !== room ||
          !event.participant ||
          event.participant.local ||
          event.track.kind !== "audio" ||
          !audio.current
        )
          return;
        audio.current.srcObject = new MediaStream([event.track]);
        void playAudio();
      });
      room.on("remote-participants-audio-level", event => {
        if (live.current?.room !== room) return;
        const level = Math.max(
          0,
          ...Object.values(event.participantsAudioLevel)
        );
        voice.current?.style.setProperty(
          "--demo-level",
          String(Math.min(1, level * 3))
        );
      });
      room.on("left-meeting", () => {
        if (live.current?.room === room) void finish("A chamada terminou.");
      });
      room.on("participant-left", event => {
        if (live.current?.room === room && !event.participant.local)
          void finish("A chamada terminou.");
      });
      room.on("error", () => {
        if (live.current?.room === room)
          void finish("A ligação foi interrompida.");
      });
      await room.join({ url, ...(roomToken ? { token: roomToken } : {}) });
      if (!signal.aborted && live.current?.room === room) {
        setPhase("in-call");
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          void room
            .startRemoteParticipantsAudioLevelObserver(100)
            .catch(() => undefined);
        }
      }
    } catch {
      await disconnect();
      if (!signal.aborted) {
        setFeedback(
          "Não foi possível iniciar a chamada. Atualize o estado do convite e tente novamente."
        );
        setStatus(unavailable);
      }
    } finally {
      microphone?.getTracks().forEach(track => track.stop());
      pending.current = false;
      if (!signal.aborted && !live.current) setPhase("idle");
    }
  }

  return (
    <div className="demo-session__controls">
      <audio ref={audio} />
      <div
        className="demo-voice"
        data-phase={phase}
        ref={voice}
        aria-hidden="true"
      >
        <div className="demo-voice__stage">
          <span className="demo-voice__ring" />
          <span className="demo-voice__ring" />
          <div className="demo-voice__orb">
            <Orb />
          </div>
        </div>
        <div className="demo-voice__wave">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="demo-session__actions">
        <div aria-live="polite">
          <p>
            {token === ""
              ? "Para iniciar a demonstração, abra o link do convite que recebeu."
              : phase === "connecting"
                ? "A ligar…"
                : phase === "in-call"
                  ? "Chamada em curso."
                  : phase === "ending"
                    ? "A terminar…"
                    : status
                      ? statusMessages[status.state]
                      : "A verificar o convite…"}
          </p>
          {typeof status?.remaining === "number" &&
            typeof status.limit === "number" &&
            status.state !== "invalid" && (
              <p>
                Tentativas restantes: {status.remaining} de {status.limit}.
              </p>
            )}
          {feedback && <p>{feedback}</p>}
        </div>
        {phase === "in-call" && (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => void finish("A chamada terminou.")}
          >
            Terminar chamada
          </button>
        )}
        {phase === "in-call" && audioBlocked && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => void playAudio()}
          >
            Ativar som
          </button>
        )}
        {phase === "idle" && status?.state === "ready" && (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => void startCall()}
          >
            Iniciar chamada
          </button>
        )}
        {phase === "idle" &&
          (status?.state === "busy" || status?.state === "unavailable") &&
          token && (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() =>
                scope.current && void refresh(token, scope.current.signal)
              }
            >
              Atualizar estado
            </button>
          )}
      </div>
    </div>
  );
}
