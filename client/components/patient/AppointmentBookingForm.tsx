"use client";

import { useState } from "react";

import useHospitals from "@/hooks/useHospitals";
import useDepartments from "@/hooks/useDepartments";
import useDoctors from "@/hooks/useDoctors";
import useBookAppointment from "@/hooks/useBookAppointment";

import { useAuth } from "@/context/AuthContext";

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

export default function AppointmentBookingForm() {

  const { user } = useAuth();
if (!user) {

  return (

    <div className="rounded-3xl bg-white p-10 text-center shadow">

      <h2 className="text-2xl font-bold">
        Please login first
      </h2>

      <p className="mt-2 text-gray-500">
        Login as a patient to book an appointment.
      </p>

    </div>

  );

}
  const bookAppointment =
    useBookAppointment();

  const { data: hospitalData } =
    useHospitals();

  const hospitals =
    hospitalData?.data || [];

  const [form, setForm] =
    useState({

      hospital: "",

      department: "",

      doctor: "",

      appointmentDate: "",

      appointmentTime: "",

      reason: "",

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
    e: any
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

  bookAppointment.mutate(form, {

    onSuccess: () => {

      alert("Appointment booked successfully.");

      setForm({

        hospital: "",

        department: "",

        doctor: "",

        appointmentDate: "",

        appointmentTime: "",

        reason: "",

      });

    },

    onError: (error: any) => {

      alert(

        error.response?.data?.message ||

        "Booking failed."

      );

    },

  });

};

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl bg-white p-8 shadow"
    >

      <h2 className="text-3xl font-bold">

        Book Appointment

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

      {/* Doctor */}

      <select

  disabled={!form.hospital}

        name="doctor"

        value={form.doctor}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      >

        <option value="">

          Select Doctor

        </option>

        {doctors.map((doctor: any) => (

          <option

            key={doctor._id}

            value={doctor._id}

          >

            Dr. {doctor.doctorName}

          </option>

        ))}

      </select>

      <input

  type="date"

  min={
    new Date()
      .toISOString()
      .split("T")[0]
  }

        name="appointmentDate"

        value={form.appointmentDate}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      />

      <select

  disabled={!form.hospital}

        name="appointmentTime"

        value={form.appointmentTime}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      >

        <option value="">

          Select Time Slot

        </option>

        {TIME_SLOTS.map((slot) => (

          <option

            key={slot}

            value={slot}

          >

            {slot}

          </option>

        ))}

      </select>

      <textarea

        rows={4}

        name="reason"

        value={form.reason}

        onChange={handleChange}

        placeholder="Reason for appointment"

        className="w-full rounded-xl border p-4"

      />

      <button

        disabled={bookAppointment.isPending}

        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700"

      >

        {bookAppointment.isPending

          ? "Booking..."

          : "Book Appointment"}

      </button>

    </form>

  );

}