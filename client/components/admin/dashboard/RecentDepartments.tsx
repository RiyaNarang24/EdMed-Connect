"use client";

export default function RecentDepartments({
  departments,
}: any) {

  return (

    <div className="space-y-4">

      <h2 className="mb-5 text-xl font-semibold">
        Recent Departments
      </h2>

      <div className="space-y-4">

        {departments.length === 0 ? (

          <div className="py-8 text-center">

            <p className="text-4xl">🏥</p>

            <p className="mt-3 font-medium text-gray-700">
              No departments yet
            </p>

            <p className="text-sm text-gray-500">
              Create your first department.
            </p>

          </div>

        ) : (

          departments.map((department: any) => (

            <div
              key={department._id}
              className="flex items-center justify-between border-b pb-3"
            >

              <div>

                <h3 className="font-semibold">
                  {department.departmentName}
                </h3>

                <p className="text-sm text-gray-500">
                  {department.hospital?.hospitalName}
                </p>

              </div>

              <span className="text-xs text-gray-400">
                {new Date(
                  department.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}