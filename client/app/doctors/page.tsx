"use client";

import useAdminDoctors from "@/hooks/useAdminDoctors";

export default function DoctorsPage() {

  const { data, isLoading } = useAdminDoctors();

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading doctors...
      </div>
    );
  }

  const doctors = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-red-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Our Doctors
          </h1>

          <p className="mt-4 text-lg text-red-100">
            Meet experienced specialists across our partner hospitals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">

        {doctors.length === 0 ? (

          <div className="rounded-3xl bg-white p-16 text-center shadow">

            <h2 className="text-3xl font-bold">
              Doctors Coming Soon
            </h2>

            <p className="mt-4 text-gray-500">
              We are adding verified specialists.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {doctors.map((doctor: any) => (

              <div
                key={doctor._id}
                className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-2"
              >

                <img
  src={
    doctor.profileImage
      ? doctor.profileImage
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          doctor.doctorName
        )}`
  }
  alt={doctor.doctorName}
  className="mb-4 h-24 w-24 rounded-full border object-cover"
/>

                <h3 className="text-2xl font-bold">
  Dr. {doctor.doctorName}
</h3>

                <p className="mt-2 text-red-600">
                  {doctor.specialization}
                </p>

                <p className="mt-3 text-gray-500">
                  {doctor.hospital?.hospitalName}
                </p>

                <p className="mt-1 text-gray-500">
                  {doctor.experience} Years Experience
                </p>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}