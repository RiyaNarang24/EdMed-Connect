"use client";

import { useState } from "react";

import useDeleteAppointment from "@/hooks/useDeleteAppointment";
import useUpdateAppointment from "@/hooks/useUpdateAppointment";
import ConfirmModal from "@/components/common/ConfirmModal";

type Props = {
  appointments: any[];
  onEdit: (appointment: any) => void;
};

export default function AppointmentTable({
  appointments,
  onEdit,
}: Props) {

  const deleteAppointment =
    useDeleteAppointment();
const updateAppointment =
  useUpdateAppointment();
  const [selectedAppointment, setSelectedAppointment] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  if (appointments.length === 0) {

    return (

      <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

        <h2 className="text-2xl font-bold">
          No Appointments Found
        </h2>

        <p className="mt-3 text-gray-500">
          Click "Book Appointment" to create your first appointment.
        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-5 text-left font-semibold">
              Patient
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Hospital
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Department
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Doctor
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Date
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Time
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Status
            </th>

            <th className="px-6 py-5 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {appointments.map((appointment: any) => (

            <tr
              key={appointment._id}
              className="border-t transition hover:bg-gray-50"
            >

              <td className="px-6 py-5 font-medium">
                {appointment.patient?.fullName}
              </td>

              <td className="px-6 py-5">
                {appointment.hospital?.hospitalName}
              </td>

              <td className="px-6 py-5">
                {appointment.department?.departmentName}
              </td>

              <td className="px-6 py-5">

  <div className="font-medium">

    Dr. {appointment.doctor?.doctorName}

  </div>

  <div className="text-sm text-gray-500">

    {appointment.doctor?.specialization}

  </div>

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
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    appointment.status === "Scheduled"
                      ? "bg-blue-100 text-blue-700"
                      : appointment.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {appointment.status}
                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex flex-wrap justify-center gap-2">

  <button
    onClick={() =>
      onEdit(appointment)
    }
    className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200"
  >
    Edit
  </button>

  <button
    onClick={() =>
      updateAppointment.mutate({
        id: appointment._id,
        appointment: {
          status: "Scheduled",
        },
      })
    }
    className="rounded-lg bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 hover:bg-yellow-200"
  >
    Approve
  </button>

  <button
    onClick={() =>
      updateAppointment.mutate({
        id: appointment._id,
        appointment: {
          status: "Completed",
        },
      })
    }
    className="rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700 hover:bg-green-200"
  >
    Complete
  </button>

  <button
    onClick={() =>
      updateAppointment.mutate({
        id: appointment._id,
        appointment: {
          status: "Cancelled",
        },
      })
    }
    className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
  >
    Cancel
  </button>

  <button
    onClick={() => {

      setSelectedAppointment(
        appointment
      );

      setConfirmOpen(true);

    }}
    className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
  >
    Delete
  </button>

</div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <ConfirmModal

        open={confirmOpen}

        title="Delete Appointment"

        message="Are you sure you want to delete this appointment?"

        onCancel={() => {

          setConfirmOpen(false);

          setSelectedAppointment(null);

        }}

        onConfirm={() => {

          if (!selectedAppointment) return;

          deleteAppointment.mutate(

            selectedAppointment._id,

            {

              onSuccess: () => {

                setConfirmOpen(false);

                setSelectedAppointment(null);

              },

            }

          );

        }}

      />

    </div>

  );

}