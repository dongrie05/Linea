import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { asset } from "@/lib/asset";
import { CONTACT_EMAIL } from "@/lib/contact";
import { LEGAL_ENTITY } from "@/lib/legal";
import { PILOT } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description:
    "Termos de utilização do site da Linea e condições gerais do atendedor de chamadas com IA.",
  alternates: { canonical: `${siteUrl}/termos/` },
};

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos e Condições"
      lead="As regras de utilização deste site e as condições gerais do serviço Linea."
      current={asset("/termos/")}
    >
      <h2>1. Quem somos</h2>
      <p>
        Este site é da Linea, um produto da Dongrie Labs, explorado por{" "}
        {LEGAL_ENTITY.name}, empresário em nome individual, NIF{" "}
        {LEGAL_ENTITY.nif}, com domicílio em {LEGAL_ENTITY.address}. Contacto:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. Aceitação</h2>
      <p>
        Ao usar este site aceita estes termos. Se não concordar, não use o site.
      </p>

      <h2>3. O serviço</h2>
      <p>
        A Linea é um atendedor de chamadas com inteligência artificial para
        empresas e profissionais. Atende as chamadas no número da empresa, marca
        consultas ou reservas e regista os pedidos. O serviço destina-se a
        empresas e não a consumidores.
      </p>
      <p>
        As condições concretas de cada cliente, como o plano, os minutos, as
        integrações, a duração e a forma de pagamento, ficam numa proposta ou
        contrato escrito. Em caso de diferença, a proposta ou o contrato
        prevalecem sobre estes termos.
      </p>

      <h2>4. Preços</h2>
      <p>
        Os preços no site são mensais, em euros, e não incluem IVA, que acresce
        à taxa legal em vigor. O preço especial aplica-se aos primeiros{" "}
        {PILOT.specialMonths} meses. Os minutos e as mensagens além dos
        incluídos no plano são cobrados aos preços indicados no site.
      </p>
      <p>
        Podemos mudar os preços do site a qualquer momento. As mudanças não
        afetam propostas já aceites.
      </p>

      <h2>5. Período experimental</h2>
      <p>
        O período experimental dura {PILOT.trialWeeks} semanas e está sujeito a
        uma caução, cujo valor depende do plano. A caução é devolvida se avançar
        para um plano. As restantes condições constam da proposta.
      </p>

      <h2>6. Cancelamento</h2>
      <p>
        O cliente pode cancelar o serviço a qualquer momento, nas condições da
        proposta ou do contrato.
      </p>

      <h2>7. Utilização do site</h2>
      <p>Ao usar o site, compromete-se a não:</p>
      <ul>
        <li>usá-lo para fins ilícitos;</li>
        <li>tentar aceder a sistemas ou dados sem autorização;</li>
        <li>
          enviar pelo formulário conteúdo falso, ofensivo ou que contenha código
          malicioso.
        </li>
      </ul>

      <h2>8. Propriedade intelectual</h2>
      <p>
        Os textos, o design, o logótipo e restantes conteúdos do site pertencem
        à Linea ou a quem lhe deu licença. Não os pode copiar nem usar para fins
        comerciais sem autorização escrita.
      </p>

      <h2>9. Responsabilidade</h2>
      <p>
        Procuramos manter a informação do site correta e atualizada, mas pode
        conter erros ou estar desatualizada. O site pode ficar indisponível por
        períodos curtos, por exemplo para manutenção. As ligações para sites de
        terceiros são dadas por conveniência e não somos responsáveis pelo seu
        conteúdo.
      </p>
      <p>
        Nada nestes termos limita responsabilidades que a lei não permita
        limitar.
      </p>

      <h2>10. Proteção de dados</h2>
      <p>
        O tratamento de dados pessoais está descrito na{" "}
        <a href={asset("/privacidade/")}>Política de Privacidade</a> e na página{" "}
        <a href={asset("/protecao-de-dados/")}>Segurança e Proteção de Dados</a>
        .
      </p>

      <h2>11. Lei aplicável e foro</h2>
      <p>
        Estes termos regem-se pela lei portuguesa. Para qualquer litígio são
        competentes os tribunais portugueses, nos termos da lei.
      </p>

      <h2>12. Alterações</h2>
      <p>
        Podemos alterar estes termos. A versão em vigor é a que está publicada
        nesta página, com a data no topo.
      </p>
    </LegalPage>
  );
}
