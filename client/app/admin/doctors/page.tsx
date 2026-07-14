"use client";

import { useState } from "react";

import useAdminDoctors from "@/hooks/useAdminDoctors";
import useCreateDoctor from "@/hooks/useCreateDoctor";
import useUpdateDoctor from "@/hooks/useUpdateDoctor";

import DoctorTable from "@/components/admin/doctors/DoctorTable";
import DoctorForm from "@/components/admin/doctors/DoctorForm";
import Modal from "@/components/common/Modal";

export default function DoctorsPage() {
const user =
  JSON.parse(
    localStorage.getItem("user") || "{}"
  );

const canManageDoctors =
  user.role === "super-admin" ||
  user.role === "hospital-admin";
  const { data, isLoading } =
    useAdminDoctors();

  const createDoctor =
    useCreateDoctor();

  const updateDoctor =
    useUpdateDoctor();

  const [open, setOpen] =
    useState(false);

  const [editingDoctor, setEditingDoctor] =
    useState<any>(null);

  if (isLoading) {

    return (

      <div className="text-center py-10">

        Loading...

      </div>

    );

  }

  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">

          Doctors

        </h1>

        {canManageDoctors && (

  <button
    onClick={() => {

      setEditingDoctor(null);

      setOpen(true);

    }}
    className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
  >

    + Add Doctor

  </button>

)}

      </div>

      <DoctorTable

        doctors={data?.data || []}

        onEdit={(doctor) => {

          setEditingDoctor(doctor);

          setOpen(true);

        }}

      />

      <Modal

        open={open}

        title={
          editingDoctor
            ? "Edit Doctor"
            : "Add Doctor"
        }

        onClose={() => {

          setEditingDoctor(null);

          setOpen(false);

        }}

      >

        <DoctorForm

          initialData={editingDoctor}

          loading={
            createDoctor.isPending ||
            updateDoctor.isPending
          }

          onSubmit={(formData) => {

            if (editingDoctor) {

              updateDoctor.mutate(

                {

                  id: editingDoctor._id,

                  doctor: formData,

                },

                {

                  onSuccess: () => {

                    setOpen(false);

                    setEditingDoctor(null);

                  },

                }

              );

            }

            else {

              createDoctor.mutate(

                formData,

                {

                  onSuccess: () => {

                    setOpen(false);

                  },

                }

              );

            }

          }}

        />

      </Modal>

    </div>

  );

}