import Link from "next/link";
import Pending from "@/components/Pending";
import Reveal from "@/components/Reveal";
import StoryAudio from "@/components/StoryAudio";

const STAGES = [
  {
    title: "Toque",
    text: "A clínica já fechou. O telefone toca.",
    pending: "Hora do exemplo. Tem de bater com o áudio.",
  },
  {
    title: "Atende",
    text: "A Linea atende e diz logo que é uma assistente virtual.",
  },
  {
    title: "Conversa",
    text: "Percebe o que o paciente quer. Faz uma pergunta de cada vez.",
  },
  {
    title: "Agenda",
    text: "Vê a agenda da clínica e encontra uma vaga.",
  },
  {
    title: "Marcado",
    text: "A consulta fica marcada. A clínica vê de manhã.",
  },
] as const;

export default function Story() {
  return (
    <section id="ouvir" className="section-anchor bg-section">
      <div className="mx-auto max-w-page px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-measure">
          <h2 className="section-title">Uma chamada, do toque à agenda.</h2>
          <StoryAudio />
        </Reveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-2">
          {STAGES.map((stage, index) => (
            <li key={stage.title} className="surface-card p-5 sm:p-6">
              <p className="label">
                {index + 1} {stage.title}
              </p>
              <p className="mt-3">{stage.text}</p>
              {"pending" in stage ? <Pending>{stage.pending}</Pending> : null}
            </li>
          ))}
          <li className="surface-card p-5 sm:p-6">
            <p className="label">Agenda</p>
            <p className="title-sm mt-3">Marcado pela Linea</p>
            <Pending>
              Serviço, dia e hora do exemplo. Têm de bater com o áudio.
            </Pending>
          </li>
        </ol>
        <div className="mt-10 max-w-measure">
          <p>
            Exemplo encenado com uma clínica inventada. A transcrição completa
            está{" "}
            <Link href="/#transcricao" className="link">
              aqui
            </Link>{" "}
            em texto.
          </p>
          <div id="transcricao">
            <Pending>A transcrição completa ainda não está publicada.</Pending>
          </div>
          <Pending>Quem fez de paciente.</Pending>
        </div>
      </div>
    </section>
  );
}
