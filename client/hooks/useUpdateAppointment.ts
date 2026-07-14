"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "@/services/appointmentAdminService";

export default function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointment,

   onSuccess: () => {

  queryClient.invalidateQueries({
    queryKey: ["appointments"],
  });

  queryClient.invalidateQueries({
    queryKey: ["admin-appointments"],
  });

  queryClient.invalidateQueries({
    queryKey: ["patient-appointments"],
  });

},
  });
}