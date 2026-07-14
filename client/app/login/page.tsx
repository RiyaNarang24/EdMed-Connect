"use client";

import Link from "next/link";
import { useState } from "react";
import { Suspense } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
  function LoginForm() {

  const router = useRouter();
const searchParams = useSearchParams();

const redirect =
  searchParams.get("redirect");
  const { login } = useAuth();

  const [form, setForm] = useState({

    role: "patient",

    email: "",

    password: "",

  });

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res =
        await loginUser(form);

      

      login(
  res.user,
  res.token
);

// ===============================
// RETURN TO REQUESTED PAGE
// ===============================

if (
  redirect &&
  res.user.role === "patient"
) {
  router.push(redirect);
  return;
}

// ===============================
// ROLE BASED DASHBOARD
// ===============================

switch (res.user.role) {

  case "super-admin":
    router.push("/admin/dashboard");
    break;

 case "hospital-admin":

  router.push("/hospital-admin/dashboard");

  break;

  case "patient":
    router.push("/patient");
    break;

  default:
    router.push("/");
}

}

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Login Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl"
      >

        <h1 className="mb-8 text-center text-4xl font-bold">

          Login

        </h1>

        {/* Role */}

        <select

          name="role"

          value={form.role}

          onChange={handleChange}

          className="mb-5 w-full rounded-xl border p-4"

        >

          <option value="patient">

            Patient

          </option>

          <option value="hospital-admin">

            Hospital Admin

          </option>

          <option value="super-admin">

            Super Admin

          </option>

        </select>

        {/* Email */}

        <input

          className="mb-5 w-full rounded-xl border p-4"

          placeholder="Email"

          name="email"

          type="email"

          value={form.email}

          onChange={handleChange}

          required

        />

        {/* Password */}

        <div className="relative mb-3">

          <input

            className="w-full rounded-xl border p-4 pr-12"

            placeholder="Password"

            name="password"

            type={
              showPassword
                ? "text"
                : "password"
            }

            value={form.password}

            onChange={handleChange}

            required

          />

          <button

            type="button"

            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }

            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"

          >

            {showPassword ? (

              <EyeOff size={20} />

            ) : (

              <Eye size={20} />

            )}

          </button>

        </div>

        {/* Forgot Password */}

        <div className="mb-6 flex justify-end">

          <Link

            href="/forgot-password"

            className="text-sm font-medium text-red-600 hover:underline"

          >

            Forgot Password?

          </Link>

        </div>

        {/* Login */}

        <button

          disabled={loading}

          className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"

        >

          {loading
            ? "Please wait..."
            : "Login"}

        </button>

        {/* Register */}

        <div className="mt-6 text-center text-gray-500">

          Don't have an account?{" "}

          <Link

            href="/register"

            className="font-semibold text-red-600 hover:underline"

          >

            Register

          </Link>

        </div>

      </form>

    </div>

  );

}
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}