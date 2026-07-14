"use client";

import {
  ShieldCheck,
  CalendarCheck,
  Stethoscope,
  Bot,
  PhoneCall,
  FileLock2,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Hospitals",
    description: "Only trusted and verified healthcare partners.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    description: "Book appointments within minutes.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Bot,
    title: "AI Assistance",
    description: "Smart healthcare guidance powered by AI.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: FileLock2,
    title: "Secure Records",
    description: "Your medical records stay private and protected.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Stethoscope,
    title: "Expert Specialists",
    description: "Connect with India's leading specialists.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: PhoneCall,
    title: "24×7 Support",
    description: "Healthcare support whenever you need it.",
    color: "bg-cyan-100 text-cyan-600",
  },
];

const FeatureHighlights = () => {
  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-red-700">
            Why Choose Us
          </span>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Healthcare Made Smarter
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Built to simplify healthcare journeys for patients,
            hospitals and medical professionals.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;