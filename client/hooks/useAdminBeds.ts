"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getAdminBeds,
} from "@/services/bedAdminService";

export default function useAdminBeds(
  room = ""
) {

  return useQuery({

    queryKey: [
      "admin-beds",
      room,
    ],

    queryFn: () =>
      getAdminBeds(room),

  });

}