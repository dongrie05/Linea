"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Clock, Euro, MapPin, Users, Phone } from "lucide-react";

export default function BusinessSummary() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const summaryPoints = [
    {
      icon: Users,
      title: "Quem Somos",
      description:
        "Linea - Primeira empresa portuguesa especializada em atendimento telefónico com Inteligência Artificial",
    },
    {
      icon: Phone,
      title: "O que Oferecemos",
      description:
        "Atendimento telefónico automatizado 24/7 com IA que responde, agenda e organiza chamadas em português natural",
    },
    {
      icon: Clock,
      title: "Horários de Funcionamento",
      description:
        "Atendimento disponível 24 horas por dia, 7 dias por semana, incluindo fins de semana e feriados",
    },
    {
      icon: Euro,
      title: "Preços",
      description:
        "Desde 99€/mês (250 chamadas) até 899€/mês (2500 chamadas). Poupe até 70% comparado com atendimento humano (1200€/mês)",
    },
    {
      icon: MapPin,
      title: "Localização",
      description:
        "Empresa portuguesa com suporte local. Atendimento em português e configuração para empresas em Portugal",
    },
    {
      icon: CheckCircle,
      title: "Tempo de Implementação",
      description:
        "Sistema configurado e ativo em 1 dia. Sem necessidade de instalação - funciona com linha telefónica existente",
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
            Informações da Empresa Linea
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo o que precisa de saber sobre o nosso serviço de atendimento
            telefónico IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {summaryPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
