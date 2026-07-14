"use client";

import useDeleteDepartment from "@/hooks/useDeleteDepartment";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useState } from "react";
type Props = {

  departments: any[];

  onEdit: (department: any) => void;

};

export default function DepartmentTable({

  departments,

  onEdit,

}: Props) {

  const deleteDepartment = useDeleteDepartment();

const [selectedDepartment, setSelectedDepartment] =
  useState<any>(null);

const [confirmOpen, setConfirmOpen] =
  useState(false);

  if (departments.length === 0) {

    return (

      <div className="rounded-3xl border bg-white py-20 text-center">

        No Departments Found

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl border bg-white">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Department
            </th>

            <th className="px-6 py-4 text-left">
              Hospital
            </th>

            <th className="px-6 py-4 text-left">
              HOD
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {departments.map((department) => (

            <tr
              key={department._id}
              className="border-t"
            >

              <td className="px-6 py-5">

                {department.departmentName}

              </td>

              <td className="px-6 py-5">

                {department.hospital?.hospitalName}

              </td>

              <td className="px-6 py-5">

                {department.hod}

              </td>

              <td className="px-6 py-5">

                {department.isActive
                  ? "Active"
                  : "Inactive"}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-5">

                  <button

                    onClick={() =>
                      onEdit(department)
                    }

                    className="text-blue-600"

                  >

                    Edit

                  </button>

                  <button

                   onClick={() => {

  setSelectedDepartment(department);

  setConfirmOpen(true);

}}

                    className="text-red-600"

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
  title="Delete Department"
  message="Are you sure you want to delete this department? This action cannot be undone."
  onCancel={() => {

    setConfirmOpen(false);

    setSelectedDepartment(null);

  }}
  onConfirm={() => {

    if (!selectedDepartment) return;

    deleteDepartment.mutate(
      selectedDepartment._id,
      {

        onSuccess: () => {

          setConfirmOpen(false);

          setSelectedDepartment(null);

        },

      }
    );

  }}
/>
    </div>

  );

}