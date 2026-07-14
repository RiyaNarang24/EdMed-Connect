"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AppointmentBookingForm from "@/components/patient/AppointmentBookingForm";
import { useAuth } from "@/context/AuthContext";

export default function BookAppointmentPage() {

  const router = useRouter();

  const {

    user,

    isAuthenticated,

    isPatient,

  } = useAuth();

  useEffect(() => {

    if (!isAuthenticated) {

      localStorage.setItem(
        "redirectAfterLogin",
        "/book-appointment"
      );

      router.push("/login");

      return;

    }

    if (!isPatient) {

      alert(
        "Only patients can book appointments."
      );

      router.push("/");

    }

  }, [
    isAuthenticated,
    isPatient,
    router,
  ]);

  if (
    !isAuthenticated ||
    !isPatient
  ) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        Redirecting...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Hero */}

      <section className="bg-gradient-to-r from-red-700 to-red-600 py-16 text-white">

        <div className="mx-auto max-w-7xl px-8">

          <h1 className="text-5xl font-bold">

            Book Appointment

          </h1>

          <p className="mt-4 text-lg text-red-100">

            Welcome {user?.fullName},

            choose your preferred hospital,
            department and doctor.

          </p>

        </div>

      </section>

      {/* Form */}

      <div className="mx-auto max-w-4xl px-8 py-12">

        <AppointmentBookingForm />

      </div>

    </div>

  );

}