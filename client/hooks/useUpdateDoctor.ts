"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctor } from "@/services/doctorAdminService";

export default function useUpdateDoctor() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: updateDoctor,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["doctors"],
      });

    },

  });

}