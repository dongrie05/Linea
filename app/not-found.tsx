import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center px-5 sm:px-8">
      <p className="display text-blue">404</p>
      <h1 className="section-title mt-3">Esta página não existe.</h1>
      <Link href="/" className="btn btn-primary mt-8">
        Voltar ao início
      </Link>
    </div>
  );
}
