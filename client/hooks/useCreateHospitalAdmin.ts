"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createHospitalAdmin } from "@/services/adminInviteService";

export default function useCreateHospitalAdmin() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      createHospitalAdmin,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          "hospital-admins",
        ],

      });

      alert(
        "Hospital Admin invited successfully."
      );

    },

    onError: (error: any) => {

      alert(

        error.response?.data?.message ||

        "Unable to create Hospital Admin."

      );

    },

  });

}