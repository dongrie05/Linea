import { CONTACT_PHONE_WHATSAPP, LEADS_EMAIL } from "@/lib/contact";
import { PLANS } from "@/lib/site";
import { ArrowIcon } from "@/components/site/logo";

export function LeadForm() {
  return (
    <form
      className="form"
      action={`mailto:${LEADS_EMAIL}`}
      method="post"
      encType="text/plain"
    >
      <div className="field">
        <label htmlFor="f-nome">Nome</label>
        <input
          id="f-nome"
          name="nome"
          type="text"
          autoComplete="name"
          placeholder="O seu nome"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="nome@empresa.pt"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="f-telefone">Telefone</label>
        <input
          id="f-telefone"
          name="telefone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+351"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="f-empresa">Empresa</label>
        <input
          id="f-empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          placeholder="Nome da empresa"
          required
        />
      </div>
      <div className="field field--full">
        <label htmlFor="f-plano">Plano</label>
        <select id="f-plano" name="plano" defaultValue="Growth" required>
          {PLANS.map(plan => (
            <option key={plan.id} value={plan.name}>
              {plan.name}, {plan.priceEur}€ por mês, {plan.minutesPerMonth}{" "}
              minutos
            </option>
          ))}
        </select>
      </div>
      <div className="field field--full">
        <label htmlFor="f-mensagem">Mensagem</label>
        <textarea
          id="f-mensagem"
          name="mensagem"
          rows={4}
          placeholder="O que quer ver na demonstração?"
          required
        />
      </div>
      <div className="field--full form__foot">
        <button className="btn btn--primary btn--lg" type="submit">
          Experimentar a Linea
          <ArrowIcon />
        </button>
        <p className="form__note">
          O pedido abre no seu email para {LEADS_EMAIL}. Também pode{" "}
          <a className="link" href={`https://wa.me/${CONTACT_PHONE_WHATSAPP}`}>
            enviar por WhatsApp
          </a>
          .
        </p>
      </div>
    </form>
  );
}
