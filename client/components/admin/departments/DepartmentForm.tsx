"use client";

import { useEffect, useState } from "react";
import useAdminHospitals from "@/hooks/useAdminHospitals";

type Props = {

  initialData?: any;

  onSubmit: (data: any) => void;

  loading?: boolean;

};

export default function DepartmentForm({

  initialData,

  onSubmit,

  loading,

}: Props) {

  const { data } =
    useAdminHospitals();

  const hospitals =
    data?.data || [];

  const [form, setForm] =
    useState({

      hospital: "",

      departmentName: "",

      departmentCode: "",

      description: "",

      hod: "",

      phone: "",

      email: "",

    });

  useEffect(() => {

    if (initialData) {

      setForm({

        hospital:
          initialData.hospital?._id || "",

        departmentName:
          initialData.departmentName || "",

        departmentCode:
          initialData.departmentCode || "",

        description:
          initialData.description || "",

        hod:
          initialData.hod || "",

        phone:
          initialData.phone || "",

        email:
          initialData.email || "",

      });

    }

  }, [initialData]);

  const handleChange = (

    e: any

  ) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };

  return (

    <form

      onSubmit={(e) => {

        e.preventDefault();

        onSubmit(form);

      }}

      className="space-y-4"

    >

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

      <input
        name="departmentName"
        placeholder="Department Name"
        value={form.departmentName}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="departmentCode"
        placeholder="Department Code"
        value={form.departmentCode}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="hod"
        placeholder="Head of Department"
        value={form.hod}
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
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        className="w-full rounded-xl border p-4"
      />

      <button

        disabled={loading}

        className="w-full rounded-xl bg-red-600 py-4 text-white font-semibold"

      >

        {loading
          ? "Saving..."
          : initialData
          ? "Update Department"
          : "Add Department"}

      </button>

    </form>

  );

}