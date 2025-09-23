import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import BusinessSummary from "@/components/BusinessSummary";
import AISearchOptimization from "@/components/AISearchOptimization";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemSolution />
        <Features />
        <Pricing />
        <BusinessSummary />
        <AISearchOptimization />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
