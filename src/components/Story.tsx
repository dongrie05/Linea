import Link from "next/link";
import Pending from "@/components/Pending";
import StoryAudio from "@/components/StoryAudio";
import StoryStage from "@/components/StoryStage";

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
      <StoryStage />
      <div className="story-still">
        <div className="mx-auto max-w-page px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="section-title max-w-measure">
            Uma chamada, do toque à agenda.
          </h2>
          <ol className="mt-10 grid gap-4">
            {STAGES.map((stage, index) => (
              <li key={stage.title} className="surface-card p-5">
                <p className="label">
                  {index + 1} {stage.title}
                </p>
                <p className="mt-3">{stage.text}</p>
                {"pending" in stage ? <Pending>{stage.pending}</Pending> : null}
              </li>
            ))}
            <li className="surface-card p-5">
              <p className="label">Agenda</p>
              <p className="title-sm mt-3">Marcado pela Linea</p>
              <Pending>
                Serviço, dia e hora do exemplo. Têm de bater com o áudio.
              </Pending>
            </li>
          </ol>
        </div>
      </div>
      <div className="mx-auto max-w-page px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="max-w-measure">
          <StoryAudio />
          <p className="mt-8">
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
          <Pending>Hora do exemplo. Tem de bater com o áudio.</Pending>
        </div>
      </div>
    </section>
  );
}
