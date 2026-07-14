"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  bookAppointment,
  AppointmentPayload,
} from "@/services/appointmentBookingService";

export default function useBookAppointment() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      appointment: AppointmentPayload
    ) =>
      bookAppointment(
        appointment
      ),

    onSuccess: (response) => {

      // Patient Dashboard
      queryClient.invalidateQueries({

        queryKey: [
          "patient-appointments",
        ],

      });

      // Admin Dashboard
      queryClient.invalidateQueries({

        queryKey: [
          "admin-appointments",
        ],

      });

      // Generic Appointment Lists
      queryClient.invalidateQueries({

        queryKey: [
          "appointments",
        ],

      });

      return response;

    },

    onError: (error: any) => {

      console.error(
        "Appointment Booking Error:",
        error
      );

    },

  });

}