"use client";

import { useState } from "react";

import ConfirmModal from "@/components/common/ConfirmModal";

import useDeletePatient from "@/hooks/useDeletePatient";

type Props = {
  patients: any[];
  onEdit: (patient: any) => void;
};

export default function PatientTable({
  patients,
  onEdit,
}: Props) {

  const deletePatient =
    useDeletePatient();

  const [selectedPatient, setSelectedPatient] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  if (patients.length === 0) {

    return (

      <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

        <h2 className="text-2xl font-bold">

          No Patients Found

        </h2>

        <p className="mt-3 text-gray-500">

          Click "Add Patient" to register your first patient.

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
              Patient
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Bed
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Age
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Gender
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

          {patients.map((patient) => (

            <tr
              key={patient._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-8 py-6">

                <div>

                  <h3 className="font-semibold">

                    {patient.fullName}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {patient.phone}

                  </p>

                </div>

              </td>

              <td className="px-8 py-6">

                {patient.bed?.bedNumber}

              </td>

              <td className="px-8 py-6">

                {patient.age}

              </td>

              <td className="px-8 py-6">

                {patient.gender}

              </td>

              <td className="px-8 py-6">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    patient.status === "Admitted"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >

                  {patient.status}

                </span>

              </td>

              <td className="px-8 py-6">

                <div className="flex justify-center gap-5">

                  <button
                    onClick={() =>
                      onEdit(patient)
                    }
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() => {

                      setSelectedPatient(patient);

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

        title="Delete Patient"

        message="Are you sure you want to delete this patient? This action cannot be undone."

        onCancel={() => {

          setConfirmOpen(false);

          setSelectedPatient(null);

        }}

        onConfirm={() => {

          if (!selectedPatient) return;

          deletePatient.mutate(

            selectedPatient._id,

            {

              onSuccess: () => {

                setConfirmOpen(false);

                setSelectedPatient(null);

              },

            }

          );

        }}

      />

    </div>

  );

}