"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authService";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordMutation = useMutation({
    mutationFn: (newPassword: string) =>
      resetPassword(token as string, newPassword),

    onSuccess: () => {
      alert("Password updated successfully.");
      router.push("/login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    resetPasswordMutation.mutate(password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-3 text-center text-5xl font-bold">
          Reset Password
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Enter your new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full rounded-xl border p-4"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
            className="w-full rounded-xl border p-4"
          />

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >

            {resetPasswordMutation.isPending
              ? "Updating..."
              : "Reset Password"}

          </button>

          {resetPasswordMutation.isError && (

  <div className="rounded-xl bg-red-100 p-4 text-red-700">

    {(resetPasswordMutation.error as any)
      ?.response?.data?.message ||

      "Unable to reset password."}

  </div>

)}

        </form>

      </div>

    </div>
  );
}