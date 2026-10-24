import ContactForm from "@/components/ContactForm";
import Pending from "@/components/Pending";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
} from "@/lib/contact";

export default function FinalCta() {
  return (
    <section id="contacto" className="section-anchor bg-section">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-measure">
          <h2 className="section-title">Fale comigo.</h2>
          <p className="mt-4">
            Diga-me o nome da clínica e a cidade. Respondo eu.
          </p>
          <Pending>Prazo real de resposta.</Pending>
        </div>
        <div className="surface-card mt-10 max-w-measure p-5 sm:p-8">
          <ContactForm />
        </div>
        <div className="mt-6 flex flex-col gap-1">
          <a href={`tel:${CONTACT_PHONE_E164}`} className="link">
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
