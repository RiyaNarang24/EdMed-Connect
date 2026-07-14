"use client";

import useCreateHospitalAdmin from "@/hooks/useCreateHospitalAdmin";
import useHospitalAdmins from "@/hooks/useHospitalAdmins";
import useDeleteHospitalAdmin from "@/hooks/useDeleteHospitalAdmin";

import HospitalAdminForm from "@/components/admin/hospital-admins/HospitalAdminForm";

export default function HospitalAdminsPage() {

  const createHospitalAdmin =
    useCreateHospitalAdmin();

  const deleteHospitalAdmin =
    useDeleteHospitalAdmin();

  const {
    data,
    isLoading,
  } = useHospitalAdmins();

  const admins =
    data?.data || [];

  return (

    <div className="space-y-10">

      {/* Add Form */}

      <div className="mx-auto max-w-3xl">

        <h1 className="mb-8 text-4xl font-bold">

          Add Hospital Admin

        </h1>

        <div className="rounded-3xl bg-white p-8 shadow">

          <HospitalAdminForm

            loading={
              createHospitalAdmin.isPending
            }

            onSubmit={(formData) =>

              createHospitalAdmin.mutate(formData)

            }

          />

        </div>

      </div>

      {/* Table */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <h2 className="mb-6 text-3xl font-bold">

          Hospital Admins

        </h2>

        {isLoading ? (

          <p>Loading...</p>

        ) : admins.length === 0 ? (

          <p className="text-gray-500">

            No Hospital Admins Found.

          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b">

                <tr>

                  <th className="px-4 py-4 text-left">

                    Name

                  </th>

                  <th className="px-4 py-4 text-left">

                    Email

                  </th>

                  <th className="px-4 py-4 text-left">

                    Phone

                  </th>

                  <th className="px-4 py-4 text-left">

                    Hospital

                  </th>

                  <th className="px-4 py-4 text-center">

                    Status

                  </th>

                  <th className="px-4 py-4 text-center">

                    Action

                  </th>

                </tr>

              </thead>

              <tbody>

                {admins.map((admin: any) => (

                  <tr
                    key={admin._id}
                    className="border-b"
                  >

                    <td className="px-4 py-4">

                      {admin.fullName}

                    </td>

                    <td className="px-4 py-4">

                      {admin.email}

                    </td>

                    <td className="px-4 py-4">

                      {admin.phone}

                    </td>

                    <td className="px-4 py-4">

                      {admin.hospital?.hospitalName}

                    </td>

                    <td className="px-4 py-4 text-center">

                      {admin.used ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">

                          Registered

                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">

                          Pending

                        </span>

                      )}

                    </td>

                    <td className="px-4 py-4 text-center">

                      <button

                        onClick={() => {

                          if (

                            confirm(

                              "Delete this Hospital Admin?"

                            )

                          ) {

                            deleteHospitalAdmin.mutate(

                              admin._id

                            );

                          }

                        }}

                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"

                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}