"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminDepartments } from "@/services/departmentAdminService";

export default function useAdminDepartments(
  hospital = ""
) {

  return useQuery({

    queryKey: [
      "admin-departments",
      hospital,
    ],

    queryFn: () =>
      getAdminDepartments(hospital),

  });

}