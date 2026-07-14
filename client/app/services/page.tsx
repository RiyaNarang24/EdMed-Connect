"use client";

import {
  HeartPulse,
  Stethoscope,
  Ambulance,
  Activity,
  Brain,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "Online Consultation",
    icon: Stethoscope,
    description:
      "Consult experienced doctors from the comfort of your home.",
  },
  {
    title: "Appointment Booking",
    icon: HeartPulse,
    description:
      "Book appointments with verified hospitals and specialists.",
  },
  {
    title: "Emergency Support",
    icon: Ambulance,
    description:
      "Quick access to emergency healthcare assistance.",
  },
  {
    title: "Health Monitoring",
    icon: Activity,
    description:
      "Track patient records and healthcare progress.",
  },
  {
    title: "Specialist Care",
    icon: Brain,
    description:
      "Access expert specialists across multiple departments.",
  },
  {
    title: "Verified Hospitals",
    icon: ShieldCheck,
    description:
      "Connect only with trusted and verified hospitals.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-red-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Our Services
          </h1>

          <p className="mt-4 text-xl text-red-100">
            Comprehensive healthcare services powered by EdMed Connect.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => {

            const Icon = service.icon;

            return (

              <div
                key={service.title}
                className="rounded-3xl bg-white p-8 shadow transition hover:-translate-y-2"
              >

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">

                  <Icon
                    size={34}
                    className="text-red-600"
                  />

                </div>

                <h2 className="text-2xl font-bold">
                  {service.title}
                </h2>

                <p className="mt-4 text-gray-600">
                  {service.description}
                </p>

              </div>

            );

          })}

        </div>

      </section>

    </div>
  );
}