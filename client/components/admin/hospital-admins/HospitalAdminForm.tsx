"use client";

import { useState } from "react";

import useHospitals from "@/hooks/useHospitals";

type Props = {

  onSubmit: (data: any) => void;

  loading: boolean;

};

export default function HospitalAdminForm({

  onSubmit,

  loading,

}: Props) {

  const { data } = useHospitals();

  const hospitals = data?.data || [];

  const [form, setForm] = useState({

    fullName: "",

    email: "",

    phone: "",

    hospital: "",

  });

  const handleChange = (

    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = (

    e: React.FormEvent

  ) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <form

      onSubmit={handleSubmit}

      className="space-y-5"

    >

      <input

        name="fullName"

        placeholder="Full Name"

        value={form.fullName}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      />

      <input

        type="email"

        name="email"

        placeholder="Email"

        value={form.email}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      />

      <input

        name="phone"

        placeholder="Phone"

        value={form.phone}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      />

      <select

        name="hospital"

        value={form.hospital}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      >

        <option value="">

          Select Hospital

        </option>

        {hospitals.map((hospital: any) => (

          <option

            key={hospital._id}

            value={hospital._id}

          >

            {hospital.hospitalName}

          </option>

        ))}

      </select>

      <button

        disabled={loading}

        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white"

      >

        {loading

          ? "Creating..."

          : "Create Hospital Admin"}

      </button>

    </form>

  );

}