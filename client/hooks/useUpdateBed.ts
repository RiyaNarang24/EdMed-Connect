"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateBed,
} from "@/services/bedAdminService";

export default function useUpdateBed() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      bed,
    }: any) =>
      updateBed(id, bed),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-beds"],

      });

    },

  });

}