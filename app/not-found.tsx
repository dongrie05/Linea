import Link from "next/link";

export default function NotFound() {
  return (
    <main id="top" className="section" style={{ ["--h" as string]: 1 }}>
      <div className="wrap">
        <h1>Página não encontrada</h1>
        <p>Este endereço não existe na Linea.</p>
        <Link className="btn btn--primary" href="/">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
