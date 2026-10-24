"use client";

import { useEffect, useRef, useState } from "react";
import {
  m,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Pending from "@/components/Pending";

const STAGES = [
  {
    key: "toque",
    title: "Toque",
    text: "A clínica já fechou. O telefone toca.",
  },
  {
    key: "atende",
    title: "Atende",
    text: "A Linea atende e diz logo que é uma assistente virtual.",
  },
  {
    key: "conversa",
    title: "Conversa",
    text: "Percebe o que o paciente quer. Faz uma pergunta de cada vez.",
  },
  {
    key: "agenda",
    title: "Agenda",
    text: "Vê a agenda da clínica e encontra uma vaga.",
  },
  {
    key: "marcado",
    title: "Marcado",
    text: "A consulta fica marcada. A clínica vê de manhã.",
  },
] as const;

const WORDS = STAGES[2].text.split(" ");

function stepFrom(value: number) {
  if (value < 0.12) return 0;
  if (value < 0.25) return 1;
  if (value < 0.7) return 2;
  if (value < 0.88) return 3;
  return 4;
}

function StoryWord({
  progress,
  text,
  index,
  total,
}: {
  progress: MotionValue<number>;
  text: string;
  index: number;
  total: number;
}) {
  const start = 0.28 + (index / total) * 0.36;
  const end = Math.min(start + 0.045, 0.68);
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  return (
    <m.span style={{ opacity }} className="story-word">
      {text}
      {index < total - 1 ? " " : ""}
    </m.span>
  );
}

export default function StoryStage() {
  const ref = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [step, setStep] = useState(0);
  const [ringing, setRinging] = useState(false);

  const phoneOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.12, 0.2],
    [1, 1, 1, 0]
  );
  const waveOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.16, 0.24, 0.32],
    [0, 1, 1, 0]
  );
  const waveY = useTransform(scrollYProgress, [0.12, 0.25], [0.08, 1]);
  const talkOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.3, 0.66, 0.74],
    [0, 1, 1, 0]
  );
  const beamOpacity = useTransform(
    scrollYProgress,
    [0.66, 0.74, 0.86, 0.92],
    [0, 1, 1, 0]
  );
  const beam = useTransform(scrollYProgress, [0.7, 0.88], [0.04, 1]);
  const beamInv = useTransform(beam, value => 1 / Math.max(value, 0.04));
  const cardOpacity = useTransform(scrollYProgress, [0.86, 0.94], [0, 1]);
  const cardY = useSpring(useTransform(scrollYProgress, [0.88, 1], [-28, 0]), {
    stiffness: 380,
    damping: 26,
  });
  const cardScale = useSpring(
    useTransform(scrollYProgress, [0.88, 1], [0.96, 1]),
    { stiffness: 380, damping: 26 }
  );

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    let onScreen = false;
    let inRing = scrollYProgress.get() < 0.14;
    const syncRing = () => {
      const next = onScreen && inRing;
      setRinging(current => (current === next ? current : next));
    };
    const unsub = scrollYProgress.on("change", value => {
      const nextRing = value < 0.14;
      if (nextRing !== inRing) {
        inRing = nextRing;
        syncRing();
      }
      const nextStep = stepFrom(value);
      setStep(current => (current === nextStep ? current : nextStep));
    });
    const obs = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncRing();
    });
    obs.observe(pin);
    return () => {
      unsub();
      obs.disconnect();
    };
  }, [scrollYProgress]);

  return (
    <div ref={ref} className="story-scroll">
      <div ref={pinRef} className="story-pin">
        <div className="story-glow" aria-hidden="true" />
        <div className="story-pin-inner">
          <div className="story-frame">
            <h2 className="section-title">Uma chamada, do toque à agenda.</h2>
            <p className="label mt-6">{STAGES[step].title}</p>
            <p className="sr-only" aria-live="polite">
              {STAGES[step].title}. {STAGES[step].text}
            </p>
            <div className="story-visual">
              <m.div
                className={`story-layer${ringing ? " is-ringing" : ""}`}
                style={{ opacity: phoneOpacity }}
              >
                <div className="phone">
                  <span className="ring ring-a" />
                  <span className="ring ring-b" />
                  <span className="ring ring-c" />
                  <svg
                    className="phone-svg"
                    viewBox="0 0 72 120"
                    width="72"
                    height="120"
                    aria-hidden="true"
                  >
                    <rect
                      x="10"
                      y="6"
                      width="52"
                      height="108"
                      rx="14"
                      fill="#141821"
                      stroke="#A3C6F5"
                      strokeWidth="2"
                    />
                    <circle cx="36" cy="102" r="3.5" fill="#5B9BF0" />
                  </svg>
                </div>
              </m.div>
              <m.div className="story-layer" style={{ opacity: waveOpacity }}>
                <m.svg
                  className="story-wave"
                  viewBox="0 0 240 48"
                  aria-hidden="true"
                  style={{ scaleY: waveY }}
                >
                  <path
                    d="M2 28 C 22 28, 28 8, 48 8 S 74 40, 96 28 S 122 8, 144 20 S 176 42, 198 24 S 220 16, 238 22"
                    fill="none"
                    stroke="#C6F3FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </m.svg>
              </m.div>
              <m.div className="story-layer" style={{ opacity: talkOpacity }}>
                <p className="story-words">
                  {WORDS.map((word, index) => (
                    <StoryWord
                      key={`${word}-${index}`}
                      progress={scrollYProgress}
                      text={word}
                      index={index}
                      total={WORDS.length}
                    />
                  ))}
                </p>
              </m.div>
              <m.div className="story-layer" style={{ opacity: beamOpacity }}>
                <div className="beam beam-h" aria-hidden="true">
                  <m.div
                    className="beam-grow beam-grow-x"
                    style={{ scaleX: beam }}
                  >
                    <span className="beam-body beam-body-x" />
                    <m.span
                      className="beam-head beam-head-x"
                      style={{ scaleX: beamInv }}
                    />
                  </m.div>
                </div>
                <div className="beam beam-v" aria-hidden="true">
                  <m.div
                    className="beam-grow beam-grow-y"
                    style={{ scaleY: beam }}
                  >
                    <span className="beam-body beam-body-y" />
                    <m.span
                      className="beam-head beam-head-y"
                      style={{ scaleY: beamInv }}
                    />
                  </m.div>
                </div>
              </m.div>
              <m.div className="story-layer" style={{ opacity: cardOpacity }}>
                <m.div
                  className="surface-card story-card"
                  style={{ y: cardY, scale: cardScale }}
                >
                  <p className="label">Agenda</p>
                  <p className="title-sm mt-3">Marcado pela Linea</p>
                  <Pending>
                    Serviço, dia e hora do exemplo. Têm de bater com o áudio.
                  </Pending>
                </m.div>
              </m.div>
            </div>
            <p className="story-caption" aria-hidden={step === 2}>
              {step === 2 ? "\u00A0" : STAGES[step].text}
            </p>
          </div>
        </div>
        <div className="story-progress-track" aria-hidden="true">
          <m.div
            className="story-progress"
            style={{ scaleX: scrollYProgress, originX: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
