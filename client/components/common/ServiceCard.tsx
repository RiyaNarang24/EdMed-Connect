import { ArrowRight } from "lucide-react";
import { services } from "@/constants/serviceData";

type Service = (typeof services)[number];

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <Icon size={34} />
      </div>

      <h3 className="text-2xl font-bold">
        {service.title}
      </h3>

      <p className="mt-4 leading-7 text-gray-500">
        {service.description}
      </p>

      <button className="mt-8 flex items-center gap-2 font-semibold text-red-600 transition-all duration-300 group-hover:gap-3">
        Learn More
        <ArrowRight size={18} />
      </button>

    </div>
  );
}