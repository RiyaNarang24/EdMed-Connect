"use client";

import { useQuery } from "@tanstack/react-query";

import { getHospitalAdmins } from "@/services/adminInviteService";

export default function useHospitalAdmins() {

  return useQuery({

    queryKey: ["hospital-admins"],

    queryFn: getHospitalAdmins,

  });

}