"use client";

import { useState } from "react";
import { CONTACT_PHONE_WHATSAPP, LEADS_EMAIL } from "@/lib/contact";
import { PLANS, type PlanId } from "@/lib/site";

type SendMethod = "whatsapp" | "email";

const STAFF = ["1-5", "6-20", "21-50", "50+"];
const VOLUME = ["0-100", "101-250", "251-500", "501-1000", "1000+"];
const URGENCY = ["Imediata", "Esta semana", "Este mês", "Próximos meses"];

function isPlanId(value: string | undefined): value is PlanId {
  return PLANS.some(plan => plan.id === value);
}

export default function ContactForm({ initialPlan }: { initialPlan?: string }) {
  const [plano, setPlano] = useState<PlanId>(
    isPlanId(initialPlan) ? initialPlan : "Starter"
  );
  const [method, setMethod] = useState<SendMethod>("whatsapp");
  const [status, setStatus] = useState<SendMethod | "blocked" | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const email = String(data.get("email") ?? "");
    const telefone = String(data.get("telefone") ?? "");
    const empresa = String(data.get("empresa") ?? "");
    const ramo = String(data.get("ramo") ?? "");
    const funcionarios = String(data.get("funcionarios") ?? "");
    const chamadasMes = String(data.get("chamadasMes") ?? "");
    const urgencia = String(data.get("urgencia") ?? "");
    const mensagem = String(data.get("mensagem") ?? "");

    const body = [
      "Pedido de piloto Linea",
      "",
      `Nome: ${nome}`,
      `Email: ${email}`,
      `Telefone: ${telefone}`,
      `Empresa: ${empresa}`,
      `Ramo: ${ramo}`,
      `Plano: ${plano}`,
      `Funcionários: ${funcionarios || "não indicado"}`,
      `Chamadas por mês: ${chamadasMes || "não indicado"}`,
      `Urgência: ${urgencia || "não indicada"}`,
      "",
      mensagem || "Sem mensagem.",
    ].join("\n");

    if (method === "whatsapp") {
      const url = `https://wa.me/${CONTACT_PHONE_WHATSAPP}?text=${encodeURIComponent(body)}`;
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      setStatus(opened ? "whatsapp" : "blocked");
      return;
    }

    const mailto = `mailto:${LEADS_EMAIL}?subject=${encodeURIComponent(
      `Piloto Linea - ${plano}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("email");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-measure space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" name="nome" autoComplete="name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="nome@empresa.pt"
        />
        <Field
          label="Telefone"
          name="telefone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="+351"
        />
        <Field
          label="Empresa"
          name="empresa"
          autoComplete="organization"
          required
        />
        <Field
          label="Ramo"
          name="ramo"
          required
          placeholder="Barbearia, clínica, restaurante"
          className="sm:col-span-2"
        />
      </div>

      <fieldset>
        <legend className="text-[0.95rem] font-semibold">Plano</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {PLANS.map(plan => {
            const selected = plano === plan.id;
            return (
              <label
                key={plan.id}
                className={`cursor-pointer rounded-2xl border px-4 py-3 ${
                  selected
                    ? "border-accent bg-elevated"
                    : "border-line bg-elevated"
                }`}
              >
                <input
                  type="radio"
                  name="plano"
                  value={plan.id}
                  checked={selected}
                  onChange={() => setPlano(plan.id)}
                  className="sr-only"
                />
                <span className="block font-semibold">{plan.name}</span>
                <span className="caption mt-1 block">
                  {plan.priceEur}€ / mês
                  {selected ? " · Selecionado" : ""}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select label="Funcionários" name="funcionarios" options={STAFF} />
        <Select label="Chamadas por mês" name="chamadasMes" options={VOLUME} />
      </div>
      <Select label="Quando quer começar" name="urgencia" options={URGENCY} />

      <label className="block">
        <span className="text-[0.95rem] font-semibold">Mensagem</span>
        <textarea
          name="mensagem"
          rows={4}
          className="field mt-2"
          placeholder="O que a Linea precisa de saber sobre o negócio"
        />
      </label>

      <fieldset>
        <legend className="text-[0.95rem] font-semibold">
          Como quer enviar o pedido
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["whatsapp", "WhatsApp"],
              ["email", "Email"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 ${
                method === value ? "border-accent" : "border-line"
              }`}
            >
              <input
                type="radio"
                name="envio"
                value={value}
                checked={method === value}
                onChange={() => setMethod(value)}
              />
              <span>
                {label}
                {method === value ? " · Selecionado" : ""}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        {method === "whatsapp" ? "Enviar por WhatsApp" : "Enviar por email"}
      </button>

      {status === "whatsapp" && (
        <p role="status">
          O pedido foi preparado no WhatsApp. Confirme o envio na conversa que
          abriu.
        </p>
      )}
      {status === "email" && (
        <p role="status">
          O pedido foi preparado no email, para {LEADS_EMAIL}. Envie a mensagem
          a partir da aplicação de correio.
        </p>
      )}
      {status === "blocked" && (
        <p role="status">
          O browser bloqueou a janela. Permita pop-ups nesta página, ou escreva
          para {LEADS_EMAIL}.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[0.95rem] font-semibold">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="field mt-2"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[0.95rem] font-semibold">{label}</span>
      <select name={name} className="field mt-2" defaultValue="">
        <option value="">Não indicado</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
