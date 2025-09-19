"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle, Zap, Shield } from "lucide-react";
import {
  useAnimationOnScroll,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useAnimationOnScroll";

export default function FinalCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    { icon: CheckCircle, text: "Configuração em 1 dia" },
    { icon: Zap, text: "Ativação imediata" },
    { icon: Shield, text: "Sem compromisso" },
  ];

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-900/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-accent-900/50 to-transparent"></div>

        {/* Animated Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-white"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
          >
            Chegou a hora de parar de perder chamadas e começar a poupar.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Junte-se a centenas de empresas que já poupam milhares de euros com
            a Linea. Comece hoje mesmo e veja a diferença em menos de 24 horas.
          </motion.p>

          {/* Benefits */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <benefit.icon className="w-5 h-5 text-secondary-400" />
                </motion.div>
                <span className="text-white font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={fadeInUp} className="mb-12">
            <motion.a
              href="/Linea/formulario"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34, 197, 94, 0.3)",
                  "0 0 40px rgba(34, 197, 94, 0.6)",
                  "0 0 20px rgba(34, 197, 94, 0.3)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold text-xl md:text-2xl py-6 px-12 rounded-2xl shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto relative overflow-hidden"
            >
              {/* Ripple effect background */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                  scale: 1,
                  opacity: [0, 0.3, 0],
                }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Começar Agora Gratuitamente</span>
              <ArrowRight className="w-6 h-6 relative z-10" />
            </motion.a>
          </motion.div>

          {/* Urgency Message */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl max-w-2xl mx-auto"
          >
            <motion.p
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-yellow-200 font-medium whitespace-nowrap"
            >
              ⚡ <strong>Oferta Limitada:</strong> Primeiro mês grátis para
              novos clientes. Aproveite esta oportunidade única!
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-secondary-500/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 right-10 w-20 h-20 bg-accent-500/30 rounded-full blur-sm"
      />
    </section>
  );
}
