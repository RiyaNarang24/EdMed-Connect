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
  "#3b82f6",
  "#ec4899",
  "#a855f7",
];

export default function GenderChart({
  analytics,
}: any) {

  const data = [

    {
      name: "Male",
      value: analytics.gender.Male,
    },

    {
      name: "Female",
      value: analytics.gender.Female,
    },

    {
      name: "Other",
      value: analytics.gender.Other,
    },

  ];

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">

        Gender Distribution

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

            {data.map((entry,index)=>(

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip/>

          <Legend/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}