"use client";

import { useState } from "react";

import useAdminDepartments from "@/hooks/useAdminDepartments";
import useCreateDepartment from "@/hooks/useCreateDepartment";
import useUpdateDepartment from "@/hooks/useUpdateDepartment";

import DepartmentTable from "@/components/admin/departments/DepartmentTable";
import DepartmentForm from "@/components/admin/departments/DepartmentForm";
import Modal from "@/components/common/Modal";

export default function DepartmentsPage() {

  const { data, isLoading } =
    useAdminDepartments();

  const createDepartment =
    useCreateDepartment();

  const updateDepartment =
    useUpdateDepartment();

  const [open, setOpen] =
    useState(false);

  const [editingDepartment, setEditingDepartment] =
    useState<any>(null);

  if (isLoading) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Departments
        </h1>

        <button

          onClick={() => {

            setEditingDepartment(null);

            setOpen(true);

          }}

          className="rounded-xl bg-red-600 px-6 py-3 text-white font-semibold"

        >

          + Add Department

        </button>

      </div>

      <DepartmentTable

        departments={data?.data || []}

        onEdit={(department) => {

          setEditingDepartment(department);

          setOpen(true);

        }}

      />

      <Modal

        open={open}

        title={
          editingDepartment
            ? "Edit Department"
            : "Add Department"
        }

        onClose={() => {

          setEditingDepartment(null);

          setOpen(false);

        }}

      >

        <DepartmentForm

          initialData={editingDepartment}

          loading={
            createDepartment.isPending ||
            updateDepartment.isPending
          }

          onSubmit={(formData) => {

            if (editingDepartment) {

              updateDepartment.mutate(

                {

                  id: editingDepartment._id,

                  department: formData,

                },

                {

                  onSuccess: () => {

                    setOpen(false);

                    setEditingDepartment(null);

                  },

                }

              );

            } else {

              createDepartment.mutate(

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