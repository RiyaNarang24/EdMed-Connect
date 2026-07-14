"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWard } from "@/services/wardAdminService";

export default function useDeleteWard() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: deleteWard,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-wards"],

      });

    },

  });

}