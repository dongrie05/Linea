"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star, ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/hooks/useAnimationOnScroll";
import { PLANS, PILOT, formatEuro } from "@/lib/site";

const planStyle = {
  Starter: {
    config: "Configuração básica",
    popular: false,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50",
  },
  Growth: {
    config: "Configuração avançada",
    popular: true,
    color: "from-secondary-500 to-secondary-600",
    bgColor: "bg-secondary-50",
  },
  Pro: {
    config: "Configuração personalizada",
    popular: false,
    color: "from-accent-500 to-accent-600",
    bgColor: "bg-accent-50",
  },
} as const;

const comparisonRows = [
  { key: "founder", label: "Preço de fundador" },
  { key: "normal", label: "Preço normal" },
  { key: "minutes", label: "Minutos incluídos" },
  { key: "extra", label: "Minuto extra" },
] as const;

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = PLANS.map(plan => {
    const style = planStyle[plan.id];
    return {
      ...plan,
      ...style,
      period: "mês",
      minutesLabel: `${plan.minutesPerMonth} minutos/mês`,
      features: [
        `${plan.minutesPerMonth} minutos incluídos`,
        `Minuto extra: ${formatEuro(plan.extraMinuteEur)} €`,
        style.config,
      ],
      cta: "Começar agora",
    };
  });

  return (
    <section ref={ref} id="pricing" className="section-padding bg-gray-50">
      <div className="container-custom" data-scroll-reveal>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Preços do Atendimento Telefónico IA
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planos mensais com minutos incluídos. O preço de fundador tem{" "}
            {PILOT.founderDiscountPercent}% de desconto e vale{" "}
            {PILOT.founderMonths} meses.
          </p>
        </motion.div>

        <motion.div
          id="piloto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700 mb-2">
                Piloto
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Duas semanas grátis
              </h3>
              <p className="text-gray-600 max-w-2xl">
                A caução é de {PILOT.depositEur} € e é devolvida se avançar para
                um plano. Quem entra no piloto fica com o preço de fundador
                durante {PILOT.founderMonths} meses.
              </p>
            </div>
            <motion.a
              href="/formulario?piloto=1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Entrar no piloto</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 pt-4"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={staggerItem}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className={`relative ${plan.popular ? "lg:-mt-8" : ""}`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
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
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 whitespace-nowrap"
                  >
                    <Star className="w-3 h-3" />
                    <span>Mais popular</span>
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
                className={`card p-8 h-full flex flex-col ${
                  plan.popular ? "border-2 border-secondary-200 shadow-2xl" : ""
                } transition-all duration-300`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-end justify-center gap-3 mb-2">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="text-5xl font-bold text-gray-900 leading-none"
                    >
                      {formatEuro(plan.founderPriceEur)} €
                    </motion.span>
                    <span className="text-xl text-gray-400 line-through leading-none mb-1">
                      {formatEuro(plan.priceEur)} €
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">por {plan.period}</p>
                  <p className="text-sm font-medium text-primary-700 mb-4">
                    Preço de fundador, vale {PILOT.founderMonths} meses
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center space-x-2 ${plan.bgColor} px-4 py-2 rounded-full`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {plan.minutesLabel}
                    </span>
                  </motion.div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
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
                    x: [0, -2, 2, -2, 2, 0],
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    x: { duration: 0.5 },
                    scale: { duration: 0.2 },
                  }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:shadow-lg bg-gradient-to-r ${plan.color} flex items-center justify-center space-x-2 mt-auto`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Comparação dos planos
          </h3>
          <p className="text-gray-600 text-center mb-6">
            O preço de fundador tem {PILOT.founderDiscountPercent}% de desconto
            e vale {PILOT.founderMonths} meses. Depois aplica-se o preço normal.
          </p>

          <div className="md:hidden space-y-4">
            {plans.map(plan => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl shadow-lg p-5 ${
                  plan.popular ? "border-2 border-secondary-200" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    {plan.name}
                  </h4>
                  {plan.popular && (
                    <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                      Mais popular
                    </span>
                  )}
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500">Preço de fundador</dt>
                    <dd className="font-semibold text-gray-900">
                      {formatEuro(plan.founderPriceEur)} €
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500">Preço normal</dt>
                    <dd className="text-gray-500 line-through">
                      {formatEuro(plan.priceEur)} €
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500">Minutos incluídos</dt>
                    <dd className="font-medium text-gray-900">
                      {plan.minutesPerMonth}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500">Minuto extra</dt>
                    <dd className="font-medium text-gray-900">
                      {formatEuro(plan.extraMinuteEur)} €
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-left">
                <caption className="sr-only">
                  Plano, preço de fundador, preço normal, minutos incluídos e
                  minuto extra
                </caption>
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm">
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Plano
                    </th>
                    {comparisonRows.map(row => (
                      <th
                        key={row.key}
                        scope="col"
                        className="px-6 py-4 font-semibold"
                      >
                        {row.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.map(plan => (
                    <tr
                      key={plan.id}
                      className={
                        plan.popular
                          ? "bg-secondary-50 border-t border-secondary-100"
                          : "border-t border-gray-100"
                      }
                    >
                      <th
                        scope="row"
                        className="px-6 py-5 font-semibold text-gray-900"
                      >
                        <span className="inline-flex items-center gap-2">
                          {plan.name}
                          {plan.popular && (
                            <span className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                              Mais popular
                            </span>
                          )}
                        </span>
                      </th>
                      <td className="px-6 py-5 font-semibold text-gray-900">
                        {formatEuro(plan.founderPriceEur)} €
                      </td>
                      <td className="px-6 py-5 text-gray-400 line-through">
                        {formatEuro(plan.priceEur)} €
                      </td>
                      <td className="px-6 py-5 text-gray-700">
                        {plan.minutesPerMonth}
                      </td>
                      <td className="px-6 py-5 text-gray-700">
                        {formatEuro(plan.extraMinuteEur)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
