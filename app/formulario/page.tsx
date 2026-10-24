import { Suspense } from "react";
import FormularioClient from "@/components/FormularioClient";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function FormularioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <p className="mx-auto max-w-page px-5 py-16 text-muted sm:px-8">
              A abrir o formulário.
            </p>
          }
        >
          <FormularioClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
