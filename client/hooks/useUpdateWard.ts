"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWard } from "@/services/wardAdminService";

export default function useUpdateWard() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      ward,
    }: any) =>
      updateWard(id, ward),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-wards"],

      });

    },

  });

}