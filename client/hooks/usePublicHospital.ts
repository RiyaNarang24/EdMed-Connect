"use client";

import { useQuery } from "@tanstack/react-query";
import { getHospitalBySlug } from "@/services/publicHospitalDetailsService";

export default function usePublicHospital(
  slug: string
) {

  return useQuery({

    queryKey: [
      "hospital",
      slug,
    ],

    queryFn: () =>
      getHospitalBySlug(slug),

    enabled: !!slug,

  });

}