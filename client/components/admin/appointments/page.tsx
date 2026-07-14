"use client";

import { useMemo } from "react";

import useAdminAppointments from "@/hooks/useAdminAppointments";
import { useAuth } from "@/context/AuthContext";

export default function AdminAppointmentsPage() {

  const { user, isSuperAdmin } =
    useAuth();

  const {
    data,
    isLoading,
  } = useAdminAppointments();

  const appointments =
    data?.data || [];

  const filteredAppointments =
    useMemo(() => {

      if (isSuperAdmin)
        return appointments;

      return appointments.filter(
        (appointment: any) =>
          appointment.hospital?._id ===
          user?.hospital
      );

    }, [
      appointments,
      isSuperAdmin,
      user,
    ]);

  if (isLoading) {

    return (
      <div className="py-20 text-center">

        Loading appointments...

      </div>
    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">

          Appointments

        </h1>

        <p className="mt-2 text-gray-500">

          Manage patient appointments.

        </p>

      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">

                Patient

              </th>

              <th className="px-6 py-4 text-left">

                Doctor

              </th>

              <th className="px-6 py-4 text-left">

                Hospital

              </th>

              <th className="px-6 py-4 text-left">

                Department

              </th>

              <th className="px-6 py-4 text-left">

                Date

              </th>

              <th className="px-6 py-4 text-left">

                Time

              </th>

              <th className="px-6 py-4 text-left">

                Status

              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAppointments.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >

                  No appointments found.

                </td>

              </tr>

            ) : (

              filteredAppointments.map(
                (appointment: any) => (

                  <tr
                    key={appointment._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">

                      <div className="font-semibold">

                        {appointment.patient?.fullName}

                      </div>

                      <div className="text-sm text-gray-500">

                        {appointment.patient?.email}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="font-semibold">

                        Dr. {appointment.doctor?.doctorName}

                      </div>

                      <div className="text-sm text-gray-500">

                        {appointment.doctor?.specialization}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      {appointment.hospital?.hospitalName}

                    </td>

                    <td className="px-6 py-5">

                      {appointment.department?.departmentName}

                    </td>

                    <td className="px-6 py-5">

                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}

                    </td>

                    <td className="px-6 py-5">

                      {appointment.appointmentTime}

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          appointment.status ===
                          "Scheduled"
                            ? "bg-blue-100 text-blue-700"
                            : appointment.status ===
                              "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {appointment.status}

                      </span>

                    </td>

                  </tr>

                )

              )

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}