"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Phone, Mail, CheckCircle } from "lucide-react";

export default function FormularioPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planoPreSelecionado = searchParams.get("plano") || "Starter";

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    ramo: "",
    plano: planoPreSelecionado,
    funcionarios: "",
    chamadasMes: "",
    urgencia: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [envioMethod, setEnvioMethod] = useState("whatsapp");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const {
      nome,
      email,
      telefone,
      empresa,
      ramo,
      plano,
      funcionarios,
      chamadasMes,
      urgencia,
      mensagem,
    } = formData;

    const message = `🚀 *Nova solicitação - Linea AI*

*Dados do Cliente:*
👤 Nome: ${nome}
📧 Email: ${email}
📱 Telefone: ${telefone}
🏢 Empresa: ${empresa}
🏭 Ramo: ${ramo}

*Plano Selecionado:*
📋 ${plano}

*Detalhes do Negócio:*
👥 Funcionários: ${funcionarios}
📞 Chamadas/mês: ${chamadasMes}
⚡ Urgência: ${urgencia}

*Mensagem:*
${mensagem}

---
*Enviado via formulário Linea*`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (envioMethod === "whatsapp") {
      const whatsappMessage = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/351927699882?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank");
    } else if (envioMethod === "email") {
      // Envia email real
      const emailSubject = `Nova solicitação - Linea AI - ${formData.plano}`;
      const emailBody = `Nova solicitação recebida via formulário Linea:

DADOS DO CLIENTE:
Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone}
Empresa: ${formData.empresa}

PLANO SELECIONADO: ${formData.plano}

DETALHES DO NEGÓCIO:
Funcionários: ${formData.funcionarios}
Chamadas/mês: ${formData.chamadasMes}
Urgência: ${formData.urgencia}

MENSAGEM:
${formData.mensagem}

---
Enviado via formulário Linea`;

      const emailUrl = `mailto:goncalodongrie@icloud.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(emailUrl, "_blank");
    }

    // Simula delay para feedback visual
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Linea</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Atendedor de Chamadas IA</span> -
              Comece a Poupar Hoje
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              O melhor <strong>atendedor de chamadas automático</strong> com
              Inteligência Artificial em Portugal. Preencha o formulário e nossa
              equipa entrará em contacto em menos de 1 dia para configurar o seu{" "}
              <strong>atendimento telefónico IA</strong>.
            </p>
            <div className="flex items-center justify-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-secondary-400" />
                <span>Configuração em 1 dia</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-secondary-400" />
                <span>Sem compromisso</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="O seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="+351 123 456 789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ramo de Atividade *
                  </label>
                  <input
                    type="text"
                    name="ramo"
                    value={formData.ramo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex: Restauração, Saúde, Tecnologia, etc."
                  />
                </div>
              </div>

              {/* Seleção de Plano */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Escolha o seu Plano
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Starter",
                      price: "€99/mês",
                      calls: "250 chamadas",
                      color: "from-gray-500 to-gray-600",
                      bgColor: "bg-gray-50",
                      borderColor: "border-gray-200",
                    },
                    {
                      name: "Growth",
                      price: "€199/mês",
                      calls: "500 chamadas",
                      color: "from-secondary-500 to-secondary-600",
                      bgColor: "bg-secondary-50",
                      borderColor: "border-secondary-200",
                      popular: true,
                    },
                    {
                      name: "Pro",
                      price: "€899/mês",
                      calls: "2500 chamadas",
                      color: "from-accent-500 to-accent-600",
                      bgColor: "bg-accent-50",
                      borderColor: "border-accent-200",
                    },
                  ].map(plan => (
                    <div
                      key={plan.name}
                      onClick={() =>
                        setFormData(prev => ({ ...prev, plano: plan.name }))
                      }
                      className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                        formData.plano === plan.name
                          ? `${plan.borderColor} ${plan.bgColor} ring-2 ring-primary-500`
                          : "border-gray-200 bg-white hover:border-primary-300"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                            Mais Popular
                          </span>
                        </div>
                      )}
                      <div className="text-center">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-2xl font-bold text-primary-600 mb-1">
                          {plan.price}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {plan.calls}
                        </p>
                        {formData.plano === plan.name && (
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalhes do Negócio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Funcionários
                  </label>
                  <select
                    name="funcionarios"
                    value={formData.funcionarios}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Selecione...</option>
                    <option value="1-5">1-5 funcionários</option>
                    <option value="6-20">6-20 funcionários</option>
                    <option value="21-50">21-50 funcionários</option>
                    <option value="50+">Mais de 50 funcionários</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Chamadas por Mês
                  </label>
                  <select
                    name="chamadasMes"
                    value={formData.chamadasMes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Selecione...</option>
                    <option value="0-100">0-100 chamadas</option>
                    <option value="101-250">101-250 chamadas</option>
                    <option value="251-500">251-500 chamadas</option>
                    <option value="501-1000">501-1000 chamadas</option>
                    <option value="1000+">Mais de 1000 chamadas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Urgência da Implementação
                </label>
                <select
                  name="urgencia"
                  value={formData.urgencia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Selecione...</option>
                  <option value="Imediata">Imediata (1-3 dias)</option>
                  <option value="Esta semana">Esta semana</option>
                  <option value="Este mês">Este mês</option>
                  <option value="Próximos meses">Próximos meses</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensagem Adicional
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Conte-nos mais sobre as suas necessidades..."
                />
              </div>

              {/* Método de Envio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Como prefere ser contactado?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setEnvioMethod("whatsapp")}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                      envioMethod === "whatsapp"
                        ? "border-secondary-500 bg-secondary-50 ring-2 ring-secondary-500"
                        : "border-gray-200 bg-white hover:border-secondary-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          WhatsApp
                        </h3>
                        <p className="text-sm text-gray-600">
                          Resposta imediata
                        </p>
                      </div>
                      {envioMethod === "whatsapp" && (
                        <CheckCircle className="w-5 h-5 text-secondary-500 ml-auto" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setEnvioMethod("email")}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                      envioMethod === "email"
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500"
                        : "border-gray-200 bg-white hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <p className="text-sm text-gray-600">Resposta em 24h</p>
                      </div>
                      {envioMethod === "email" && (
                        <CheckCircle className="w-5 h-5 text-primary-500 ml-auto" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      {envioMethod === "whatsapp" && (
                        <Phone className="w-5 h-5" />
                      )}
                      {envioMethod === "email" && <Mail className="w-5 h-5" />}
                      <span>
                        {envioMethod === "whatsapp" && "Enviar via WhatsApp"}
                        {envioMethod === "email" && "Enviar por Email"}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Info */}
              <div className="text-center text-sm text-gray-500">
                <p>
                  {envioMethod === "whatsapp" &&
                    "Os seus dados serão enviados via WhatsApp para nossa equipa"}
                  {envioMethod === "email" &&
                    "Os seus dados serão enviados por email para nossa equipa"}
                </p>
                <p>Entraremos em contacto em menos de 1 dia</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
