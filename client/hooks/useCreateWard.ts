"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWard } from "@/services/wardAdminService";

export default function useCreateWard() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: createWard,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-wards"],

      });

    },

  });

}