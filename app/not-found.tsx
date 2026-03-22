import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-600 mb-6">Página não encontrada.</p>
      <Link
        href="/"
        className="text-primary-600 hover:text-primary-700 font-medium underline"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
