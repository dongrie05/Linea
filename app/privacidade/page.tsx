import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { asset } from "@/lib/asset";
import { CONTACT_EMAIL } from "@/lib/contact";
import { LEGAL_ENTITY } from "@/lib/legal";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Linea trata os dados pessoais de quem visita o site e pede uma demonstração do atendedor de chamadas com IA.",
  alternates: { canonical: `${siteUrl}/privacidade/` },
};

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      lead="Como tratamos os dados pessoais de quem visita este site e nos contacta."
      current={asset("/privacidade/")}
    >
      <h2>1. Quem é o responsável pelo tratamento</h2>
      <p>
        A Linea é um produto da Dongrie Labs. O responsável pelo tratamento dos
        dados recolhidos neste site é {LEGAL_ENTITY.name}, empresário em nome
        individual, NIF {LEGAL_ENTITY.nif}, com domicílio em{" "}
        {LEGAL_ENTITY.address}.
      </p>
      <p>
        Para qualquer questão sobre os seus dados, escreva para{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. Que dados recolhemos</h2>
      <h3>Formulário de pedido</h3>
      <p>
        Quando pede um período experimental ou uma demonstração, recolhemos o
        nome, o email, o telefone (com o indicativo do país), o nome da empresa,
        o plano escolhido e a mensagem que escrever.
      </p>
      <h3>Contacto direto</h3>
      <p>
        Se nos escrever por email ou WhatsApp, ou se nos telefonar, recebemos os
        dados que partilhar nesse contacto, como o nome, o número de telefone e
        o conteúdo da mensagem.
      </p>
      <h3>Dados técnicos</h3>
      <p>
        O fornecedor que aloja o site regista dados técnicos de cada acesso,
        como o endereço IP, a data e a hora e o tipo de browser. São necessários
        para servir as páginas e proteger o site contra abusos.
      </p>
      <p>
        Este site não usa ferramentas de análise de tráfego nem de publicidade.
      </p>

      <h2>3. Para que usamos os dados e com que fundamento</h2>
      <ul>
        <li>
          <strong>Responder ao seu pedido</strong>, marcar a demonstração e
          enviar uma proposta. Fundamento: diligências pré-contratuais a seu
          pedido e o nosso interesse legítimo em responder a empresas que nos
          contactam (artigo 6.º, n.º 1, alíneas b) e f), do RGPD).
        </li>
        <li>
          <strong>Prestar o serviço</strong>, se se tornar cliente. Fundamento:
          execução do contrato (alínea b)).
        </li>
        <li>
          <strong>Cumprir obrigações legais</strong>, como a faturação.
          Fundamento: obrigação legal (alínea c)).
        </li>
        <li>
          <strong>Manter o site a funcionar e seguro.</strong> Fundamento:
          interesse legítimo (alínea f)).
        </li>
      </ul>
      <p>
        Não enviamos comunicações de marketing sem o seu consentimento e não
        tomamos decisões automatizadas sobre si com efeitos jurídicos.
      </p>

      <h2>4. Com quem partilhamos os dados</h2>
      <p>
        Não vendemos dados pessoais. Recorremos a estes fornecedores, que tratam
        dados por nossa conta ou como serviços que escolhe usar:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong>, que aloja o site.
        </li>
        <li>
          <strong>Web3Forms</strong>, que recebe o formulário e o encaminha para
          o nosso email.
        </li>
        <li>
          <strong>Google</strong>, através do Gmail, onde recebemos e guardamos
          os emails.
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong>, se escolher falar connosco por
          WhatsApp.
        </li>
      </ul>
      <p>Podemos ainda comunicar dados a autoridades quando a lei o exija.</p>

      <h2>5. Transferências para fora do Espaço Económico Europeu</h2>
      <p>
        Alguns destes fornecedores podem tratar dados fora do Espaço Económico
        Europeu, nomeadamente nos Estados Unidos. Nesses casos, a transferência
        assenta nas garantias previstas no RGPD, como o Quadro de Privacidade de
        Dados UE-EUA ou as cláusulas contratuais-tipo aprovadas pela Comissão
        Europeia.
      </p>

      <h2>6. Durante quanto tempo guardamos os dados</h2>
      <ul>
        <li>
          Pedidos que não resultam num contrato: até 12 meses depois do último
          contacto.
        </li>
        <li>
          Clientes: durante o contrato e, depois, pelo prazo que a lei exige
          para documentos fiscais e contabilísticos.
        </li>
        <li>
          Dados técnicos de acesso: pelo prazo definido pelo fornecedor de
          alojamento.
        </li>
      </ul>

      <h2>7. Os seus direitos</h2>
      <p>
        Pode pedir o acesso aos seus dados, a retificação, o apagamento, a
        limitação do tratamento e a portabilidade, e pode opor-se a um
        tratamento baseado no interesse legítimo. Quando o tratamento se baseia
        no consentimento, pode retirá-lo a qualquer momento.
      </p>
      <p>
        Para exercer estes direitos, escreva para{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Respondemos no
        prazo de um mês. Tem também o direito de apresentar reclamação à
        Comissão Nacional de Proteção de Dados (
        <a href="https://www.cnpd.pt/">www.cnpd.pt</a>).
      </p>

      <h2>8. Dados das chamadas atendidas pela Linea</h2>
      <p>
        Esta política trata dos dados recolhidos neste site. Quando a Linea
        atende as chamadas de uma empresa, os dados de quem liga são tratados
        por conta dessa empresa. Explicamos como na página{" "}
        <a href={asset("/protecao-de-dados/")}>Segurança e Proteção de Dados</a>
        .
      </p>

      <h2>9. Alterações a esta política</h2>
      <p>
        Podemos atualizar esta política. A data da última atualização está no
        topo da página.
      </p>
    </LegalPage>
  );
}
