"use client";

import { useState } from "react";

import ConfirmModal from "@/components/common/ConfirmModal";

import useDeleteWard from "@/hooks/useDeleteWard";

type Props = {
  wards: any[];
  onEdit: (ward: any) => void;
};

export default function WardTable({
  wards,
  onEdit,
}: Props) {

  const deleteWard = useDeleteWard();

  const [selectedWard, setSelectedWard] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  if (wards.length === 0) {

    return (

      <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

        <h2 className="text-2xl font-bold">

          No Wards Found

        </h2>

        <p className="mt-3 text-gray-500">

          Click "Add Ward" to create your first ward.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-8 py-5 text-left">
              Ward
            </th>

            <th className="px-8 py-5 text-left">
              Department
            </th>

            <th className="px-8 py-5 text-left">
              Type
            </th>

            <th className="px-8 py-5 text-left">
              Beds
            </th>

            <th className="px-8 py-5 text-left">
              Status
            </th>

            <th className="px-8 py-5 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {wards.map((ward) => (

            <tr
              key={ward._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-8 py-6 font-medium">

                {ward.wardName}

              </td>

              <td className="px-8 py-6">

                {ward.department?.departmentName}

              </td>

              <td className="px-8 py-6">

                {ward.wardType}

              </td>

              <td className="px-8 py-6">

                {ward.totalBeds}

              </td>

              <td className="px-8 py-6">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    ward.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {ward.isActive
                    ? "Active"
                    : "Inactive"}

                </span>

              </td>

              <td className="px-8 py-6">

                <div className="flex justify-center gap-5">

                  <button
                    onClick={() =>
                      onEdit(ward)
                    }
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() => {

                      setSelectedWard(ward);

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

        title="Delete Ward"

        message="Are you sure you want to delete this ward?"

        onCancel={() => {

          setConfirmOpen(false);

          setSelectedWard(null);

        }}

        onConfirm={() => {

          if (!selectedWard) return;

          deleteWard.mutate(

            selectedWard._id,

            {

              onSuccess: () => {

                setConfirmOpen(false);

                setSelectedWard(null);

              },

            }

          );

        }}

      />

    </div>

  );

}