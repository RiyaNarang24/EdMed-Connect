"use client";
import HospitalCard from "./HospitalCard";
import FadeIn from "../common/FadeIn";
import useHospitals from "@/hooks/useHospitals";
import { useState } from "react";
import SearchSection from "./SearchSection";
import { useEffect } from "react";
import Pagination from "../common/Pagination";
export default function FeaturedHospitals() {
const [search, setSearch] = useState("");
const [state, setState] = useState("");
const [city, setCity] = useState("");
const [page, setPage] = useState(1);
useEffect(() => {
  setPage(1);
}, [search, state, city]);
  const {
    data,
    isLoading,
    isError,
}=useHospitals(
  page,
  search,
  state,
  city
);
  if(isLoading){

return(

<section className="py-24 bg-white">

<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
  {Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="h-[420px] animate-pulse rounded-3xl bg-gray-200"
    />
  ))}
</div>

</section>

);

}
if(isError){

return(

<section className="py-24 bg-white">

<div className="text-center text-red-600">

Unable to load hospitals.

</div>

</section>

);

}

  return (
    <section className="pt-24 pb-32 bg-white ">

      <div className="max-w-7xl  mx-auto px-6">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[4px] text-red-600 font-semibold">
            Trusted Hospitals
          </p>

          <h2 className="text-5xl font-bold mt-4">
            India's Leading Healthcare Partners
          </h2>

          <p className="text-gray-500 mt-5 max-w-3xl mx-auto text-lg">
            Find verified hospitals across India with experienced doctors,
            advanced facilities and instant appointment booking.
          </p>

        </div>
        <SearchSection
  search={search}
  setSearch={setSearch}
  state={state}
  setState={setState}
  city={city}
  setCity={setCity}
/>
        <div className="mt-16">

  {data?.data?.length === 0 ? (

    <div className="py-20 text-center">

      <h2 className="text-3xl font-bold">
        No Hospitals Found
      </h2>

      <p className="mt-3 text-gray-500">
        Try changing your search or filters.
      </p>

    </div>

  ) : (

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

      {data?.data?.map((hospital:any,index:number)=>(

        <FadeIn
          key={hospital._id}
          delay={index * 0.1}
        >

          <HospitalCard
            hospital={hospital}
          />

        </FadeIn>

      ))}

    </div>

  )}

</div>
    <Pagination
  page={page}
  pages={data?.pages || 1}
  setPage={setPage}
/>
      </div>

    </section>
  );
}