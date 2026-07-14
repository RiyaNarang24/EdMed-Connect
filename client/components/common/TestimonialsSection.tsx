import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/constants/testimonialData";
import FadeIn from "../common/FadeIn";
export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-24 lg:py-32">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          badge="Testimonials"
          title="What People Say"
          subtitle="Healthcare professionals and patients trust EdMed Connect."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          
          {testimonials.map((item,index) => (
            <FadeIn 
            key={item.id}delay={index * 0.1}>
           <TestimonialCard
             
           testimonial={item}/>
           </FadeIn>
          ))}

        </div>

      </div>

    </section>
  );
}