import { ActionBar, SiteFooter, SiteNav } from "@/components/site/chrome";
import { LeadForm } from "@/components/site/lead-form";

export default function FormularioPage() {
  return (
    <>
      <SiteNav home="/" />
      <main id="top">
        <section
          className="section"
          id="pedido"
          style={{ ["--h" as string]: 2 }}
          aria-labelledby="pedido-h"
        >
          <div className="wrap grid">
            <div className="span-5">
              <h2 id="pedido-h">Pedido sobre as chamadas</h2>
              <p>Diga o plano e o que quer ver. A resposta segue por email.</p>
              <a className="link" href="/#precos">
                Ver preços
              </a>
            </div>
            <div className="span-6 start-7">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter home="/" />
      <ActionBar home="/" />
    </>
  );
}
