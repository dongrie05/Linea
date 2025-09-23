"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import {
  useAnimationOnScroll,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/hooks/useAnimationOnScroll";

export default function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como funciona o atendimento telefónico com IA em Portugal?",
      answer:
        "A Linea é uma IA portuguesa que atende automaticamente todas as chamadas da sua empresa. Responde em português natural, agenda compromissos e encaminha chamadas importantes. Funciona 24/7 com resposta em menos de 2 segundos.",
    },
    {
      question:
        "Quanto custa um atendimento telefónico IA comparado com humano?",
      answer:
        "O atendimento humano custa em média 1200€/mês. Com a Linea IA, poupa até 70% - desde 99€/mês para 250 chamadas até 899€/mês para 2500 chamadas. Sem custos de formação, férias ou subsídios.",
    },
    {
      question:
        "A IA de atendimento telefónico funciona com qualquer empresa portuguesa?",
      answer:
        "Sim, funciona com qualquer tipo de empresa em Portugal - restaurantes, clínicas, barbearias, escritórios, lojas. Funciona com números fixos e móveis, e pode ser configurada em menos de 1 dia.",
    },
    {
      question:
        "O que acontece quando a IA não consegue responder uma pergunta?",
      answer:
        "A IA encaminha automaticamente a chamada para si com todos os detalhes da conversa. Nunca perde uma oportunidade de negócio. Pode também configurar respostas personalizadas para perguntas específicas do seu ramo.",
    },
    {
      question:
        "Como configurar atendimento telefónico IA para a minha empresa?",
      answer:
        "É muito simples: escolha o plano, forneça informações sobre a sua empresa, configure as respostas personalizadas e em 1 dia o sistema está ativo. Não precisa de instalar nada - funciona através da sua linha telefónica existente.",
    },
    {
      question: "A IA de atendimento telefónico funciona 24 horas por dia?",
      answer:
        "Sim, a Linea funciona 24/7 sem interrupções. Nunca perde uma chamada, mesmo fora do horário comercial, fins de semana ou feriados. Resposta instantânea em qualquer momento.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre respostas para as perguntas mais frequentes sobre a Linea
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{
                      rotate: openIndex === index ? 45 : 0,
                      scale: openIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-primary-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-400" />
                    )}
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="px-8 pb-6"
                      >
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Ainda tem dúvidas?</h3>
            <p className="text-lg mb-6 opacity-90">
              A nossa equipa está aqui para ajudar. Contacte-nos e teremos todo
              o prazer em esclarecer as suas questões.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/Linea/formulario"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Contactar Suporte
              </motion.a>
              <motion.a
                href="/Linea/formulario"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Agendar Demo
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
