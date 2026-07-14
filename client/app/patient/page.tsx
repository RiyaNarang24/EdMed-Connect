"use client";

import Link from "next/link";
import {
  CalendarDays,
 Droplets,
  User,
  HeartPulse,
  ArrowRight,
} from "lucide-react";
import { LogOut } from "lucide-react";
import usePatientConsultations from "@/hooks/usePatientConsultations";
import { useAuth } from "@/context/AuthContext";
import usePatientAppointments from "@/hooks/usePatientAppointments";
import { useRouter } from "next/dist/client/components/navigation";
export default function PatientDashboard() {

  const { user, logout } = useAuth();

const router = useRouter();
const {

  data,

  isLoading,

} = usePatientAppointments();

const appointments =
  data?.data || [];
  const bloodGroup =
  user?.bloodGroup || "Not Set";
const {
  data: consultationData,
} = usePatientConsultations();

const consultations =
  consultationData?.data || [];
const gender =
  user?.gender || "Not Set";
  return (

    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <section className="bg-gradient-to-r from-red-700 to-red-600 text-white">

        <div className="mx-auto flex max-w-7xl items-start justify-between px-8 py-12">

         <div>

  <h1 className="text-4xl font-bold">

    Welcome,

    <span className="ml-2">

      {user?.fullName || "Patient"}

    </span>

    👋

  </h1>

  <p className="mt-3 text-red-100">

    Manage appointments, consultations and medical records from one place.

  </p>

</div>

<button

  onClick={() => {

    logout();

    router.push("/");

  }}

  className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-red-700"

>

  <LogOut size={20} />

  Logout

</button>
        </div>

      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-8 py-10">

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow">

            <CalendarDays
              size={40}
              className="text-red-600"
            />

            <h2 className="mt-5 text-3xl font-bold">

              {appointments.length}

            </h2>

            <p className="text-gray-500">

              Appointments

            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <HeartPulse
              size={40}
              className="text-red-600"
            />

           <h2 className="mt-5 text-3xl font-bold">
  {consultations.length}
</h2>

            <p className="text-gray-500">

              Consultations

            </p>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

  <User
    size={40}
    className="text-red-600"
  />

  <h2 className="mt-5 text-3xl font-bold">

    {gender}

  </h2>

  <p className="text-gray-500">

    Gender

  </p>

</div>

          <div className="rounded-3xl bg-white p-6 shadow">

  <Droplets
    size={40}
    className="text-red-600"
  />

  <h2 className="mt-5 text-3xl font-bold">

    {bloodGroup}

  </h2>

  <p className="text-gray-500">

    Blood Group

  </p>

</div>

        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-3xl font-bold">

            Quick Actions

          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <Link

              href="/book-appointment"

              className="rounded-2xl border p-6 transition hover:border-red-600 hover:bg-red-50"

            >

              <CalendarDays className="mb-4 text-red-600"/>

              <h3 className="font-semibold">

                Book Appointment

              </h3>

            </Link>

            <Link

              href="/consultation"

              className="rounded-2xl border p-6 transition hover:border-red-600 hover:bg-red-50"

            >

              <HeartPulse className="mb-4 text-red-600"/>

              <h3 className="font-semibold">

                Request Consultation

              </h3>

            </Link>

            <Link

              href="/patient/profile"

              className="rounded-2xl border p-6 transition hover:border-red-600 hover:bg-red-50"

            >

              <User className="mb-4 text-red-600"/>

              <h3 className="font-semibold">

                My Profile

              </h3>

            </Link>

            <Link

              href="/contact"

              className="rounded-2xl border p-6 transition hover:border-red-600 hover:bg-red-50"

            >

              <ArrowRight className="mb-4 text-red-600"/>

              <h3 className="font-semibold">

                Contact Support

              </h3>

            </Link>

          </div>

        </div>

        {/* Upcoming Appointments */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-3xl font-bold">

            Upcoming Appointments

          </h2>

          {isLoading ? (

  <div className="rounded-2xl border border-dashed p-12 text-center">

    Loading appointments...

  </div>

) : appointments.length === 0 ? (

  <div className="rounded-2xl border border-dashed p-12 text-center text-gray-500">

    No appointments scheduled.

  </div>

) : (

  <div className="space-y-4">

    {appointments.map((appointment: any) => (

      <div

        key={appointment._id}

        className="rounded-2xl border p-5"

      >

        <h3 className="text-xl font-semibold">

          Dr. {appointment.doctor?.doctorName}

        </h3>

        <p className="mt-1 text-gray-600">

          {appointment.doctor?.specialization}

        </p>

        <p className="mt-2 text-gray-500">

          {appointment.hospital?.hospitalName}

        </p>

        <p className="text-gray-500">

          {appointment.department?.departmentName}

        </p>

        <p className="mt-3">

          <span className="font-semibold">

            Date:

          </span>{" "}

          {new Date(

            appointment.appointmentDate

          ).toLocaleDateString()}

        </p>

        <p>

          <span className="font-semibold">

            Time:

          </span>{" "}

          {appointment.appointmentTime}

        </p>

        <div className="mt-3">

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

            {appointment.status}

          </span>

        </div>

      </div>

    ))}

  </div>

)}

        </div>

        {/* Consultation History */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-3xl font-bold">

            Consultation History

          </h2>

          <div className="rounded-2xl border border-dashed p-12 text-center text-gray-500">

            No consultation requests found.

          </div>

        </div>

      </div>

    </div>

  );

}