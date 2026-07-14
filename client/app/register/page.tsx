"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { registerUser } from "@/services/authService";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({

  role: "patient",

  fullName: "",

  phone: "",

  gender: "Male",

  email: "",

  password: "",

  confirmPassword: "",

});

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

    if (form.password !== form.confirmPassword) {

      alert("Passwords do not match.");

      return;

    }

    try {

      setLoading(true);

      await registerUser({

  role: form.role,

  fullName: form.fullName,

  phone: form.phone,

  gender: form.gender,

  email: form.email,

  password: form.password,

});

      alert(
        "Registration Successful"
      );

      router.push("/login");

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

        "Registration Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <form

        onSubmit={handleSubmit}

        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl"

      >

        <h1 className="mb-8 text-center text-4xl font-bold">

        Register

        </h1>
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
        <input

          className="mb-5 w-full rounded-xl border p-4"

          placeholder="Full Name"

          name="fullName"

          value={form.fullName}

          onChange={handleChange}

          required

        />

        <input

          className="mb-5 w-full rounded-xl border p-4"

          placeholder="Phone Number"

          name="phone"

          value={form.phone}

          onChange={handleChange}

          required

        />

        <select

          name="gender"

          value={form.gender}

          onChange={handleChange}

          className="mb-5 w-full rounded-xl border p-4"

        >

          <option value="Male">

            Male

          </option>

          <option value="Female">

            Female

          </option>

          <option value="Other">

            Other

          </option>

        </select>

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

        <div className="relative mb-5">

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

            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"

          >

            {showPassword
              ? <EyeOff size={20}/>
              : <Eye size={20}/>}

          </button>

        </div>

        {/* Confirm Password */}

        <div className="relative mb-6">

          <input

            className="w-full rounded-xl border p-4 pr-12"

            placeholder="Confirm Password"

            name="confirmPassword"

            type={
              showConfirmPassword
                ? "text"
                : "password"
            }

            value={form.confirmPassword}

            onChange={handleChange}

            required

          />

          <button

            type="button"

            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }

            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"

          >

            {showConfirmPassword
              ? <EyeOff size={20}/>
              : <Eye size={20}/>}

          </button>

        </div>

        <button

          disabled={loading}

          className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700 disabled:opacity-50"

        >

          {loading
            ? "Creating Account..."
            : "Register"}

        </button>

        <div className="mt-6 text-center text-gray-500">

          Already have an account?{" "}

          <Link

            href="/login"

            className="font-semibold text-red-600 hover:underline"

          >

            Login

          </Link>

        </div>

      </form>

    </div>

  );

}