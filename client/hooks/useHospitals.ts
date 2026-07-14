"use client";

import { useQuery } from "@tanstack/react-query";
import { getHospitals } from "@/services/hospitalService";

export default function useHospitals(
  page = 1,
  search = "",
  state = "",
  city = ""
) {
  return useQuery({
    queryKey: [
      "hospitals",
      page,
      search,
      state,
      city,
    ],

    queryFn: () =>
      getHospitals(
        page,
        search,
        state,
        city
      ),
  });
}