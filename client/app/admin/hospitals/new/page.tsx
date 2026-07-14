"use client";

import { useRouter } from "next/navigation";
import HospitalForm from "@/components/admin/hospitals/HospitalForm";
import useCreateHospital from "@/hooks/useCreateHospital";

export default function NewHospitalPage() {

  const router = useRouter();

  const {
    mutate,
    isPending,
  } = useCreateHospital();

  const handleSubmit = (hospital: any) => {

    mutate(hospital, {

      onSuccess: () => {

        router.push("/admin/hospitals");

      },

    });

  };

  return (

    <div className="max-w-4xl">

      <h1 className="mb-8 text-4xl font-bold">

        Add Hospital

      </h1>

      <HospitalForm

        onSubmit={handleSubmit}

        loading={isPending}

      />

    </div>

  );

}