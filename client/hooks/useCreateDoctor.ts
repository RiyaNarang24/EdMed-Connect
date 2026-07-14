"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctor } from "@/services/doctorAdminService";

export default function useCreateDoctor() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createDoctor,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

    },

  });

}