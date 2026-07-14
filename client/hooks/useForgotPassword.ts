"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/authService";

export default function useForgotPassword() {

  return useMutation({

    mutationFn: forgotPassword,

  });

}