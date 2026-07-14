"use client";

import { useState } from "react";

import useAdminHospitals from "@/hooks/useAdminHospitals";
import useCreateHospital from "@/hooks/useCreateHospital";
import useUpdateHospital from "@/hooks/useUpdateHospital";
import HospitalTable from "@/components/admin/hospitals/HospitalTable";
import HospitalForm from "@/components/admin/hospitals/HospitalForm";
import Modal from "@/components/common/Modal";

export default function HospitalsPage() {

 const { data, isLoading } = useAdminHospitals();

  const [open, setOpen] = useState(false);

  const createHospital = useCreateHospital();
const updateHospital =
useUpdateHospital();

const [editingHospital, setEditingHospital] =
useState<any>(null);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Hospitals
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          + Add Hospital
        </button>

      </div>

      <HospitalTable
hospitals={data?.data || []}
onEdit={(hospital) => {

setEditingHospital(hospital);

setOpen(true);

}}
/>

      <Modal
        open={open}
        title={
editingHospital
? "Edit Hospital"
: "Add Hospital"
}
        onClose={() => {

setEditingHospital(null);

setOpen(false);

}}
      >

        <HospitalForm

initialData={editingHospital}

loading={
createHospital.isPending ||
updateHospital.isPending
}

onSubmit={(formData) => {

if(editingHospital){

updateHospital.mutate({

id:
editingHospital._id,

hospital:
formData,

},

{

onSuccess:()=>{

setEditingHospital(null);

setOpen(false);

},

});

}else{

createHospital.mutate(

formData,

{

onSuccess:()=>{

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