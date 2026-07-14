"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteRoom,
} from "@/services/roomAdminService";

export default function useDeleteRoom() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: deleteRoom,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-rooms"],

      });

    },

  });

}