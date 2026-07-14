import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import { services } from "@/constants/serviceData";
import FadeIn from "../common/FadeIn";
export default function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <SectionHeading
          badge="Medical Services"
          title="Comprehensive Healthcare Services"
          subtitle="Explore our wide range of medical departments and healthcare facilities designed to provide world-class treatment."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {services.map((service,index)=>(
            <FadeIn
            key={service.title}
            delay={index*0.08}>

         <ServiceCard
         service={service}/>

        </FadeIn>))}

        </div>

      </div>

    </section>
  );
}