"use client";

import { useEffect, useMemo, useState } from "react";

import useAdminHospitals from "@/hooks/useAdminHospitals";
import useAdminDepartments from "@/hooks/useAdminDepartments";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

const specializations = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
  "Gynecology",
  "ENT",
  "Ophthalmology",
  "Psychiatry",
  "Radiology",
  "Emergency Medicine",
  "Anesthesiology",
  "Oncology",
  "Urology",
];

export default function DoctorForm({
  initialData,
  onSubmit,
  loading,
}: Props) {

  const { data: hospitalData } =
    useAdminHospitals();

  const { data: departmentData } =
    useAdminDepartments();

  const hospitals =
    hospitalData?.data || [];

  const departments =
    departmentData?.data || [];

  const [selectedHospital, setSelectedHospital] =
    useState("");

  const [form, setForm] =
  useState({

    hospital: "",

    department: "",

    doctorName: "",

    doctorCode: "",

    profileImage: "",

    email: "",

    phone: "",

    gender: "Male",

    specialization: "General Medicine",

    qualification: "",

    experience: 0,

    consultationFee: 0,

    availability: "Available",

    description: "",

  });

  useEffect(() => {

    if (!initialData) return;

    setForm({

      hospital:
        initialData.hospital?._id || "",

      department:
        initialData.department?._id || "",

      doctorName:
        initialData.doctorName || "",

      doctorCode:
        initialData.doctorCode || "",
        profileImage:
  initialData.profileImage || "",

      email:
        initialData.email || "",

      phone:
        initialData.phone || "",

      gender:
        initialData.gender || "Male",

      specialization:
        initialData.specialization ||
        "General Medicine",

      qualification:
        initialData.qualification || "",

      experience:
        initialData.experience || 0,

      consultationFee:
        initialData.consultationFee || 0,

      availability:
        initialData.availability ||
        "Available",

      description:
        initialData.description || "",

    });

    setSelectedHospital(
      initialData.hospital?._id || ""
    );

  }, [initialData]);

  const filteredDepartments =
    useMemo(() => {

      return departments.filter(
        (department: any) =>
          department.hospital?._id ===
          selectedHospital
      );

    }, [departments, selectedHospital]);

  const handleChange = (
    e: any
  ) => {

    const { name, value } =
      e.target;

    if (name === "hospital") {

      setSelectedHospital(value);

      setForm({

        ...form,

        hospital: value,

        department: "",

      });

      return;

    }

    setForm({

  ...form,

  [name]: value,

});

  };

  return (

    <form
      onSubmit={(e) => {

        e.preventDefault();

        onSubmit(form);

      }}
      className="space-y-5 max-h-[75vh] overflow-y-auto pr-2"
    >

      {/* Hospital */}

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

        {filteredDepartments.map(
          (department: any) => (

            <option
              key={department._id}
              value={department._id}
            >
              {department.departmentName}
            </option>

          )
        )}

      </select>

      <input
        name="doctorName"
        placeholder="Doctor Name"
        value={form.doctorName}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />
<div>
  <label className="mb-2 block font-medium">
    Doctor Photo URL
  </label>

  <input
    type="text"
    name="profileImage"
    placeholder="https://example.com/doctor.jpg"
    value={form.profileImage}
    onChange={handleChange}
    className="w-full rounded-xl border p-4"
  />
  {form.profileImage && (

  <img
    src={form.profileImage}
    alt="Doctor Preview"
    className="mt-4 h-28 w-28 rounded-full border object-cover"
  />

)}
</div>
      <input
        name="doctorCode"
        placeholder="Doctor Code"
        value={form.doctorCode}
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
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        <option>Male</option>
        <option>Female</option>
        <option>Other</option>

      </select>

      <select
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        {specializations.map(
          (specialization) => (

            <option
              key={specialization}
            >
              {specialization}
            </option>

          )
        )}

      </select>

      <input
        name="qualification"
        placeholder="Qualification"
        value={form.qualification}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        type="number"
        name="experience"
        placeholder="Experience (Years)"
        value={form.experience}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        type="number"
        name="consultationFee"
        placeholder="Consultation Fee"
        value={form.consultationFee}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <select
        name="availability"
        value={form.availability}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        <option>Available</option>
        <option>On Leave</option>
        <option>Unavailable</option>

      </select>

      <textarea
        name="description"
        placeholder="Doctor Description"
        value={form.description}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700"
      >

        {loading
          ? "Saving..."
          : initialData
          ? "Update Doctor"
          : "Add Doctor"}

      </button>

    </form>

  );

}