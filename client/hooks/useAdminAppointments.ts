"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/services/appointmentAdminService";

export default function useAdminAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}