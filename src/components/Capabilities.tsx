import Pending from "@/components/Pending";
import Reveal from "@/components/Reveal";

const DOES = [
  "Atende quando a receção não consegue, ou quando a clínica está fechada.",
  "Responde ao horário, morada, serviços e preços, só com a tabela que a clínica lhe deu.",
  "Marca na agenda Google da clínica, dentro das regras da clínica: antecedência, dias à frente, serviços que pode marcar.",
  "Confirma o número de telemóvel algarismo a algarismo.",
  "Toma recado com nome, telemóvel, motivo e melhor hora para ligar.",
];

const DOES_NOT = [
  "Não inventa preços. Se não está na tabela, diz que não sabe e toma recado.",
  "Não dá conselhos médicos nem diagnósticos.",
  "Não pede sintomas em detalhe. Só o motivo em poucas palavras.",
  "Perante dificuldade em respirar, inchaço que alastra para o pescoço ou para o olho, ou uma hemorragia que não para, diz para ligar já para o 112.",
];

export default function Capabilities() {
  return (
    <section id="o-que-faz" className="section-anchor">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-measure">
          <h2 className="section-title">
            Uma assistente que diz «não sei» vale mais do que uma que inventa.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h3 className="title-sm">Faz</h3>
            <ul className="fact-list">
              {DOES.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Pending>
              A frase «A clínica recebe o recado por email.» só entra depois de
              o envio ser testado de ponta a ponta.
            </Pending>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="title-sm">Não faz</h3>
            <ul className="fact-list">
              {DOES_NOT.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
