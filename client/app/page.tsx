import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import FeatureHighlights from "@/components/common/FeatureHighlights";
import FeaturedHospitals from "@/components/hospital/FeaturedHospitals";
import ServicesSection from "@/components/common/ServicesSection";
import StatsSection from "@/components/common/StatsSection";
import WhyChooseSection from "@/components/common/WhyChooseSection";
import LiveHospitalStatus from "@/components/common/LiveHospitalStatus";
import TestimonialsSection from "@/components/common/TestimonialsSection";
import ConsultationCTA from "@/components/common/ConsultationCTA";
import FloatingButtons from "@/components/common/FloatingButtons";
import Footer from "@/components/common/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureHighlights />
      <FeaturedHospitals />
      <ServicesSection />
      <StatsSection />
      <WhyChooseSection />
     <LiveHospitalStatus />
     <TestimonialsSection />
     <ConsultationCTA />
     <FloatingButtons />
     <Footer/>
    </>
  );
}