"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHospital } from "@/services/hospitalAdminService";

export default function useUpdateHospital() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      hospital,
    }: {
      id: string;
      hospital: any;
    }) =>
      updateHospital(id, hospital),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["admin-hospitals"],
      });

    },

  });

}