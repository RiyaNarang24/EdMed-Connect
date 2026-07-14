"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowRight,
} from "lucide-react";

import usePublicHospitals from "@/hooks/usePublicHospitals";

export default function HospitalsPage() {

  const { data, isLoading } =
    usePublicHospitals();

  const [search, setSearch] =
    useState("");

  const hospitals =
    data?.data || [];

  const filteredHospitals =
    useMemo(() => {

      return hospitals.filter((hospital: any) => {

        return (
          hospital.hospitalName
            .toLowerCase()
            .includes(search.toLowerCase()) ||

          hospital.city
            .toLowerCase()
            .includes(search.toLowerCase()) ||

          hospital.state
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      });

    }, [hospitals, search]);

  if (isLoading) {
    return (
      <div className="py-40 text-center text-xl">
        Loading Hospitals...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-red-600 to-red-500 py-20 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-bold">
            Explore Hospitals
          </h1>

          <p className="mt-4 text-lg text-red-100">

            Browse trusted hospitals
            connected with EdMed Connect.

          </p>

        </div>

      </section>

      {/* Search */}

      <section className="mx-auto mt-10 max-w-7xl px-6">

        <div className="relative">

          <Search
            className="absolute left-5 top-4 text-gray-400"
          />

          <input
            placeholder="Search hospitals..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border bg-white py-4 pl-14 pr-4 shadow-sm focus:border-red-500 focus:outline-none"
          />

        </div>

      </section>

      {/* Cards */}

      <section className="mx-auto my-12 grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredHospitals.map(
          (hospital: any) => (

            <div
              key={hospital._id}
              className="rounded-3xl bg-white p-7 shadow transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div
                className="mb-6 h-2 rounded-full"
                style={{
                  background:
                    hospital.themeColor,
                }}
              />

              <h2 className="text-2xl font-bold">
                {hospital.hospitalName}
              </h2>

              <p className="mt-3 flex items-center gap-2 text-gray-500">

                <MapPin size={18} />

                {hospital.city},{" "}
                {hospital.state}

              </p>

              <p className="mt-4 text-sm text-gray-500">

                Hospital Code

              </p>

              <p className="font-semibold">

                {hospital.hospitalCode}

              </p>

              <span
                className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                  hospital.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >

                {hospital.isActive
                  ? "Active"
                  : "Inactive"}

              </span>

              <Link
                href={`/hospital/${hospital.slug}`}
                className="mt-8 flex items-center gap-2 font-semibold text-red-600 hover:gap-3"
              >

                View Hospital

                <ArrowRight size={18} />

              </Link>

            </div>

          )
        )}

      </section>

    </div>

  );

}