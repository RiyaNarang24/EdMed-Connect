"use client";

import { useEffect, useState } from "react";

import useAdminHospitals from "@/hooks/useAdminHospitals";
import useAdminDepartments from "@/hooks/useAdminDepartments";
import useAdminWards from "@/hooks/useAdminWards";
import useAdminRooms from "@/hooks/useAdminRooms";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export default function BedForm({
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

  const [form, setForm] =
    useState({

      room: "",

      bedNumber: "",

      bedType: "General",

      status: "Available",

      description: "",

    });

  useEffect(() => {

    if (initialData) {

      setSelectedHospital(
        initialData.room?.ward?.department?.hospital?._id || ""
      );

      setSelectedDepartment(
        initialData.room?.ward?.department?._id || ""
      );

      setSelectedWard(
        initialData.room?.ward?._id || ""
      );

      setForm({

        room:
          initialData.room?._id || "",

        bedNumber:
          initialData.bedNumber || "",

        bedType:
          initialData.bedType || "General",

        status:
          initialData.status || "Available",

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
          setSelectedWard("");

          setForm({
            ...form,
            room: "",
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

          setSelectedWard("");

          setForm({
            ...form,
            room: "",
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
        value={selectedWard}
        onChange={(e) => {

          setSelectedWard(
            e.target.value
          );

          setForm({
            ...form,
            room: "",
          });

        }}
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

      {/* Room */}

      <select
        name="room"
        value={form.room}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      >

        <option value="">
          Select Room
        </option>

        {rooms.map((room: any) => (

          <option
            key={room._id}
            value={room._id}
          >

            Room {room.roomNumber}

          </option>

        ))}

      </select>

      <input
        name="bedNumber"
        placeholder="Bed Number"
        value={form.bedNumber}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
        required
      />

      <select
        name="bedType"
        value={form.bedType}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        <option>General</option>
        <option>Private</option>
        <option>ICU</option>
        <option>Ventilator</option>

      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-xl border p-4"
      >

        <option>Available</option>
        <option>Occupied</option>
        <option>Reserved</option>
        <option>Maintenance</option>

      </select>

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
          ? "Update Bed"
          : "Add Bed"}

      </button>

    </form>

  );

}