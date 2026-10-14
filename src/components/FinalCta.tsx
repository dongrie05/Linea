import ContactForm from "@/components/ContactForm";

export default function FinalCta() {
  return (
    <section id="contacto" className="band-pine section-anchor">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-measure">
          <h2 className="display-hero">
            Entrar no <span className="tone-warm">piloto</span>
          </h2>
          <p className="lede mt-4">
            Diga o negócio e o plano. O pedido abre no WhatsApp ou no email. Não
            fica gravado neste site.
          </p>
        </div>
        <div className="paper mt-10 max-w-measure rounded-2xl border border-line p-5 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
