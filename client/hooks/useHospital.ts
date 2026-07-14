"use client";

import { useQuery } from "@tanstack/react-query";
import { getHospital } from "@/services/hospitalService";

export default function useHospital(slug: string) {
  return useQuery({
    queryKey: ["hospital", slug],
    queryFn: () => getHospital(slug),
    enabled: !!slug,
  });
}