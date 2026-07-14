"use client";

import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctorAdminService";

export default function useAdminDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
}