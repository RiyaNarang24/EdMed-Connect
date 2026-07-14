"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteBed,
} from "@/services/bedAdminService";

export default function useDeleteBed() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: deleteBed,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-beds"],

      });

    },

  });

}