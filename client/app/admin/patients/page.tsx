"use client";

import { useState } from "react";

import useAdminPatients from "@/hooks/useAdminPatients";
import useCreatePatient from "@/hooks/useCreatePatient";
import useUpdatePatient from "@/hooks/useUpdatePatient";

import PatientTable from "@/components/admin/patients/PatientTable";
import PatientForm from "@/components/admin/patients/PatientForm";
import Modal from "@/components/common/Modal";

export default function PatientsPage() {

  const { data, isLoading } =
    useAdminPatients();

  const createPatient =
    useCreatePatient();

  const updatePatient =
    useUpdatePatient();

  const [open, setOpen] =
    useState(false);

  const [editingPatient, setEditingPatient] =
    useState<any>(null);

  if (isLoading) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Patients
        </h1>

        <button
          onClick={() => {

            setEditingPatient(null);

            setOpen(true);

          }}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >

          + Add Patient

        </button>

      </div>

      <PatientTable

        patients={data?.data || []}

        onEdit={(patient) => {

          setEditingPatient(patient);

          setOpen(true);

        }}

      />

      <Modal

        open={open}

        title={
          editingPatient
            ? "Edit Patient"
            : "Add Patient"
        }

        onClose={() => {

          setEditingPatient(null);

          setOpen(false);

        }}

      >

        <PatientForm

          initialData={editingPatient}

          loading={
            createPatient.isPending ||
            updatePatient.isPending
          }

          onSubmit={(formData) => {

            if (editingPatient) {

              updatePatient.mutate({

                id: editingPatient._id,

                patient: formData,

              },{

                onSuccess:()=>{

                  setEditingPatient(null);

                  setOpen(false);

                }

              });

            } else {

              createPatient.mutate(formData,{

                onSuccess:()=>{

                  setOpen(false);

                }

              });

            }

          }}

        />

      </Modal>

    </div>

  );

}