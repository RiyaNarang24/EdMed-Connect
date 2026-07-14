"use client";

import { useState } from "react";

import useAdminWards from "@/hooks/useAdminWards";
import useCreateWard from "@/hooks/useCreateWard";
import useUpdateWard from "@/hooks/useUpdateWard";

import WardTable from "@/components/admin/wards/WardTable";
import WardForm from "@/components/admin/wards/WardForm";
import Modal from "@/components/common/Modal";

export default function WardsPage() {

  const { data, isLoading } =
    useAdminWards();

  const createWard =
    useCreateWard();

  const updateWard =
    useUpdateWard();

  const [open, setOpen] =
    useState(false);

  const [editingWard, setEditingWard] =
    useState<any>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Wards
        </h1>

        <button
          onClick={() => {

            setEditingWard(null);

            setOpen(true);

          }}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >

          + Add Ward

        </button>

      </div>

      <WardTable

        wards={data?.data || []}

        onEdit={(ward) => {

          setEditingWard(ward);

          setOpen(true);

        }}

      />

      <Modal

        open={open}

        title={
          editingWard
            ? "Edit Ward"
            : "Add Ward"
        }

        onClose={() => {

          setEditingWard(null);

          setOpen(false);

        }}

      >

        <WardForm

          initialData={editingWard}

          loading={
            createWard.isPending ||
            updateWard.isPending
          }

          onSubmit={(formData) => {

            if (editingWard) {

              updateWard.mutate(

                {

                  id: editingWard._id,

                  ward: formData,

                },

                {

                  onSuccess: () => {

                    setEditingWard(null);

                    setOpen(false);

                  },

                }

              );

            } else {

              createWard.mutate(

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