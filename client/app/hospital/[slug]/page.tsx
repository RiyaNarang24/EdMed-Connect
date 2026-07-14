"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  ArrowRight,
} from "lucide-react";

import usePublicHospital from "@/hooks/usePublicHospital";

export default function HospitalDetailsPage() {

  const { slug } = useParams();

  const { data, isLoading } =
    usePublicHospital(slug as string);

  if (isLoading) {

    return (

      <div className="py-40 text-center text-xl">

        Loading Hospital...

      </div>

    );

  }

  const hospital = data?.data;

  if (!hospital) {

    return (

      <div className="py-40 text-center">

        Hospital Not Found

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section
        className="py-20 text-white"
        style={{
          background: hospital.themeColor,
        }}
      >

        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-bold">

            {hospital.hospitalName}

          </h1>

          <p className="mt-5 flex items-center gap-2 text-xl">

            <MapPin size={22} />

            {hospital.city}, {hospital.state}

          </p>

        </div>

      </section>

      {/* Details */}

      <section className="mx-auto mt-12 max-w-7xl px-6">

        <div className="grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-3xl font-bold">

              Hospital Information

            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Building2 />

                <span>

                  {hospital.hospitalCode}

                </span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin />

                <span>

                  {hospital.address}

                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone />

                <span>

                  {hospital.phone}

                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail />

                <span>

                  {hospital.email}

                </span>

              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-3xl font-bold">

              Why Choose Us?

            </h2>

            <div className="space-y-5">

              <div className="rounded-2xl bg-red-50 p-5">

                🏥 Advanced Medical Facilities

              </div>

              <div className="rounded-2xl bg-red-50 p-5">

                👨‍⚕️ Experienced Specialists

              </div>

              <div className="rounded-2xl bg-red-50 p-5">

                🚑 Emergency Support

              </div>

              <div className="rounded-2xl bg-red-50 p-5">

                ❤️ Patient-Centered Care

              </div>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-14 rounded-3xl bg-white p-10 text-center shadow">

          <h2 className="text-4xl font-bold">

            Need Medical Assistance?

          </h2>

          <p className="mt-4 text-gray-500">

            Book your appointment with this hospital.

          </p>

          <Link

            href="/appointments"

            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-700"

          >

            Book Appointment

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

    </div>

  );

}