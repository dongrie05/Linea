"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ShieldCheck, Clock3 } from "lucide-react";
import {
  useAnimationOnScroll,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from "@/hooks/useAnimationOnScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionDuration, tapScale } from "@/lib/motion";
import Hero3D from "@/components/hero/Hero3D";

const trustItems = ["Sem compromisso", "Configuração em 1 dia", "Suporte 24/7"];
const stats = [
  { value: "2s", label: "Tempo médio de resposta" },
  { value: "24/7", label: "Atendimento contínuo" },
  { value: "-70%", label: "Redução média de custo" },
];

export default function HeroSection() {
  const { ref, controls } = useAnimationOnScroll();
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary-950 pt-24">
      <Hero3D />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            "radial-gradient(75% 55% at 18% 32%, rgba(14,165,233,0.22) 0%, transparent 55%)",
            "linear-gradient(105deg, rgba(2,6,23,0.88) 0%, rgba(15,23,42,0.5) 38%, rgba(15,23,42,0.22) 55%, rgba(15,23,42,0.4) 100%)",
          ].join(", "),
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-14 items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInLeft}
            className="text-center xl:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm text-gray-200 mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-secondary-300" />
              <span>A Dongrie Labs product</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-white leading-[1.08] mb-6"
            >
              Atendimento telefónico com IA
              <span className="block text-secondary-300 mt-2">
                para empresas em Portugal
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-gray-200/90 leading-relaxed max-w-2xl mb-8 mx-auto xl:mx-0"
            >
              A Linea atende chamadas, responde dúvidas e agenda marcações em
              segundos. Um fluxo profissional que melhora experiência do cliente
              e reduz custos operacionais desde o primeiro dia.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start"
            >
              <motion.a
                href="/formulario"
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 1.02,
                        boxShadow: "0 0 24px rgba(34,197,94,0.35)",
                      }
                }
                whileTap={reducedMotion ? undefined : tapScale}
                transition={{ duration: motionDuration.fast / 1000 }}
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 text-base sm:text-lg"
              >
                Pedir demonstração
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>

              <motion.a
                href="#pricing"
                whileHover={reducedMotion ? undefined : { scale: 1.02 }}
                whileTap={reducedMotion ? undefined : tapScale}
                transition={{ duration: motionDuration.fast / 1000 }}
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/5 text-white px-7 py-4 text-base sm:text-lg font-medium hover:bg-white/10 transition-colors"
              >
                Ver planos
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center justify-center xl:justify-start gap-x-6 gap-y-3 text-gray-300"
            >
              {trustItems.map(item => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-secondary-300" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={fadeInRight}
            className="w-full max-w-xl mx-auto xl:mx-0 xl:ml-auto"
          >
            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm uppercase tracking-[0.14em] text-gray-300">
                  Performance
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-300/30 px-3 py-1 text-xs text-emerald-200">
                  <Clock3 className="w-3 h-3" />
                  IA ativa
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-white text-xl sm:text-2xl font-semibold leading-tight">
                  Cada chamada é atendida com contexto e resposta imediata.
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  Sem chamadas perdidas, sem esperas longas, sem imagem de marca
                  amadora.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.map(stat => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/15 bg-white/5 p-4"
                  >
                    <p className="text-white text-2xl font-semibold">
                      {stat.value}
                    </p>
                    <p className="text-gray-300 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/40 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/70 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
