"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminWards } from "@/services/wardAdminService";

export default function useAdminWards(
  department = ""
) {

  return useQuery({

    queryKey: [
      "admin-wards",
      department,
    ],

    queryFn: () =>
      getAdminWards(department),

  });

}