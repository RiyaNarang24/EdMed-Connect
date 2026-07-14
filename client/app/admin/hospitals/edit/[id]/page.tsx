"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import useHospitals from "@/hooks/useHospitals";
import useUpdateHospital from "@/hooks/useUpdateHospital";

import HospitalForm from "@/components/admin/hospitals/HospitalForm";

export default function EditHospitalPage() {

  const { id } = useParams();

  const router = useRouter();

  const { data } = useHospitals();

  const hospital = data?.data?.find(
    (item: any) => item._id === id
  );

  const {
    mutate,
    isPending,
  } = useUpdateHospital();

  if (!hospital)
    return <div>Loading...</div>;

  return (

<div className="max-w-4xl">

<h1 className="mb-8 text-4xl font-bold">

Edit Hospital

</h1>

<HospitalForm

initialData={hospital}

loading={isPending}

onSubmit={(updatedHospital)=>{

mutate(

{

id,

hospital: updatedHospital,

},

{

onSuccess: ()=>{

router.push("/admin/hospitals");

},

}

);

}}

/>

</div>

);

}