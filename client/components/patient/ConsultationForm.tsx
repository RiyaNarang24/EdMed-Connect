"use client";

import { useState } from "react";

import useHospitals from "@/hooks/useHospitals";
import useDepartments from "@/hooks/useDepartments";
import useDoctors from "@/hooks/useDoctors";

import {
  useCreateConsultation,
} from "@/hooks/useConsultation";

const ConsultationForm = () => {

  const createConsultation =
    useCreateConsultation();

  const { data: hospitalData } =
    useHospitals();

  const hospitals =
    hospitalData?.data || [];

  const [form, setForm] =
    useState({

      hospital: "",

      department: "",

      doctor: "",

      preferredDate: "",

      symptoms: "",

    });

  const { data: departmentData } =
    useDepartments(
      form.hospital
    );

  const departments =
    departmentData?.data || [];

  const { data: doctorData } =
    useDoctors(
      form.hospital,
      form.department
    );

  const doctors =
    doctorData?.data || [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value } =
      e.target;

    if (name === "hospital") {

      setForm({

        ...form,

        hospital: value,

        department: "",

        doctor: "",

      });

      return;

    }

    if (name === "department") {

      setForm({

        ...form,

        department: value,

        doctor: "",

      });

      return;

    }

    setForm({

      ...form,

      [name]: value,

    });

  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    createConsultation.mutate(
      form,
      {

        onSuccess: () => {

          setForm({

            hospital: "",

            department: "",

            doctor: "",

            preferredDate: "",

            symptoms: "",

          });

        },

      }
    );

  };

  return (

    <form

      onSubmit={handleSubmit}

      className="space-y-6 rounded-3xl bg-white p-8 shadow"

    >

      <h2 className="text-3xl font-bold">

        Request Consultation

      </h2>

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

        {hospitals.map(
          (hospital: any) => (

            <option

              key={hospital._id}

              value={hospital._id}

            >

              {hospital.hospitalName}

            </option>

          )
        )}

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

        {departments.map(
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

      {/* Doctor */}

      <select

        name="doctor"

        value={form.doctor}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      >

        <option value="">

          Select Doctor

        </option>

        {doctors.map(
          (doctor: any) => (

            <option

              key={doctor._id}

              value={doctor._id}

            >

              Dr. {doctor.doctorName}

            </option>

          )
        )}

      </select>

      {/* Preferred Date */}

      <input

        type="date"

        name="preferredDate"

        value={form.preferredDate}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      />

      {/* Symptoms */}

      <textarea

        rows={6}

        name="symptoms"

        value={form.symptoms}

        onChange={handleChange}

        placeholder="Describe your symptoms..."

        className="w-full rounded-xl border p-4"

        required

      />

      <button

        type="submit"

        disabled={
          createConsultation.isPending
        }

        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700"

      >

        {createConsultation.isPending

          ? "Submitting..."

          : "Request Consultation"}

      </button>

    </form>

  );

};

export default ConsultationForm;