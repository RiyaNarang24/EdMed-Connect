"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminPatients } from "@/services/patientAdminService";

export default function useAdminPatients(
  bed = ""
) {

  return useQuery({

    queryKey: [
      "admin-patients",
      bed,
    ],

    queryFn: () =>
      getAdminPatients(bed),

  });

}