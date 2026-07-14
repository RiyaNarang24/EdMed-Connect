"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createRoom,
} from "@/services/roomAdminService";

export default function useCreateRoom() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: createRoom,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-rooms"],

      });

    },

  });

}