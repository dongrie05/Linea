"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Calendar, Globe, DollarSign, Bot, Clock } from "lucide-react";
import {
  useAnimationOnScroll,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useAnimationOnScroll";

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Phone,
      title: "Atendimento Automático 24/7",
      description: "Nunca perca uma chamada.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Calendar,
      title: "Agendamento Inteligente",
      description: "Marcações diretas na agenda da sua equipa.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Globe,
      title: "Multilingue",
      description: "O assistente responde em várias línguas.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: DollarSign,
      title: "Redução de Custos",
      description: "Até 5x mais barato que um telefonista humano.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Bot,
      title: "Respostas Naturais",
      description: "O cliente nem percebe que está a falar com uma IA.",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      icon: Clock,
      title: "Resposta Instantânea",
      description: "Atendimento em menos de 2 segundos",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Funcionalidades Principais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra todas as funcionalidades que fazem da Linea a solução
            perfeita para o seu negócio
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <motion.div
                whileHover={{
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(124, 58, 237, 0.3)",
                }}
                className="card p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                  className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Feature highlight */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className={`h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-primary-50 to-accent-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="group">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-bold text-primary-600 mb-2"
              >
                99.9%
              </motion.div>
              <div className="text-gray-600">Disponibilidade</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="group">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-4xl font-bold text-secondary-600 mb-2"
              >
                2s
              </motion.div>
              <div className="text-gray-600">Tempo de resposta</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="group">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="text-4xl font-bold text-accent-600 mb-2"
              >
                24/7
              </motion.div>
              <div className="text-gray-600">Atendimento contínuo</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
