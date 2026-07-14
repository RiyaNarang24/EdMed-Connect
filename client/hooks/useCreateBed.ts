"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createBed,
} from "@/services/bedAdminService";

export default function useCreateBed() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: createBed,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-beds"],

      });

    },

  });

}