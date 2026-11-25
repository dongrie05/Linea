"use client";

import { useEffect, useState } from "react";
import { DEMO_MAX_DURATION_SECONDS } from "@/lib/demo-duration";

export type CallTiming = { startedAt: number; endedAt?: number };

function elapsedSeconds(startedAt: number, now: number) {
  return Math.min(
    DEMO_MAX_DURATION_SECONDS,
    Math.max(0, Math.floor((now - startedAt) / 1000))
  );
}

function formatDuration(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export function CallDuration({ startedAt, endedAt }: CallTiming) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (endedAt !== undefined) return;
    const update = () =>
      setElapsed(elapsedSeconds(startedAt, performance.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [startedAt, endedAt]);

  const duration =
    endedAt === undefined ? elapsed : elapsedSeconds(startedAt, endedAt);

  return (
    <div
      className="demo-session__duration"
      role="timer"
      aria-label="Tempo de chamada"
    >
      <span>Tempo de chamada</span>
      <strong>
        <time dateTime={`PT${duration}S`}>{formatDuration(duration)}</time>
      </strong>
      <span> / {formatDuration(DEMO_MAX_DURATION_SECONDS)}</span>
    </div>
  );
}
