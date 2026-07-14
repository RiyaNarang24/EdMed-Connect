"use client";

import { useEffect, useState } from "react";

import useAdminDepartments from "@/hooks/useAdminDepartments";
import useAdminHospitals from "@/hooks/useAdminHospitals";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function WardForm({
  initialData,
  onSubmit,
  loading,
}: Props) {

  const { data: hospitalData } =
    useAdminHospitals();

  const [selectedHospital, setSelectedHospital] =
    useState("");

  const { data } =
    useAdminDepartments(selectedHospital);

  const hospitals =
    hospitalData?.data || [];

  const departments =
    data?.data || [];

  const [form, setForm] =
    useState({

      department: "",

      wardName: "",

      wardCode: "",

      wardType: "General",

      totalBeds: 0,

      description: "",

    });

  useEffect(() => {

    if (initialData) {

      setSelectedHospital(
        initialData.department?.hospital?._id || ""
      );

      setForm({

        department:
          initialData.department?._id || "",

        wardName:
          initialData.wardName || "",

        wardCode:
          initialData.wardCode || "",

        wardType:
          initialData.wardType || "General",

        totalBeds:
          initialData.totalBeds || 0,

        description:
          initialData.description || "",

      });

    }

  }, [initialData]);

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

  return (

    <form
      onSubmit={(e) => {

        e.preventDefault();

        onSubmit(form);

      }}
      className="space-y-5"
    >

      {/* Hospital */}

      <select

        value={selectedHospital}

        onChange={(e) => {

          setSelectedHospital(
            e.target.value
          );

          setForm({

            ...form,

            department: "",

          });

        }}

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

      {/* Department */}

      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      >

        <option value="">
          Select Department
        </option>

        {departments.map((department: any) => (

          <option
            key={department._id}
            value={department._id}
          >

            {department.departmentName}

          </option>

        ))}

      </select>

      <input
        name="wardName"
        placeholder="Ward Name"
        value={form.wardName}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="wardCode"
        placeholder="Ward Code"
        value={form.wardCode}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <select
        name="wardType"
        value={form.wardType}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        <option>General</option>
        <option>Private</option>
        <option>ICU</option>
        <option>HDU</option>
        <option>Emergency</option>

      </select>

      <input
        name="totalBeds"
        type="number"
        placeholder="Total Beds"
        value={form.totalBeds}
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
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
      >

        {loading
          ? "Saving..."
          : initialData
          ? "Update Ward"
          : "Add Ward"}

      </button>

    </form>

  );

}