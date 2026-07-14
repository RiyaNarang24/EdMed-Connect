"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getPatientAppointments,
} from "@/services/patientAppointmentService";

export default function usePatientAppointments() {

  return useQuery({

    queryKey: [
      "patient-appointments",
    ],

    queryFn:
      getPatientAppointments,

    staleTime:
      1000 * 60 * 5,

    refetchOnWindowFocus:
      false,

  });

}