import { ActionBar, SiteFooter, SiteNav } from "@/components/site/chrome";
import { LeadForm } from "@/components/site/lead-form";
import { SiteMotion } from "@/components/site/motion";
import { ArrowIcon } from "@/components/site/logo";
import { asset } from "@/lib/asset";

const home = asset("/");

export default function FormularioPage() {
  return (
    <>
      <SiteMotion />
      <SiteNav home={home} />
      <main id="top" className="page">
        <section id="pedido" aria-labelledby="pedido-h">
          <div className="wrap request" id="conteudo">
            <div className="request__side" data-reveal>
              <h1 id="pedido-h">Marque uma chamada de demonstração.</h1>
              <p>Diga o plano e o que quer ver. A resposta segue por email.</p>
              <a className="link" href={`${home}#precos`}>
                Ver preços <ArrowIcon />
              </a>
            </div>
            <div className="request__form" data-reveal>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter home={home} />
      <ActionBar home={home} />
    </>
  );
}
