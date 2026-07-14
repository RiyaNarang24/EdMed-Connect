"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatient } from "@/services/patientAdminService";

export default function useDeletePatient() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: deletePatient,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["admin-patients"],

      });

    },

  });

}