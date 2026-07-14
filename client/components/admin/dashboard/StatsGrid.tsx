"use client";

import DashboardCard from "./DashboardCard";

import {
  Hospital,
  Building,
  Building2,
  DoorOpen,
  BedDouble,
  Users,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function StatsGrid({ stats }: any) {

  const { isSuperAdmin } = useAuth();

  const cards = [

    ...(isSuperAdmin
      ? [
          {
            title: "Hospitals",
            value: stats.hospitals,
            icon: <Hospital size={30} />,
          },
        ]
      : []),

    {
      title: "Departments",
      value: stats.departments,
      icon: <Building size={30} />,
    },

    {
      title: "Wards",
      value: stats.wards,
      icon: <Building2 size={30} />,
    },

    {
      title: "Rooms",
      value: stats.rooms,
      icon: <DoorOpen size={30} />,
    },

    {
      title: "Beds",
      value: stats.beds,
      icon: <BedDouble size={30} />,
    },

    {
      title: "Patients",
      value: stats.patients,
      icon: <Users size={30} />,
    },

  ];

  return (

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {cards.map((card) => (

        <DashboardCard
          key={card.title}
          {...card}
        />

      ))}

    </div>

  );

}