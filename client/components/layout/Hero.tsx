"use client";

import { useAuth } from "@/context/AuthContext";
import { ArrowRight, ShieldCheck, Stethoscope } from "lucide-react";
import FadeIn from "../common/FadeIn";
import Link from "next/link";
const Hero = () => {
  const { isAuthenticated, isPatient } = useAuth();

const appointmentLink =
  isAuthenticated && isPatient
    ? "/book-appointment"
    : "/login?redirect=/book-appointment";
  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-gray-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 lg:grid-cols-2">

        {/* Left Side */}
        <FadeIn>
        <div>
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            🇮🇳 India's Smart Healthcare Platform
          </span>

          <h1 className="mt-6 text-7xl leading-tight font-extrabold leading-tight text-gray-900">
            Your Health.
            <br />
            <span className="text-red-700">
              Our Technology.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-9 text-gray-600 leading-8 text-gray-600">
            Discover hospitals, consult trusted doctors, manage patient
            records and experience India's next generation healthcare
            ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

  <Link
  href={appointmentLink}
  className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white shadow-xl shadow-red-500/30 transition hover:-translate-y-1 hover:bg-red-700"
>
  Book Appointment
  <ArrowRight size={18} />
</Link>

  <Link
    href="/hospitals"
    className="rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold transition hover:border-red-500 hover:text-red-600"
  >
    Explore Hospitals
  </Link>

</div>
          <div className="mt-10 flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" />
              <span className="text-gray-700">
                Verified Hospitals
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Stethoscope className="text-red-700" />
              <span className="text-gray-700">
                Trusted Specialists
              </span>
            </div>
          </div>
        </div>
        </FadeIn>
        {/* Right Side */}
        <FadeIn delay={0.2}>
        <div className="flex justify-center">
          <div className="flex h-[450px] w-full max-w-md items-center justify-center rounded-3xl bg-gradient-to-br from-red-700 to-red-500 text-center text-white shadow-2xl">

            <div>
              <h2 className="text-3xl font-bold">
                EdMed Connect
              </h2>

              <p className="mt-4 text-red-100">
                Modern Healthcare Platform
              </p>

              <div className="mt-10 space-y-4">
                <div className="rounded-2xl bg-white/20 p-4">
                  🏥 500+ Hospitals
                </div>

                <div className="rounded-2xl bg-white/20 p-4">
                  👨‍⚕️ 5000+ Specialists
                </div>

                <div className="rounded-2xl bg-white/20 p-4">
                  ❤️ Trusted Across India
                </div>
              </div>
            
            </div>

          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;