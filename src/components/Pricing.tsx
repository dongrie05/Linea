"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star, ArrowRight } from "lucide-react";
import {
  useAnimationOnScroll,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useAnimationOnScroll";

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Starter",
      price: "99",
      calls: "250",
      period: "mês",
      features: [
        "Até 250 chamadas/mês",
        "Suporte por email",
        "Configuração básica",
      ],
      cta: "Começar Agora",
      popular: false,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      name: "Growth",
      price: "199",
      calls: "500",
      period: "mês",
      features: [
        "Até 500 chamadas/mês",
        "Suporte prioritário",
        "Configuração avançada",
        "Relatórios detalhados",
      ],
      cta: "Começar Agora",
      popular: true,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
    },
    {
      name: "Pro",
      price: "899",
      calls: "2500",
      period: "mês",
      features: [
        "Até 2500 chamadas/mês",
        "Suporte 24/7",
        "Configuração personalizada",
        "Relatórios avançados",
        "Integração CRM",
      ],
      cta: "Começar Agora",
      popular: false,
      color: "from-accent-500 to-accent-600",
      bgColor: "bg-accent-50",
    },
  ];

  return (
    <section ref={ref} id="pricing" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Planos e Preços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Contratar um telefonista humano custa em média 1200€/mês.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
          >
            <span>💸</span>
            <span>Contratar telefonista: 1200€/mês</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className={`relative ${plan.popular ? "md:-mt-8" : ""}`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(34, 197, 94, 0.3)",
                        "0 0 40px rgba(34, 197, 94, 0.6)",
                        "0 0 20px rgba(34, 197, 94, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1"
                  >
                    <Star className="w-4 h-4" />
                    <span>Mais Popular</span>
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: plan.popular
                    ? "0 25px 50px rgba(0,0,0,0.15), 0 0 30px rgba(34, 197, 94, 0.2)"
                    : "0 20px 40px rgba(0,0,0,0.1)",
                }}
                className={`card p-8 h-full ${
                  plan.popular ? "border-2 border-secondary-200 shadow-2xl" : ""
                } transition-all duration-300`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="text-5xl font-bold text-gray-900"
                    >
                      €{plan.price}
                    </motion.span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center space-x-2 ${plan.bgColor} px-4 py-2 rounded-full`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {plan.calls} chamadas/{plan.period}
                    </span>
                  </motion.div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + featureIndex * 0.1,
                      }}
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href={`/formulario?plano=${plan.name}`}
                  whileHover={{
                    scale: 1.05,
                    x: [0, -2, 2, -2, 2, 0], // Shake effect
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5 },
                    scale: { duration: 0.2 },
                  }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:shadow-lg bg-gradient-to-r ${plan.color} flex items-center justify-center space-x-2`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Extra Calls Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-lg inline-block"
          >
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">
                Chamadas extra: 0,10€/chamada
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Sem taxas de setup • Cancelamento a qualquer momento • Suporte
              incluído
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
