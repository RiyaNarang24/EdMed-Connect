"use client";

import Link from "next/link";
import {
  Building2,
  Building,
  Hospital,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function QuickActions() {

  const { isHospitalAdmin } = useAuth();

  const basePath = isHospitalAdmin
    ? "/hospital-admin"
    : "/admin";

  const actions = [

    ...(isHospitalAdmin
      ? []
      : [
          {
            title: "Add Hospital",
            href: `${basePath}/hospitals`,
            icon: Building2,
          },
        ]),

    {
      title: "Add Department",
      href: `${basePath}/departments`,
      icon: Building,
    },

    {
      title: "Add Patient",
      href: `${basePath}/patients`,
      icon: UserPlus,
    },

    {
      title: "Manage Wards",
      href: `${basePath}/wards`,
      icon: Hospital,
    },

  ];

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">

        {actions.map((action) => {

          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-50 hover:shadow-lg"
            >
              <Icon
                size={34}
                className="mb-4 text-red-600"
              />

              <h3 className="font-semibold">
                {action.title}
              </h3>

            </Link>
          );
        })}

      </div>

    </div>
  );
}