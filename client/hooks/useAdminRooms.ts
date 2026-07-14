"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getAdminRooms,
} from "@/services/roomAdminService";

export default function useAdminRooms(
  ward = ""
) {

  return useQuery({

    queryKey: [
      "admin-rooms",
      ward,
    ],

    queryFn: () =>
      getAdminRooms(ward),

  });

}