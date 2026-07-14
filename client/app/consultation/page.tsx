"use client";

import ConsultationForm from "@/components/patient/ConsultationForm";

export default function ConsultationPage() {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Hero */}

      <section className="bg-gradient-to-r from-red-700 to-red-600 text-white">

        <div className="mx-auto max-w-6xl px-8 py-14">

          <h1 className="text-5xl font-bold">

            Request Consultation

          </h1>

          <p className="mt-4 max-w-2xl text-lg text-red-100">

            Connect with experienced specialists from
            India's leading hospitals. Select your
            preferred hospital, department and doctor,
            describe your symptoms and submit your
            consultation request.

          </p>

        </div>

      </section>

      {/* Form */}

      <section className="mx-auto max-w-5xl px-6 py-12">

        <ConsultationForm />

      </section>

    </div>

  );

}