"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment } from "@/services/departmentAdminService";

export default function useCreateDepartment() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: createDepartment,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["admin-departments"],
      });

    },

  });

}