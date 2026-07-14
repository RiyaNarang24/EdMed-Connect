"use client";

import { useState } from "react";

import useForgotPassword from "@/hooks/useForgotPassword";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const forgotPasswordMutation =
    useForgotPassword();

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    forgotPasswordMutation.mutate(
      email
    );

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-3 text-center text-5xl font-bold">

          Forgot Password

        </h1>

        <p className="mb-8 text-center text-gray-500">

          Enter your registered email address and we'll send you a password reset link.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            required

            className="w-full rounded-xl border p-4"

          />

          <button

            type="submit"

            disabled={
              forgotPasswordMutation.isPending
            }

            className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"

          >

            {forgotPasswordMutation.isPending

              ? "Sending..."

              : "Send Reset Link"}

          </button>

          {forgotPasswordMutation.isSuccess && (

            <div className="rounded-xl bg-green-100 p-4 text-green-700">

              Password reset link has been sent to your email.

            </div>

          )}

          {forgotPasswordMutation.isError && (

            <div className="rounded-xl bg-red-100 p-4 text-red-700">

              {(forgotPasswordMutation.error as any)
                ?.response?.data?.message ||

                "Unable to send reset email."}

            </div>

          )}

        </form>

      </div>

    </div>

  );

}