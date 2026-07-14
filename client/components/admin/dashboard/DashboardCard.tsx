import { ReactNode } from "react";

type Props = {

  title: string;

  value: number;

  icon: ReactNode;

};

export default function DashboardCard({

  title,

  value,

  icon,

}: Props) {

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">

            {title}

          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {value}

          </h2>

        </div>

        <div className="rounded-2xl bg-red-50 p-4 text-red-600">

          {icon}

        </div>

      </div>

    </div>

  );

}