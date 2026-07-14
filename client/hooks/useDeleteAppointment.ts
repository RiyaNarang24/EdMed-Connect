"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "@/services/appointmentAdminService";

export default function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}