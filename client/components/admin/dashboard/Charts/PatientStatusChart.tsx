"use client";

import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
} from "recharts";

export default function PatientStatusChart({
  analytics,
}: any) {

  const data = [

    {
      status: "Admitted",
      count:
        analytics.admittedPatients,
    },

    {
      status: "Discharged",
      count:
        analytics.dischargedPatients,
    },

  ];

  return (

    <div className="rounded-3xl border bg-white p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">

      <h2 className="mb-5 text-xl font-semibold">

        Patient Status

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="status"/>

          <YAxis/>

          <Tooltip/>

          <Bar
  dataKey="count"
  fill="#dc2626"
  radius={[8, 8, 0, 0]}
/>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}