"use client";

import { useEffect, useState } from "react";

import useAdminHospitals from "@/hooks/useAdminHospitals";
import useAdminDepartments from "@/hooks/useAdminDepartments";
import useAdminWards from "@/hooks/useAdminWards";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function RoomForm({
  initialData,
  onSubmit,
  loading,
}: Props) {

  const { data: hospitalData } =
    useAdminHospitals();

  const hospitals =
    hospitalData?.data || [];

  const [selectedHospital, setSelectedHospital] =
    useState("");

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const { data: departmentData } =
    useAdminDepartments(selectedHospital);

  const departments =
    departmentData?.data || [];

  const { data: wardData } =
    useAdminWards(selectedDepartment);

  const wards =
    wardData?.data || [];

  const [form, setForm] =
    useState({

      ward: "",

      roomNumber: "",

      roomType: "General",

      floor: 1,

      capacity: 1,

      description: "",

    });

  useEffect(() => {

    if (initialData) {

      setSelectedHospital(
        initialData.ward?.department?.hospital?._id || ""
      );

      setSelectedDepartment(
        initialData.ward?.department?._id || ""
      );

      setForm({

        ward:
          initialData.ward?._id || "",

        roomNumber:
          initialData.roomNumber || "",

        roomType:
          initialData.roomType || "General",

        floor:
          initialData.floor || 1,

        capacity:
          initialData.capacity || 1,

        description:
          initialData.description || "",

      });

    }

  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
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

          setSelectedDepartment("");

          setForm({

            ...form,

            ward: "",

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
        value={selectedDepartment}
        onChange={(e) => {

          setSelectedDepartment(
            e.target.value
          );

          setForm({

            ...form,

            ward: "",

          });

        }}
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

      {/* Ward */}

      <select
        name="ward"
        value={form.ward}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      >

        <option value="">
          Select Ward
        </option>

        {wards.map((ward: any) => (

          <option
            key={ward._id}
            value={ward._id}
          >

            {ward.wardName}

          </option>

        ))}

      </select>

      <input
        name="roomNumber"
        placeholder="Room Number"
        value={form.roomNumber}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <select
        name="roomType"
        value={form.roomType}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        <option>General</option>
        <option>Private</option>
        <option>Deluxe</option>
        <option>Suite</option>
        <option>ICU</option>

      </select>

      <input
        name="floor"
        type="number"
        min={1}
        value={form.floor}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        name="capacity"
        type="number"
        min={1}
        value={form.capacity}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
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
          ? "Update Room"
          : "Add Room"}

      </button>

    </form>

  );

}