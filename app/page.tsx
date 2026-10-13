import Audiences from "@/components/Audiences";
import ExampleAudio from "@/components/ExampleAudio";
import FAQ from "@/components/FAQ";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pilot from "@/components/Pilot";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-elevated focus:px-3 focus:py-2"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Hero />
        <ExampleAudio />
        <HowItWorks />
        <Audiences />
        <Pilot />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
