"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatient } from "@/services/patientAdminService";

export default function useUpdatePatient() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      patient,
    }: any) =>
      updatePatient(id, patient),

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-patients"],

      });

    },

  });

}