"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Phone, Mail, Calendar, CheckCircle } from "lucide-react";

export default function FormularioPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planoPreSelecionado = searchParams.get("plano") || "Starter";

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    plano: planoPreSelecionado,
    funcionarios: "",
    chamadasMes: "",
    urgencia: "",
    mensagem: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const whatsappMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/351123456789?text=${whatsappMessage}`;

    // Abre WhatsApp em nova aba
    window.open(whatsappUrl, "_blank");

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
              Comece a poupar <span className="gradient-text">hoje mesmo</span>
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Preencha o formulário e nossa equipa entrará em contacto em menos
              de 1 dia
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
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Nome da sua empresa"
                  />
                </div>
              </div>

              {/* Plano Selecionado */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Plano Selecionado
                </label>
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-primary-700">
                        {formData.plano}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formData.plano === "Starter" &&
                          "€99/mês - 250 chamadas"}
                        {formData.plano === "Growth" &&
                          "€199/mês - 500 chamadas"}
                        {formData.plano === "Pro" && "€899/mês - 2500 chamadas"}
                      </p>
                    </div>
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
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
                      <Phone className="w-5 h-5" />
                      <span>Enviar via WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

              {/* Info */}
              <div className="text-center text-sm text-gray-500">
                <p>
                  Os seus dados serão enviados via WhatsApp para nossa equipa
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
