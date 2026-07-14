"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateRoom,
} from "@/services/roomAdminService";

export default function useUpdateRoom() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      room,
    }: any) =>
      updateRoom(id, room),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-rooms"],

      });

    },

  });

}