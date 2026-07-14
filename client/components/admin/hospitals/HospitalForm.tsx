"use client";

import { useEffect, useState } from "react";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function HospitalForm({
  initialData,
  onSubmit,
  loading = false,
}: Props) {

  const [form, setForm] = useState({
    hospitalName: "",
    hospitalCode: "",
    state: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    coverImage: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        hospitalName: initialData.hospitalName || "",
        hospitalCode: initialData.hospitalCode || "",
        state: initialData.state || "",
        city: initialData.city || "",
        address: initialData.address || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        coverImage: initialData.coverImage || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

  if (!initialData) {

    setForm({
      hospitalName: "",
      hospitalCode: "",
      state: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      coverImage: "",
    });

  }

};

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <input
        name="hospitalName"
        placeholder="Hospital Name"
        value={form.hospitalName}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="hospitalCode"
        placeholder="Hospital Code"
        value={form.hospitalCode}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        name="email"
        placeholder="Hospital Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        name="coverImage"
        placeholder="Image URL"
        value={form.coverImage}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Hospital"
          : "Add Hospital"}
      </button>

    </form>

  );
}