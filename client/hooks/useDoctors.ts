"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctorService";

export default function useDoctors(
  hospitalId?: string,
  departmentId?: string
) {

  return useQuery({

    queryKey: [
      "doctors",
      hospitalId,
      departmentId,
    ],

    queryFn: () =>
      getDoctors(
        hospitalId,
        departmentId
      ),

    enabled:
      !!hospitalId &&
      !!departmentId,

  });

}