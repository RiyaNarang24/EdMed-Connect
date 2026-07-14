"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment } from "@/services/departmentAdminService";

export default function useUpdateDepartment() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      department,
    }: {
      id: string;
      department: any;
    }) =>
      updateDepartment(id, department),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["admin-departments"],
      });

    },

  });

}