"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Play, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  useAnimationOnScroll,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from "@/hooks/useAnimationOnScroll";

export default function HeroSection() {
  const [isCallActive, setIsCallActive] = useState(false);
  const { ref, controls } = useAnimationOnScroll();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCallActive(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 pt-20">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #7c3aed 100%)",
            "linear-gradient(135deg, #0369a1 0%, #7c3aed 50%, #0c4a6e 100%)",
            "linear-gradient(135deg, #7c3aed 0%, #0c4a6e 50%, #0369a1 100%)",
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #7c3aed 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInLeft}
            className="text-center xl:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            >
              <span className="block">Atendimento Telefónico IA Portugal</span>
              <span className="block">
                Poupe 70% em custos - Resposta em 2 segundos
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-4xl"
            >
              O primeiro assistente telefónico com Inteligência Artificial em
              Portugal que responde, agenda e organiza chamadas automaticamente.
              <span className="block sm:inline">
                {" "}
                Mais rápido, mais barato e sempre disponível.
              </span>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start"
            >
              <motion.a
                href="/Linea/formulario"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 glow inline-flex items-center justify-center w-full sm:w-auto"
              >
                Experimente Já
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline" />
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center w-full sm:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
                Ver Planos e Preços
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap justify-center xl:justify-start gap-4 sm:gap-6 text-gray-300"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm sm:text-base"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 flex-shrink-0" />
                <span>Sem compromisso</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm sm:text-base"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 flex-shrink-0" />
                <span>Configuração em 1 dia</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-sm sm:text-base"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-400 flex-shrink-0" />
                <span>Suporte 24/7</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInRight}
            className="flex justify-center xl:justify-end"
          >
            <div className="relative">
              {/* Phone Mockup */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="phone-mockup w-64 h-80 sm:w-72 sm:h-88 md:w-80 md:h-96 lg:w-80 lg:h-96 xl:w-80 xl:h-96 relative"
              >
                <div className="phone-screen h-full flex flex-col">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-white text-sm mb-4">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Call Interface */}
                  <div className="flex-1 flex flex-col justify-center items-center text-white pt-8">
                    <motion.div
                      animate={{
                        scale: isCallActive ? 1.1 : 1,
                        rotate: isCallActive ? [0, -5, 5, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="w-20 h-20 bg-secondary-500 rounded-full flex items-center justify-center mb-8"
                    >
                      <Phone className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-lg font-semibold mb-3">
                      Chamada Recebida
                    </h3>
                    <p className="text-gray-300 text-center mb-6">
                      {isCallActive ? "IA a atender..." : "Aguardando..."}
                    </p>

                    {/* Call Status */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isCallActive ? 1 : 0,
                        scale: isCallActive ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 w-full"
                    >
                      <div className="flex items-center space-x-2 text-green-400">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                          className="w-2 h-2 bg-green-400 rounded-full"
                        />
                        <span className="text-sm">
                          IA ativa - Respondeu em 2s
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

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
                className="absolute -top-4 -right-4 bg-secondary-500 text-white p-3 rounded-full shadow-lg"
              >
                <CheckCircle className="w-6 h-6" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 bg-accent-500 text-white p-3 rounded-full shadow-lg"
              >
                <Phone className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
