"use client";

import { useQuery } from "@tanstack/react-query";
import { getHospitals } from "@/services/publicHospitalService";

export default function usePublicHospitals() {
  return useQuery({
    queryKey: ["public-hospitals"],
    queryFn: getHospitals,
  });
}