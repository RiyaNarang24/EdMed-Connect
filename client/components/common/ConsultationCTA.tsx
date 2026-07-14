"use client";

import Link from "next/link";

export default function ConsultationCTA() {

  return (

    <section className="bg-gradient-to-r from-red-600 to-red-700 py-24 lg:py-32">

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

        {/* Left */}

        <div className="text-white">

          <h2 className="text-5xl font-bold">

            Need Expert Consultation?

          </h2>

          <p className="mt-6 leading-8 text-red-100">

            Connect with verified doctors and hospitals across India.

          </p>

          <ul className="mt-10 space-y-4">

            <li>✔ Verified Doctors</li>

            <li>✔ Instant Consultation Requests</li>

            <li>✔ AI Assisted Guidance</li>

            <li>✔ 24×7 Emergency Support</li>

          </ul>

        </div>

        {/* Right */}

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          <h3 className="text-3xl font-bold">

            Request Consultation

          </h3>

          <p className="mt-4 text-gray-600">

            Tell us about your medical concern and our specialists
            will connect you with the right doctor.

          </p>

          <Link

            href="/consultation"

            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-red-600 py-4 text-lg font-semibold text-white transition hover:bg-red-700"

          >

            Continue to Consultation

          </Link>

        </div>

      </div>

    </section>

  );

}