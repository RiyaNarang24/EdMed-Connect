"use client";

import Link from "next/link";
import useDeleteHospital from "@/hooks/useDeleteHospital";
import { useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";
export type Props = {
  hospitals: any[];
  onEdit: (hospital: any) => void;
};

export default function HospitalTable({
  hospitals,
  onEdit,
}: Props) {

  const deleteHospital = useDeleteHospital();
const [selectedHospital, setSelectedHospital] =
  useState<any>(null);

const [confirmOpen, setConfirmOpen] =
  useState(false);
  if (hospitals.length === 0) {
    return (
      <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

        <h2 className="text-2xl font-bold">
          No Hospitals Found
        </h2>

        <p className="mt-3 text-gray-500">
          Click "Add Hospital" to create your first hospital.
        </p>

      </div>
    );
  }

  return (

    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-8 py-5 text-left font-semibold">
              Hospital
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              City
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              State
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Status
            </th>

            <th className="px-8 py-5 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {hospitals.map((hospital) => (

            <tr
              key={hospital._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-8 py-6 font-medium">
                {hospital.hospitalName}
              </td>

              <td className="px-8 py-6">
                {hospital.city}
              </td>

              <td className="px-8 py-6">
                {hospital.state}
              </td>

              <td className="px-8 py-6">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    hospital.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {hospital.isActive ? "Active" : "Inactive"}
                </span>

              </td>
              <td className="px-8 py-6">

                <div className="flex justify-center gap-5">

                  <button
                 onClick={() => onEdit(hospital)}
                className="font-medium text-blue-600 hover:text-blue-800">
                  Edit
                 </button>

                  <button
                    onClick={() => {

               setSelectedHospital(hospital);

           setConfirmOpen(true);

}}
                    className="font-medium text-red-600 hover:text-red-800"
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
  title="Delete Hospital"
  message="Are you sure you want to delete this hospital? This action cannot be undone."
  onCancel={() => {

    setConfirmOpen(false);

    setSelectedHospital(null);

  }}
  onConfirm={() => {

    if (!selectedHospital) return;

    deleteHospital.mutate(
      selectedHospital._id,
      {

        onSuccess: () => {

          setConfirmOpen(false);

          setSelectedHospital(null);

        },

      }
    );

  }}
/>
    </div>

  );

}