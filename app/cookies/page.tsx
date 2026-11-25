import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { asset } from "@/lib/asset";
import { CONTACT_EMAIL } from "@/lib/contact";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "O site da Linea não usa cookies nem ferramentas de análise ou publicidade.",
  alternates: { canonical: `${siteUrl}/cookies/` },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      lead="Este site não usa cookies."
      current={asset("/cookies/")}
    >
      <h2>1. O que são cookies</h2>
      <p>
        Cookies são pequenos ficheiros que um site guarda no seu dispositivo
        para se lembrar de informação sobre a visita. Há tecnologias
        semelhantes, como o armazenamento local do browser.
      </p>

      <h2>2. Que cookies usamos</h2>
      <p>
        Nenhum. O site da Linea não guarda cookies nem usa o armazenamento
        local do browser, e não tem ferramentas de análise de tráfego, de
        publicidade ou de redes sociais. Os tipos de letra e as imagens são
        servidos pelo próprio site.
      </p>
      <p>
        Por isso, não mostramos um aviso de cookies: não há nada para aceitar
        ou recusar.
      </p>

      <h2>3. Serviços externos</h2>
      <p>
        Se carregar num link para o WhatsApp ou para o email, sai deste site e
        passam a aplicar-se as regras desse serviço, incluindo os cookies que
        ele usa.
      </p>

      <h2>4. Alterações</h2>
      <p>
        Se um dia passarmos a usar cookies que não sejam estritamente
        necessários, pedimos o seu consentimento antes de os guardar e
        atualizamos esta página.
      </p>
      <p>
        Dúvidas: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Mais
        informação na <a href={asset("/privacidade/")}>Política de
        Privacidade</a>.
      </p>
    </LegalPage>
  );
}
