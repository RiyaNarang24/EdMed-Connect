"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHospital } from "@/services/hospitalAdminService";

export default function useDeleteHospital() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: deleteHospital,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["admin-hospitals"],
      });

    },

  });

}