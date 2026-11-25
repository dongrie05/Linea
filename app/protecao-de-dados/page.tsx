import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { asset } from "@/lib/asset";
import { CONTACT_EMAIL } from "@/lib/contact";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Segurança e Proteção de Dados",
  description:
    "Como a Linea trata os dados das chamadas que atende por conta de clínicas e outras empresas, ao abrigo do RGPD.",
  alternates: { canonical: `${siteUrl}/protecao-de-dados/` },
};

export default function ProtecaoDeDadosPage() {
  return (
    <LegalPage
      title="Segurança e Proteção de Dados"
      lead="Como tratamos os dados das chamadas que a Linea atende por conta dos nossos clientes."
      current={asset("/protecao-de-dados/")}
    >
      <h2>1. Quem decide e quem trata os dados</h2>
      <p>
        Quando a Linea atende as chamadas de uma clínica ou de outra empresa,
        essa empresa é a responsável pelo tratamento dos dados de quem liga. A
        Linea é subcontratante, nos termos do artigo 28.º do RGPD: trata os
        dados apenas para prestar o serviço e segundo as instruções do cliente.
      </p>
      <p>
        Antes de começar, celebramos com cada cliente um acordo de tratamento de
        dados que define o que tratamos, durante quanto tempo, com que medidas
        de segurança e com que subcontratantes.
      </p>

      <h2>2. Que dados das chamadas tratamos</h2>
      <ul>
        <li>o número de telefone de quem liga e a data e hora da chamada;</li>
        <li>
          o que a pessoa diz e que é preciso para tratar o pedido, como o nome,
          o motivo do contacto e a data pretendida;
        </li>
        <li>
          os dados da marcação ou do recado que fica registado para a empresa;
        </li>
        <li>
          o número para onde seguem as confirmações por SMS ou WhatsApp, quando
          o plano as inclui.
        </li>
      </ul>
      <p>
        As chamadas são transcritas. A transcrição fica guardada para a empresa
        poder ver o que foi dito e o que ficou marcado.
      </p>
      <p>
        O áudio só é gravado na medida necessária para o assistente aceder à
        chamada e a tratar.
      </p>

      <h2>3. Dados de saúde</h2>
      <p>
        Numa clínica, o motivo de uma consulta pode revelar informação sobre a
        saúde de quem liga, que o RGPD protege de forma reforçada (artigo 9.º).
        A Linea é configurada para pedir apenas o necessário para marcar ou
        encaminhar o pedido, e não para recolher informação clínica.
      </p>

      <h2>4. Quem liga sabe que fala com um assistente automático</h2>
      <p>
        Logo no início da chamada, a Linea avisa que é um assistente de
        inteligência artificial. Quem preferir pode deixar recado para a equipa
        da empresa.
      </p>

      <h2>5. Para que usamos os dados das chamadas</h2>
      <p>
        Só para prestar o serviço ao cliente: atender, marcar, confirmar e
        registar. Não vendemos estes dados e não os usamos para os nossos
        próprios fins, como publicidade.
      </p>

      <h2>6. Subcontratantes</h2>
      <p>
        Para funcionar, a Linea recorre a fornecedores de telefonia, de
        reconhecimento de voz e de inteligência artificial, de envio de
        mensagens e de alojamento. Cada um fica obrigado por contrato a proteger
        os dados. A lista em vigor faz parte do acordo de tratamento de dados e
        é comunicada ao cliente antes de qualquer alteração.
      </p>
      <p>
        As chamadas e as transcrições são tratadas pela Vapi, a plataforma de
        voz em que a Linea funciona, que trata os dados nos Estados Unidos.
      </p>
      <p>
        A ligação telefónica e o envio de SMS são feitos pela Telnyx. As
        confirmações por WhatsApp, quando o plano as inclui, são enviadas pelo
        WhatsApp Business, da Meta. Estes fornecedores podem tratar dados fora
        da União Europeia.
      </p>
      <p>
        Quando um fornecedor trata dados fora do Espaço Económico Europeu, a
        transferência assenta nas garantias previstas no RGPD, como as cláusulas
        contratuais-tipo aprovadas pela Comissão Europeia.
      </p>

      <h2>7. Durante quanto tempo guardamos os dados</h2>
      <p>
        Os dados das chamadas, incluindo as transcrições, são guardados até 3
        meses e depois apagados, salvo instrução diferente do cliente. No fim do
        contrato, apagamos ou devolvemos os dados, conforme o cliente escolher.
      </p>
      <p>[Confirmar: o prazo de 3 meses configurado também na Vapi.]</p>

      <h2>8. Segurança</h2>
      <p>
        Aplicamos medidas técnicas e organizativas adequadas ao risco, como
        prevê o artigo 32.º do RGPD. O acesso aos dados fica limitado a quem
        precisa deles para prestar o serviço. As medidas em vigor estão
        descritas no acordo de tratamento de dados com cada cliente.
      </p>
      <p>O site da Linea é servido por ligação cifrada (HTTPS).</p>

      <h2>9. Se algo correr mal</h2>
      <p>
        Se houver uma violação de dados pessoais, informamos o cliente sem
        demora injustificada, com a informação de que precisa para cumprir as
        suas obrigações perante a CNPD e as pessoas afetadas.
      </p>

      <h2>10. Direitos de quem liga</h2>
      <p>
        Quem ligou para uma empresa que usa a Linea pode exercer os seus
        direitos junto dessa empresa. Se nos contactar diretamente, encaminhamos
        o pedido e ajudamos a empresa a responder.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Questões de clientes sobre proteção de dados:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Os dados de
        quem visita o site estão na{" "}
        <a href={asset("/privacidade/")}>Política de Privacidade</a>.
      </p>
    </LegalPage>
  );
}
