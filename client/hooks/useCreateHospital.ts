"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHospital } from "@/services/hospitalAdminService";

export default function useCreateHospital() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createHospital,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["admin-hospitals"],
      });

    },

  });

}