"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminHospitals } from "@/services/hospitalAdminService";

export default function useAdminHospitals() {
  return useQuery({
    queryKey: ["admin-hospitals"],
    queryFn: getAdminHospitals,
  });
}