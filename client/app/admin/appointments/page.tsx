"use client";

import { useState } from "react";

import useAdminAppointments from "@/hooks/useAdminAppointments";
import useCreateAppointment from "@/hooks/useCreateAppointment";
import useUpdateAppointment from "@/hooks/useUpdateAppointment";

import AppointmentTable from "@/components/admin/appointments/AppointmentTable";
import AppointmentForm from "@/components/admin/appointments/AppointmentForm";
import Modal from "@/components/common/Modal";

export default function AppointmentsPage() {
  const { data, isLoading } =
    useAdminAppointments();

  const createAppointment =
    useCreateAppointment();

  const updateAppointment =
    useUpdateAppointment();

  const [open, setOpen] =
    useState(false);

  const [editingAppointment, setEditingAppointment] =
    useState<any>(null);

  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <button
          onClick={() => {
            setEditingAppointment(null);
            setOpen(true);
          }}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white"
        >
          + Book Appointment
        </button>

      </div>

      <AppointmentTable
        appointments={data?.data || []}
        onEdit={(appointment) => {
          setEditingAppointment(
            appointment
          );
          setOpen(true);
        }}
      />

      <Modal
        open={open}
        title={
          editingAppointment
            ? "Edit Appointment"
            : "Book Appointment"
        }
        onClose={() => {
          setOpen(false);
          setEditingAppointment(null);
        }}
      >

        <AppointmentForm
          initialData={editingAppointment}
          loading={
            createAppointment.isPending ||
            updateAppointment.isPending
          }
          onSubmit={(formData) => {

            if (editingAppointment) {

              updateAppointment.mutate(
                {
                  id: editingAppointment._id,
                  appointment: formData,
                },
                {
                  onSuccess: () => {
                    setOpen(false);
                    setEditingAppointment(null);
                  },
                }
              );

            } else {

              createAppointment.mutate(
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