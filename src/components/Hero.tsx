import Link from "next/link";
import CallStage from "@/components/CallStage";

export default function Hero() {
  return (
    <section className="band-pine -mt-16">
      <div className="mx-auto grid max-w-page items-center gap-12 px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16 lg:pt-40">
        <div className="max-w-[40rem]">
          <h1 className="display-hero">
            Nunca mais perca uma chamada.
            <span className="tone-warm mt-4 block">
              A Linea atende por si, em português.
            </span>
          </h1>
          <p className="lede mt-6 max-w-[34rem]">
            Responde a perguntas e marca compromissos para barbearias, clínicas
            e restaurantes em Portugal.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/formulario" className="btn btn-primary">
              Entrar no piloto
            </Link>
            <a href="#ouvir" className="btn btn-secondary">
              Ouvir um exemplo
            </a>
          </div>
        </div>
        <CallStage />
      </div>
    </section>
  );
}
