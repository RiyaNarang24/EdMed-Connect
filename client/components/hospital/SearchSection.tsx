"use client";

import { Search, MapPin, Building2 } from "lucide-react";

type SearchSectionProps = {
  search: string;
  setSearch: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
};

export default function SearchSection({
  search,
  setSearch,
  state,
  setState,
  city,
  setCity,
}: SearchSectionProps) {
  return (
    <section className="-mt-8 relative z-20 bg-transparent rounded-3xl">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">

          <h2 className="mb-6 text-lg font-bold uppercase tracking-wider text-gray-700">
            Search Care Instantly
          </h2>

          <div className="grid gap-4 md:grid-cols-4">

            {/* Search */}

            <div className="flex items-center rounded-xl border px-4">

              <Search
                className="text-red-600"
                size={20}
              />

              <input
                type="text"
                placeholder="Hospital Name..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full p-4 outline-none"
              />

            </div>

            {/* State */}

            <div className="flex items-center rounded-xl border px-4">

              <MapPin
                className="text-red-600"
                size={20}
              />

              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity("");
                }}
                className="w-full bg-transparent p-4 outline-none"
              >
                <option value="">All States</option>

                <option value="Delhi">
                  Delhi
                </option>

                <option value="Haryana">
                  Haryana
                </option>

                <option value="Rajasthan">
                  Rajasthan
                </option>

              </select>

            </div>

            {/* City */}

            <div className="flex items-center rounded-xl border px-4">

              <Building2
                className="text-red-600"
                size={20}
              />

              <select
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="w-full bg-transparent p-4 outline-none"
              >

                <option value="">
                  All Cities
                </option>

                {state === "Delhi" && (
                  <>
                    <option value="New Delhi">
                      New Delhi
                    </option>
                  </>
                )}

                {state === "Haryana" && (
                  <>
                    <option value="Gurugram">
                      Gurugram
                    </option>
                  </>
                )}

                {state === "Rajasthan" && (
                  <>
                    <option value="Jaipur">
                      Jaipur
                    </option>
                  </>
                )}

              </select>

            </div>

            {/* Search Button */}

            <button className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-lg font-semibold text-white transition hover:from-red-700 hover:to-red-800 p-4">
              Search Now
            </button>

          </div>

        </div>
    </section>
  );
}