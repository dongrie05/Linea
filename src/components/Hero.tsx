import Link from "next/link";
import CallStage from "@/components/CallStage";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-page items-center gap-14 px-5 pb-8 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16 lg:pt-28">
      <div className="max-w-[38rem]">
        <h1 className="display">
          Nunca mais perca uma chamada. A Linea atende por si, em português.
        </h1>
        <p className="lede mt-6 max-w-[34rem]">
          Responde a perguntas e marca compromissos para barbearias, clínicas e
          restaurantes em Portugal.
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
    </section>
  );
}
