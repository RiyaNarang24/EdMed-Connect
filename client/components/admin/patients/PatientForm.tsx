"use client";

import { useEffect, useState } from "react";

import useAdminHospitals from "@/hooks/useAdminHospitals";
import useAdminDepartments from "@/hooks/useAdminDepartments";
import useAdminWards from "@/hooks/useAdminWards";
import useAdminRooms from "@/hooks/useAdminRooms";
import useAdminBeds from "@/hooks/useAdminBeds";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function PatientForm({
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

  const [selectedWard, setSelectedWard] =
    useState("");

  const [selectedRoom, setSelectedRoom] =
    useState("");

  const { data: departmentData } =
    useAdminDepartments(selectedHospital);

  const departments =
    departmentData?.data || [];

  const { data: wardData } =
    useAdminWards(selectedDepartment);

  const wards =
    wardData?.data || [];

  const { data: roomData } =
    useAdminRooms(selectedWard);

  const rooms =
    roomData?.data || [];

  const { data: bedData } =
    useAdminBeds(selectedRoom);

  const beds =
    bedData?.data || [];

  const [form, setForm] =
    useState({

      bed: "",

      fullName: "",

      age: "",

      gender: "Male",

      phone: "",

      email: "",

      address: "",

      bloodGroup: "O+",

      diagnosis: "",

      emergencyContact: "",

      admissionDate: "",

      status: "Admitted",

    });

  useEffect(() => {

    if (initialData) {

      setSelectedHospital(
        initialData.bed?.room?.ward?.department?.hospital?._id || ""
      );

      setSelectedDepartment(
        initialData.bed?.room?.ward?.department?._id || ""
      );

      setSelectedWard(
        initialData.bed?.room?.ward?._id || ""
      );

      setSelectedRoom(
        initialData.bed?.room?._id || ""
      );

      setForm({

        bed:
          initialData.bed?._id || "",

        fullName:
          initialData.fullName || "",

        age:
          initialData.age || "",

        gender:
          initialData.gender || "Male",

        phone:
          initialData.phone || "",

        email:
          initialData.email || "",

        address:
          initialData.address || "",

        bloodGroup:
          initialData.bloodGroup || "O+",

        diagnosis:
          initialData.diagnosis || "",

        emergencyContact:
          initialData.emergencyContact || "",

        admissionDate:
          initialData.admissionDate
            ? initialData.admissionDate.substring(0,10)
            : "",

        status:
          initialData.status || "Admitted",

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
      onSubmit={(e)=>{

        e.preventDefault();

        onSubmit(form);

      }}
      className="space-y-5"
    >

      {/* Hospital */}

      <select
        value={selectedHospital}
        onChange={(e)=>{

          setSelectedHospital(e.target.value);

          setSelectedDepartment("");

          setSelectedWard("");

          setSelectedRoom("");

          setForm({
            ...form,
            bed:"",
          });

        }}
        className="w-full rounded-xl border p-4"
      >

        <option value="">
          Select Hospital
        </option>

        {hospitals.map((hospital:any)=>(

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
        onChange={(e)=>{

          setSelectedDepartment(e.target.value);

          setSelectedWard("");

          setSelectedRoom("");

          setForm({
            ...form,
            bed:"",
          });

        }}
        className="w-full rounded-xl border p-4"
      >

        <option value="">
          Select Department
        </option>

        {departments.map((department:any)=>(

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
        value={selectedWard}
        onChange={(e)=>{

          setSelectedWard(e.target.value);

          setSelectedRoom("");

          setForm({
            ...form,
            bed:"",
          });

        }}
        className="w-full rounded-xl border p-4"
      >

        <option value="">
          Select Ward
        </option>

        {wards.map((ward:any)=>(

          <option
            key={ward._id}
            value={ward._id}
          >

            {ward.wardName}

          </option>

        ))}

      </select>

      {/* Room */}

      <select
        value={selectedRoom}
        onChange={(e)=>{

          setSelectedRoom(e.target.value);

          setForm({
            ...form,
            bed:"",
          });

        }}
        className="w-full rounded-xl border p-4"
      >

        <option value="">
          Select Room
        </option>

        {rooms.map((room:any)=>(

          <option
            key={room._id}
            value={room._id}
          >

            Room {room.roomNumber}

          </option>

        ))}

      </select>

      {/* Bed */}

      <select
        name="bed"
        value={form.bed}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      >

        <option value="">
          Select Bed
        </option>

        {beds.map((bed:any)=>(

          <option
            key={bed._id}
            value={bed._id}
          >

            Bed {bed.bedNumber}

          </option>

        ))}

      </select>

      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
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

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        name="emergencyContact"
        placeholder="Emergency Contact"
        value={form.emergencyContact}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <input
        name="admissionDate"
        type="date"
        value={form.admissionDate}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <select
        name="bloodGroup"
        value={form.bloodGroup}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >
        <option>A+</option>
        <option>A-</option>
        <option>B+</option>
        <option>B-</option>
        <option>AB+</option>
        <option>AB-</option>
        <option>O+</option>
        <option>O-</option>
      </select>

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <textarea
        name="diagnosis"
        placeholder="Diagnosis"
        value={form.diagnosis}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >
        <option>Admitted</option>
        <option>Discharged</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
      >

        {loading
          ? "Saving..."
          : initialData
          ? "Update Patient"
          : "Add Patient"}

      </button>

    </form>

  );

}