import Link from "next/link";
import Pending from "@/components/Pending";
import Reveal from "@/components/Reveal";

export default function Privacy() {
  return (
    <section id="dados" className="section-anchor">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-measure">
          <h2 className="section-title">
            O paciente sabe sempre com quem está a falar.
          </h2>
          <ul className="fact-list">
            <li>
              Cada chamada começa com o aviso: quem atende é uma assistente
              virtual.
            </li>
            <li>
              Gravação desligada por defeito. Fica a transcrição e o resumo, com
              prazo curto de apagamento.
            </li>
          </ul>
          <Pending>Prazo de apagamento da transcrição e do resumo.</Pending>
          <ul className="fact-list">
            <li>
              A Linea só pede nome, contacto, o motivo em poucas palavras e a
              preferência de horário.
            </li>
            <li>
              A clínica é a responsável pelo tratamento dos dados. A Linea é
              subcontratante, com acordo escrito ao abrigo do artigo 28.º do
              RGPD.
            </li>
          </ul>
          <Pending>
            Frase sobre a localização dos dados. A especificação aponta
            tratamento fora da UE por defeito nos fornecedores de voz, e pede
            para o dizer com clareza ou resolver antes de publicar.
          </Pending>
          <p className="mt-6">
            <Link href="/#politica" className="link">
              Ler a política de privacidade
            </Link>
          </p>
          <div id="politica">
            <Pending>
              A política de privacidade ainda não existe. Tem de existir antes
              de ligar as demonstrações.
            </Pending>
          </div>
          <div id="termos">
            <Pending>Os termos da demonstração ainda não existem.</Pending>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
