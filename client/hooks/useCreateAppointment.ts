"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "@/services/appointmentAdminService";

export default function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}