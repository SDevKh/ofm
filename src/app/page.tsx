import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import Hero from "@/components/sections/Hero";
import TrustMetrics from "@/components/sections/TrustMetrics";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTAContact from "@/components/sections/CTAContact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />
        <TrustMetrics />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <CaseStudies />
        <Testimonials />
        <FAQ />
        <CTAContact />
      </main>

      <Footer />
    </>
  );
}
