import SectionHeading from "./SectionHeading";
import LiveStatusCard from "./LiveStatusCard";
import { liveStats } from "@/constants/liveStats";

export default function LiveHospitalStatus() {
  return (
    <section className="bg-gradient-to-r from-red-700 via-red-800 to-black  py-24 lg:py-32">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
  badge="Live Dashboard"
  title="Hospital Command Center"
  subtitle="Real-time operational insights across the EdMed Connect network."
  light
/>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {liveStats.map((item) => (
            <LiveStatusCard
              key={item.title}
              title={item.title}
              value={item.value}
              color={item.color}
            />
          ))}

        </div>

      </div>

    </section>
  );
}