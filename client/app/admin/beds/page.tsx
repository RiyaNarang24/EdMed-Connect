"use client";

import { useState } from "react";

import useAdminBeds from "@/hooks/useAdminBeds";
import useCreateBed from "@/hooks/useCreateBed";
import useUpdateBed from "@/hooks/useUpdateBed";

import BedTable from "@/components/admin/beds/BedTable";
import BedForm from "@/components/admin/beds/BedForm";
import Modal from "@/components/common/Modal";

export default function BedsPage() {

  const { data, isLoading } =
    useAdminBeds();

  const createBed =
    useCreateBed();

  const updateBed =
    useUpdateBed();

  const [open, setOpen] =
    useState(false);

  const [editingBed, setEditingBed] =
    useState<any>(null);

  if (isLoading) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">

          Beds

        </h1>

        <button

          onClick={() => {

            setEditingBed(null);

            setOpen(true);

          }}

          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"

        >

          + Add Bed

        </button>

      </div>

      <BedTable

        beds={data?.data || []}

        onEdit={(bed) => {

          setEditingBed(bed);

          setOpen(true);

        }}

      />

      <Modal

        open={open}

        title={
          editingBed
            ? "Edit Bed"
            : "Add Bed"
        }

        onClose={() => {

          setEditingBed(null);

          setOpen(false);

        }}

      >

        <BedForm

          initialData={editingBed}

          loading={
            createBed.isPending ||
            updateBed.isPending
          }

          onSubmit={(formData) => {

            if (editingBed) {

              updateBed.mutate({

                id: editingBed._id,

                bed: formData,

              },{

                onSuccess:()=>{

                  setEditingBed(null);

                  setOpen(false);

                }

              });

            } else {

              createBed.mutate(formData,{

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