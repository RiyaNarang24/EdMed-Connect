import SectionHeading from "./SectionHeading";
import StatsCard from "./StatsCard";
import { stats } from "@/constants/statsData";

export default function StatsSection() {
  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          badge="Our Impact"
          title="Trusted Across India"
          subtitle="EdMed Connect is helping hospitals, doctors and patients with a modern healthcare ecosystem."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <StatsCard
              key={item.label}
              value={item.value}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}