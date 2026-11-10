import Link from "next/link";

export default function NotFound() {
  return (
    <main id="top" className="page">
      <div className="wrap">
        <h1>Página não encontrada</h1>
        <p>Este endereço não existe na Linea.</p>
        <Link className="btn btn--primary btn--lg" href="/">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
