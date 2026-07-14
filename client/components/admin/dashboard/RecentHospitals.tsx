"use client";

export default function RecentHospitals({
  hospitals,
}: any) {

  return (

    <div className="space-y-4">

      <h2 className="mb-5 text-xl font-semibold">

        Recent Hospitals

      </h2>

      <div className="space-y-4">

        {hospitals.length === 0 ? (

          <p className="text-gray-500">

            No hospitals yet.

          </p>

        ) : (

          hospitals.map((hospital: any) => (

            <div
              key={hospital._id}
              className="flex items-center justify-between border-b pb-3"
            >

              <div>

                <h3 className="font-semibold">

                  {hospital.hospitalName}

                </h3>

                <p className="text-sm text-gray-500">

                  {hospital.city}, {hospital.state}

                </p>

              </div>

              <span className="text-xs text-gray-400">

                {new Date(
                  hospital.createdAt
                ).toLocaleDateString()}

              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}