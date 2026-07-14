"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#dc2626",
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#7c3aed",
  "#ec4899",
  "#14b8a6",
  "#6b7280",
];

export default function BloodGroupChart({
  analytics,
}: any) {

  const data =
    analytics?.bloodGroups?.map(
      (item: any) => ({
        name: item._id || "Unknown",
        value: item.count,
      })
    ) || [];

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Blood Group Distribution

      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >

              {data.map(
                (_: any, index: number) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}