"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteHospitalAdmin } from "@/services/adminInviteService";

export default function useDeleteHospitalAdmin() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: deleteHospitalAdmin,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: ["hospital-admins"],

      });

      alert("Hospital Admin deleted.");

    },

  });

}