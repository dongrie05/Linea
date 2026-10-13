import ContactForm from "@/components/ContactForm";

export default function FinalCta() {
  return (
    <section
      id="contacto"
      className="section-anchor border-t border-line bg-elevated"
    >
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-measure">
          <h2 className="section-title">Entrar no piloto</h2>
          <p className="lede mt-4">
            Diga o negócio e o plano. O pedido abre no WhatsApp ou no email. Não
            fica gravado neste site.
          </p>
        </div>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
