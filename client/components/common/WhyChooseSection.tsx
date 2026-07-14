import SectionHeading from "./SectionHeading";
import WhyChooseCard from "./WhyChooseCard";
import { whyChoose } from "@/constants/whyChooseData";

export default function WhyChooseSection() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          badge="Why Choose Us"
          title="Why Choose EdMed Connect"
          subtitle="Designed to simplify healthcare management with modern technology and intelligent automation."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {whyChoose.map((item) => (
            <WhyChooseCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}

        </div>

      </div>

    </section>
  );
}