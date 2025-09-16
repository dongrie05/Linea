"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, CheckCircle, Clock, Users, DollarSign, Zap } from "lucide-react";
import {
  useAnimationOnScroll,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/hooks/useAnimationOnScroll";

export default function ProblemSolution() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const problemPoints = [
    { icon: Clock, text: "Perde clientes por não atender a tempo" },
    { icon: DollarSign, text: "Contratar telefonista custa 1200€/mês" },
    { icon: Users, text: "Funcionários limitados por horários" },
    { icon: X, text: "Chamadas perdidas = receita perdida" },
  ];

  const solutionPoints = [
    { icon: CheckCircle, text: "Atendimento 24/7 sem interrupções" },
    { icon: DollarSign, text: "Custa até 5x menos que um funcionário" },
    { icon: Zap, text: "Resposta instantânea em segundos" },
    { icon: CheckCircle, text: "Nunca mais perde uma chamada" },
  ];

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            O Problema vs <span className="gradient-text">A Solução</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como a Linea transforma o atendimento telefónico do seu negócio
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Problem Side */}
          <motion.div variants={fadeInLeft} className="relative">
            <motion.div
              whileHover={{
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-3xl p-8 shadow-lg border-l-4 border-red-500"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4"
                >
                  <X className="w-6 h-6 text-red-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">O Problema</h3>
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Negócios perdem clientes porque não atendem chamadas a tempo.
                Contratar um telefonista humano é caro e limitado.
              </p>

              <div className="space-y-4">
                {problemPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <point.icon className="w-4 h-4 text-red-600" />
                    </motion.div>
                    <span className="text-gray-700">{point.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Problem Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="mt-8 bg-red-50 rounded-2xl p-6 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Users className="w-8 h-8 text-red-600" />
                </motion.div>
                <p className="text-red-700 font-semibold">
                  Telefonista stressado
                  <br />
                  <span className="text-sm text-red-600">Custo: 1200€/mês</span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Solution Side */}
          <motion.div variants={fadeInRight} className="relative">
            <motion.div
              whileHover={{
                scale: 1.02,
                rotateY: -2,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-3xl p-8 shadow-lg border-l-4 border-secondary-500"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-4"
                >
                  <CheckCircle className="w-6 h-6 text-secondary-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">A Solução</h3>
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Com linea, nunca mais perde uma chamada. A nossa IA atende,
                responde dúvidas, agenda serviços e confirma marcações em
                segundos.
              </p>

              <div className="space-y-4">
                {solutionPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: -5 }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <point.icon className="w-4 h-4 text-secondary-600" />
                    </motion.div>
                    <span className="text-gray-700">{point.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Solution Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                whileHover={{ scale: 1.05, rotateY: -5 }}
                className="mt-8 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl p-6 text-center"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 bg-gradient-to-r from-secondary-200 to-accent-200 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Zap className="w-8 h-8 text-secondary-600" />
                </motion.div>
                <p className="text-secondary-700 font-semibold">
                  IA Eficiente 24/7
                  <br />
                  <span className="text-sm text-secondary-600">
                    Custo: até 5x menos
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Arrow between sections */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-gradient-to-r from-red-500 to-secondary-500 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-2xl"
            >
              →
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
