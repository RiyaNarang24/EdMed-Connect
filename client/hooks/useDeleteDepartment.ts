"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDepartment } from "@/services/departmentAdminService";

export default function useDeleteDepartment() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: deleteDepartment,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["admin-departments"],
      });

    },

  });

}