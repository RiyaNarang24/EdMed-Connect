"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
];

export default function BedOccupancyChart({
  analytics,
}: any) {

  const data = [

    {
      name: "Available",
      value: analytics.availableBeds,
    },

    {
      name: "Occupied",
      value: analytics.occupiedBeds,
    },

  ];

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">

        Bed Occupancy

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}