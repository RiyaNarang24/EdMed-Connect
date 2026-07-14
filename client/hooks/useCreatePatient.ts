"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "@/services/patientAdminService";

export default function useCreatePatient() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: createPatient,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-patients"],

      });

    },

  });

}