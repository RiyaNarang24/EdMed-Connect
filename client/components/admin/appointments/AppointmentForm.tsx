"use client";

import { useEffect, useMemo, useState } from "react";

import useAdminHospitals from "@/hooks/useAdminHospitals";
import useAdminDepartments from "@/hooks/useAdminDepartments";
import useAdminPatients from "@/hooks/useAdminPatients";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function AppointmentForm({
  initialData,
  onSubmit,
  loading,
}: Props) {

  const { data: hospitalData } = useAdminHospitals();
  const { data: departmentData } = useAdminDepartments();
  const { data: patientData } = useAdminPatients();

  const hospitals = hospitalData?.data || [];
  const departments = departmentData?.data || [];
  const patients = patientData?.data || [];

  const [selectedHospital, setSelectedHospital] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [form, setForm] = useState({

    hospital: "",

    department: "",

    patient: "",

    doctorName: "",

    appointmentDate: "",

    appointmentTime: "",

    reason: "",

    status: "Scheduled",

  });

  useEffect(() => {

    if (!initialData) return;

    setForm({

      hospital:
        initialData.hospital?._id || "",

      department:
        initialData.department?._id || "",

      patient:
        initialData.patient?._id || "",

      doctorName:
        initialData.doctorName || "",

      appointmentDate:
        initialData.appointmentDate
          ? initialData.appointmentDate.substring(0, 10)
          : "",

      appointmentTime:
        initialData.appointmentTime || "",

      reason:
        initialData.reason || "",

      status:
        initialData.status || "Scheduled",

    });

    setSelectedHospital(
      initialData.hospital?._id || ""
    );

    setSelectedDepartment(
      initialData.department?._id || ""
    );

  }, [initialData]);

  const filteredDepartments = useMemo(() => {

    return departments.filter(
      (department: any) =>
        department.hospital?._id === selectedHospital
    );

  }, [departments, selectedHospital]);

  const filteredPatients = useMemo(() => {

    return patients.filter(
      (patient: any) =>
        patient.department?._id === selectedDepartment
    );

  }, [patients, selectedDepartment]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    if (name === "hospital") {

      setSelectedHospital(value);

      setSelectedDepartment("");

      setForm({

        ...form,

        hospital: value,

        department: "",

        patient: "",

      });

      return;

    }

    if (name === "department") {

      setSelectedDepartment(value);

      setForm({

        ...form,

        department: value,

        patient: "",

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
      className="space-y-5"
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

        {filteredDepartments.map((department: any) => (

          <option
            key={department._id}
            value={department._id}
          >

            {department.departmentName}

          </option>

        ))}

      </select>

      <select
        name="patient"
        value={form.patient}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      >

        <option value="">
          Select Patient
        </option>

        {filteredPatients.map((patient: any) => (

          <option
            key={patient._id}
            value={patient._id}
          >

            {patient.fullName}

          </option>

        ))}

      </select>

      <input
        name="doctorName"
        placeholder="Doctor Name"
        value={form.doctorName}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        type="date"
        name="appointmentDate"
        value={form.appointmentDate}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        type="time"
        name="appointmentTime"
        value={form.appointmentTime}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <textarea
        name="reason"
        placeholder="Reason for Appointment"
        value={form.reason}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        rows={4}
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        <option value="Scheduled">
          Scheduled
        </option>

        <option value="Completed">
          Completed
        </option>

        <option value="Cancelled">
          Cancelled
        </option>

      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700"
      >

        {loading
          ? "Saving..."
          : initialData
          ? "Update Appointment"
          : "Book Appointment"}

      </button>

    </form>

  );

}