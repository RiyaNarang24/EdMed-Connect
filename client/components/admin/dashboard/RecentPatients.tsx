"use client";

export default function RecentPatients({
  patients,
}: any) {

  return (

    <div className="space-y-4">

      <h2 className="mb-5 text-xl font-semibold">

        Recent Patients

      </h2>

      <div className="space-y-4">

        {patients.length === 0 ? (

          <p className="text-gray-500">

            No patients yet.

          </p>

        ) : (

          patients.map((patient: any) => (

            <div
              key={patient._id}
              className="flex items-center justify-between border-b pb-3"
            >

              <div>

                <h3 className="font-semibold">

                  {patient.fullName}

                </h3>

                <p className="text-sm text-gray-500">

                  Bed {patient.bed?.bedNumber || "-"}

                </p>

              </div>

              <span className="text-xs text-gray-400">

                {new Date(
                  patient.createdAt
                ).toLocaleDateString()}

              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}