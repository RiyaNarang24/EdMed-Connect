"use client";

import { useState } from "react";

import ConfirmModal from "@/components/common/ConfirmModal";

import useDeleteBed from "@/hooks/useDeleteBed";

type Props = {
  beds: any[];
  onEdit: (bed: any) => void;
};

export default function BedTable({
  beds,
  onEdit,
}: Props) {

  const deleteBed = useDeleteBed();

  const [selectedBed, setSelectedBed] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  if (beds.length === 0) {

    return (

      <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

        <h2 className="text-2xl font-bold">

          No Beds Found

        </h2>

        <p className="mt-3 text-gray-500">

          Click "Add Bed" to create your first bed.

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
              Bed No.
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Room
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Type
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Status
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Active
            </th>

            <th className="px-8 py-5 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {beds.map((bed) => (

            <tr
              key={bed._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-8 py-6 font-medium">

                {bed.bedNumber}

              </td>

              <td className="px-8 py-6">

                {bed.room?.roomNumber}

              </td>

              <td className="px-8 py-6">

                {bed.bedType}

              </td>

              <td className="px-8 py-6">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    bed.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : bed.status === "Occupied"
                      ? "bg-red-100 text-red-700"
                      : bed.status === "Reserved"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >

                  {bed.status}

                </span>

              </td>

              <td className="px-8 py-6">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    bed.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {bed.isActive
                    ? "Active"
                    : "Inactive"}

                </span>

              </td>

              <td className="px-8 py-6">

                <div className="flex justify-center gap-5">

                  <button
                    onClick={() =>
                      onEdit(bed)
                    }
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() => {

                      setSelectedBed(bed);

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

        title="Delete Bed"

        message="Are you sure you want to delete this bed? This action cannot be undone."

        onCancel={() => {

          setConfirmOpen(false);

          setSelectedBed(null);

        }}

        onConfirm={() => {

          if (!selectedBed) return;

          deleteBed.mutate(

            selectedBed._id,

            {

              onSuccess: () => {

                setConfirmOpen(false);

                setSelectedBed(null);

              },

            }

          );

        }}

      />

    </div>

  );

}