"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {

  getConsultations,

  getMyConsultations,

  createConsultation,

  updateConsultation,

  deleteConsultation,

} from "@/services/consultationService";

// ======================================
// GET ALL CONSULTATIONS
// ======================================

export function useConsultations() {

  return useQuery({

    queryKey: ["consultations"],

    queryFn: getConsultations,

  });

}

// ======================================
// GET MY CONSULTATIONS
// ======================================

export function useMyConsultations() {

  return useQuery({

    queryKey: ["my-consultations"],

    queryFn: getMyConsultations,

  });

}

// ======================================
// CREATE CONSULTATION
// ======================================

export function useCreateConsultation() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      createConsultation,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          "consultations",
        ],

      });

      queryClient.invalidateQueries({

        queryKey: [
          "my-consultations",
        ],

      });

      alert(
        "Consultation request submitted successfully."
      );

    },

    onError: (error: any) => {

      alert(

        error.response?.data?.message ||

        "Unable to submit consultation request."

      );

    },

  });

}

// ======================================
// UPDATE CONSULTATION
// ======================================

export function useUpdateConsultation() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      updateConsultation,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          "consultations",
        ],

      });

      queryClient.invalidateQueries({

        queryKey: [
          "my-consultations",
        ],

      });

    },

  });

}

// ======================================
// DELETE CONSULTATION
// ======================================

export function useDeleteConsultation() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      deleteConsultation,

    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          "consultations",
        ],

      });

      queryClient.invalidateQueries({

        queryKey: [
          "my-consultations",
        ],

      });

    },

  });

}