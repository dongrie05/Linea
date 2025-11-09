"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AISearchOptimization() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
            Perguntas Frequentes sobre <strong>Linea</strong> - Atendedor de
            Chamadas com IA
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Respostas diretas para as principais dúvidas sobre o{" "}
            <strong>atendimento telefónico automático</strong> e o{" "}
            <strong>atendedor de chamadas</strong> com Inteligência Artificial
            da Linea
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Pergunta 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                O que é atendimento telefónico com IA? Como funciona o atendedor
                de chamadas Linea?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                O <strong>atendimento telefónico com IA</strong> é um sistema
                automatizado que utiliza Inteligência Artificial para responder
                chamadas telefónicas de forma natural. A <strong>Linea</strong>{" "}
                é um <strong>atendedor de chamadas automático</strong> que
                compreende o que o cliente diz, responde em português fluido,
                agenda compromissos e encaminha chamadas importantes para o
                responsável. Funciona 24 horas por dia, 7 dias por semana, sem
                necessidade de pausas ou férias.
              </p>
            </div>

            {/* Pergunta 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Como funciona o atendedor de chamadas Linea em Portugal?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Em Portugal, o{" "}
                <strong>atendimento telefónico IA da Linea</strong> funciona
                através da sua linha telefónica existente. Não precisa de
                instalar equipamentos especiais. O{" "}
                <strong>atendedor automático de chamadas</strong> responde
                automaticamente a todas as chamadas, identifica a intenção do
                cliente, fornece informações sobre serviços, agenda consultas ou
                compromissos, e encaminha chamadas urgentes para si. Tudo em
                português natural e com sotaque português.
              </p>
            </div>

            {/* Pergunta 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quanto custa ter atendimento telefónico IA?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                O custo do atendimento telefónico IA varia conforme o volume de
                chamadas. Na Linea, os preços começam em 99€/mês para até 250
                chamadas, 199€/mês para 500 chamadas, e 899€/mês para 2500
                chamadas. Comparado com um telefonista humano (que custa em
                média 1200€/mês), pode poupar até 70% nos custos de atendimento.
              </p>
            </div>

            {/* Pergunta 4 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Que tipos de empresas podem usar atendimento telefónico IA?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Qualquer empresa em Portugal pode usar atendimento telefónico
                IA: restaurantes, clínicas médicas, barbearias, escritórios de
                advogados, lojas, empresas de serviços, consultórios, academias,
                hotéis, e muito mais. A IA adapta-se ao tipo de negócio e pode
                ser configurada com respostas específicas para cada sector.
              </p>
            </div>

            {/* Pergunta 5 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Como configurar atendimento telefónico IA para a minha empresa?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Configurar atendimento telefónico IA é simples: escolha o plano
                adequado, forneça informações sobre a sua empresa e serviços,
                configure respostas personalizadas para perguntas frequentes, e
                em 1 dia o sistema está ativo. Não precisa de conhecimentos
                técnicos - a equipa da Linea faz toda a configuração por si.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
