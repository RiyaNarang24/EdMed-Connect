"use client";

import Link from "next/link";
import {
  HeartPulse,
  Target,
  Eye,
  ShieldCheck,
  Building2,
  Users,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AboutPage() {
    const { isAuthenticated, isPatient } = useAuth();
    const appointmentLink =
  isAuthenticated && isPatient
    ? "/book-appointment"
    : "/login?redirect=/book-appointment";
  return (
    <main className="bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-red-700 to-red-500 py-24 text-white">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            About EdMed Connect
          </span>

          <h1 className="mt-8 text-5xl font-bold md:text-6xl">
            Connecting Healthcare,
            <br />
            Empowering Lives.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl text-red-100">
            EdMed Connect is a modern healthcare platform that
            bridges hospitals, patients and healthcare professionals
            through secure digital technology.
          </p>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2">

        <div className="rounded-3xl bg-white p-10 shadow">

          <Target className="mb-5 text-red-600" size={40} />

          <h2 className="text-3xl font-bold">
            Our Mission
          </h2>

          <p className="mt-5 leading-8 text-gray-600">

            To simplify healthcare management by providing
            hospitals and patients with one secure,
            intelligent and easy-to-use digital ecosystem.

          </p>

        </div>

        <div className="rounded-3xl bg-white p-10 shadow">

          <Eye className="mb-5 text-red-600" size={40} />

          <h2 className="text-3xl font-bold">
            Our Vision
          </h2>

          <p className="mt-5 leading-8 text-gray-600">

            To become India's most trusted healthcare
            technology platform connecting hospitals,
            doctors and patients with innovative digital
            solutions.

          </p>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Why Choose EdMed Connect?
          </h2>

          <p className="mt-4 text-gray-500">
            Everything healthcare needs in one platform.
          </p>

        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl">

            <ShieldCheck
              className="text-green-600"
              size={40}
            />

            <h3 className="mt-5 text-2xl font-semibold">
              Secure Platform
            </h3>

            <p className="mt-4 text-gray-600">
              Built with secure authentication,
              encrypted access and role-based
              permissions.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl">

            <Building2
              className="text-red-600"
              size={40}
            />

            <h3 className="mt-5 text-2xl font-semibold">
              Connected Hospitals
            </h3>

            <p className="mt-4 text-gray-600">
              Discover trusted hospitals,
              departments and facilities
              across multiple locations.
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl">

            <HeartPulse
              className="text-pink-600"
              size={40}
            />

            <h3 className="mt-5 text-2xl font-semibold">
              Better Patient Care
            </h3>

            <p className="mt-4 text-gray-600">
              Streamlined appointments,
              digital records and faster
              communication improve
              patient experience.
            </p>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="bg-white py-20">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">

          <div className="text-center">

            <Building2
              className="mx-auto text-red-600"
              size={38}
            />

            <h3 className="mt-4 text-4xl font-bold">
              500+
            </h3>

            <p className="mt-2 text-gray-500">
              Hospitals
            </p>

          </div>

          <div className="text-center">

            <Users
              className="mx-auto text-red-600"
              size={38}
            />

            <h3 className="mt-4 text-4xl font-bold">
              10K+
            </h3>

            <p className="mt-2 text-gray-500">
              Patients
            </p>

          </div>

          <div className="text-center">

            <HeartPulse
              className="mx-auto text-red-600"
              size={38}
            />

            <h3 className="mt-4 text-4xl font-bold">
              5K+
            </h3>

            <p className="mt-2 text-gray-500">
              Specialists
            </p>

          </div>

          <div className="text-center">

            <ShieldCheck
              className="mx-auto text-red-600"
              size={38}
            />

            <h3 className="mt-4 text-4xl font-bold">
              99%
            </h3>

            <p className="mt-2 text-gray-500">
              Satisfaction
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-red-700 to-red-500 py-24 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-5xl font-bold">
            Experience Smarter Healthcare
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-red-100">
            Explore hospitals, discover healthcare
            services and book appointments with ease.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href="/hospitals"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-red-600 transition hover:-translate-y-1"
            >
              Explore Hospitals
            </Link>

            <Link
  href={appointmentLink}
  className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white shadow-xl shadow-red-500/30 transition hover:-translate-y-1 hover:bg-red-700"
>
  Book Appointment
  <ArrowRight size={18} />
</Link>

          </div>

        </div>

      </section>

    </main>
  );
}