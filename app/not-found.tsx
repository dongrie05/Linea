import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col justify-center py-28">
        <div className="mx-auto w-full max-w-page px-5 sm:px-8">
          <p className="label">404</p>
          <h1 className="section-title mt-4">Esta página não existe.</h1>
          <Link href="/" className="btn btn-primary mt-8">
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
