import { LEADS_EMAIL } from "@/lib/contact";
import { PLANS } from "@/lib/site";

export function LeadForm() {
  return (
    <form
      className="form"
      action={`mailto:${LEADS_EMAIL}`}
      method="post"
      encType="text/plain"
      data-fix="{n} campos por corrigir."
      noValidate
    >
      <div className="field">
        <label htmlFor="f-nome">Nome</label>
        <input
          id="f-nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          aria-describedby="f-nome-err"
        />
        <p className="field__error" id="f-nome-err" hidden>
          Escreva o seu nome.
        </p>
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-describedby="f-email-err"
        />
        <p className="field__error" id="f-email-err" hidden>
          Escreva um email com @.
        </p>
      </div>
      <div className="field">
        <label htmlFor="f-telefone">Telefone</label>
        <input
          id="f-telefone"
          name="telefone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          aria-describedby="f-telefone-err"
        />
        <p className="field__error" id="f-telefone-err" hidden>
          Escreva o telefone da empresa.
        </p>
      </div>
      <div className="field">
        <label htmlFor="f-empresa">Empresa</label>
        <input
          id="f-empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          required
          aria-describedby="f-empresa-err"
        />
        <p className="field__error" id="f-empresa-err" hidden>
          Escreva o nome da empresa.
        </p>
      </div>
      <div className="field">
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
      <div className="field">
        <label htmlFor="f-mensagem">Mensagem</label>
        <textarea
          id="f-mensagem"
          name="mensagem"
          rows={3}
          required
          aria-describedby="f-mensagem-err"
        />
        <p className="field__error" id="f-mensagem-err" hidden>
          Escreva o que quer ver na demonstração.
        </p>
      </div>
      <div className="btn-row">
        <button className="btn btn--primary" type="submit">
          Pedir demonstração
        </button>
      </div>
      <p className="form__status" role="status" data-form-status />
      <p className="t-small">
        O pedido abre no seu email para linea.atendedor@gmail.com. Também pode{" "}
        <a className="link" href="https://wa.me/351927699882">
          enviar por WhatsApp
        </a>
        .
      </p>
    </form>
  );
}
