"use client";

import { useState } from "react";

import useDeleteDoctor from "@/hooks/useDeleteDoctor";
import ConfirmModal from "@/components/common/ConfirmModal";

type Props = {
  doctors: any[];
  onEdit: (doctor: any) => void;
};

export default function DoctorTable({
  doctors,
  onEdit,
}: Props) {

  const deleteDoctor = useDeleteDoctor();

  const [selectedDoctor, setSelectedDoctor] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);
const user =
  JSON.parse(
    localStorage.getItem("user") || "{}"
  );

const canManageDoctors =
  user.role === "super-admin" ||
  user.role === "hospital-admin";
  if (doctors.length === 0) {

    return (

      <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

        <h2 className="text-2xl font-bold">
          No Doctors Found
        </h2>

        <p className="mt-3 text-gray-500">
          Click "Add Doctor" to create your first doctor.
        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>
<th className="px-6 py-4 text-left font-semibold">
  Photo
</th>
            <th className="px-6 py-5 text-left font-semibold">
              Doctor
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Hospital
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Department
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Specialization
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Experience
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Fee
            </th>

            <th className="px-6 py-5 text-left font-semibold">
              Availability
            </th>

            <th className="px-6 py-5 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {doctors.map((doctor: any) => (

            <tr
              key={doctor._id}
              className="border-t transition hover:bg-gray-50"
            >
<td className="px-6 py-5">

  <img
    src={
      doctor.profileImage ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        doctor.doctorName
      )}`
    }
    alt={doctor.doctorName}
    className="h-12 w-12 rounded-full object-cover border"
  />

</td>

<td className="px-6 py-5">
  {doctor.doctorName}
</td>
              <td className="px-6 py-5">

                <div>

                  <p className="font-semibold">
                    {doctor.doctorName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {doctor.doctorCode}
                  </p>

                </div>

              </td>

              <td className="px-6 py-5">
                {doctor.hospital?.hospitalName}
              </td>

              <td className="px-6 py-5">
                {doctor.department?.departmentName}
              </td>

              <td className="px-6 py-5">
                {doctor.specialization}
              </td>

              <td className="px-6 py-5">
                {doctor.experience} Years
              </td>

              <td className="px-6 py-5">
                ₹ {doctor.consultationFee}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    doctor.availability === "Available"
                      ? "bg-green-100 text-green-700"
                      : doctor.availability === "On Leave"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {doctor.availability}
                </span>

              </td>

              <td className="px-6 py-5">

  {canManageDoctors ? (

    <div className="flex justify-center gap-5">

      <button
        onClick={() => onEdit(doctor)}
        className="font-medium text-blue-600 hover:text-blue-800"
      >
        Edit
      </button>

      <button
        onClick={() => {

          setSelectedDoctor(doctor);

          setConfirmOpen(true);

        }}
        className="font-medium text-red-600 hover:text-red-800"
      >
        Delete
      </button>

    </div>

  ) : (

    <span className="text-sm text-gray-400">
      —
    </span>

  )}

</td>

            </tr>

          ))}

        </tbody>

      </table>

      <ConfirmModal

        open={confirmOpen}

        title="Delete Doctor"

        message="Are you sure you want to delete this doctor?"

        onCancel={() => {

          setConfirmOpen(false);

          setSelectedDoctor(null);

        }}

        onConfirm={() => {

          if (!selectedDoctor) return;

          deleteDoctor.mutate(

            selectedDoctor._id,

            {

              onSuccess: () => {

                setConfirmOpen(false);

                setSelectedDoctor(null);

              },

            }

          );

        }}

      />

    </div>

  );

}