"use client";

import Link from "next/link";
import useDeleteHospital from "@/hooks/useDeleteHospital";

type Props = {
  hospitals: any[];
};

export default function HospitalTable({
  hospitals,
}: Props) {

  const deleteHospital = useDeleteHospital();

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

                  <Link
                    href={`/admin/hospitals/edit/${hospital._id}`}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => {

                      const ok = window.confirm(
                        "Delete this hospital permanently?"
                      );

                      if (ok) {
                        deleteHospital.mutate(
                          hospital._id
                        );
                      }

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

    </div>

  );

}