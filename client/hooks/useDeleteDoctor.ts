"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctor } from "@/services/doctorAdminService";

export default function useDeleteDoctor() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: deleteDoctor,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

    },

  });

}