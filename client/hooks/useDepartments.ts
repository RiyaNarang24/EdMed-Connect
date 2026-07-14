"use client";

import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "@/services/departmentService";

export default function useDepartments(
  hospitalId?: string
) {
  return useQuery({

    queryKey: [
      "departments",
      hospitalId,
    ],

    queryFn: () =>
      getDepartments(hospitalId),

    enabled: !!hospitalId,

  });
}