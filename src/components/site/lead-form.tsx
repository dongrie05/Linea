import {
  CONTACT_PHONE_WHATSAPP,
  LEADS_EMAIL,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_KEY,
} from "@/lib/contact";
import { PLANS, TRIAL_CTA } from "@/lib/site";
import { ArrowIcon } from "@/components/site/logo";

export function LeadForm() {
  const direct = WEB3FORMS_KEY !== "";
  return (
    <form
      className="form"
      {...(direct
        ? {
            action: WEB3FORMS_ENDPOINT,
            method: "post",
            "data-direct": "",
          }
        : {
            action: `mailto:${LEADS_EMAIL}`,
            method: "post",
            encType: "text/plain",
          })}
    >
      {direct ? (
        <>
          <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
          <input
            type="hidden"
            name="subject"
            value="Novo pedido no site da Linea"
          />
          <input type="hidden" name="from_name" value="Site da Linea" />
          <input
            type="checkbox"
            name="botcheck"
            className="sr-only"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </>
      ) : null}
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
              {plan.name}, {plan.minutesPerMonth} minutos
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
          {TRIAL_CTA}
          <ArrowIcon />
        </button>
        <p className="form__status" role="status" aria-live="polite" hidden />
        <p className="form__note">
          {direct
            ? `O pedido chega por email a ${LEADS_EMAIL}.`
            : `O pedido abre no seu email para ${LEADS_EMAIL}.`}{" "}
          Também pode{" "}
          <a className="link" href={`https://wa.me/${CONTACT_PHONE_WHATSAPP}`}>
            enviar por WhatsApp
          </a>
          .
        </p>
      </div>
    </form>
  );
}
