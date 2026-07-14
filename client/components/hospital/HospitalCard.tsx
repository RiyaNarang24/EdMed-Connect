import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, BedDouble, ArrowRight } from "lucide-react";

type HospitalCardProps = {
  hospital: {
    _id: string;
    hospitalName: string;
    slug: string;
    city: string;
    state: string;
    coverImage?: string;
    rating: number;
    totalBeds: number;
    isActive: boolean;
  };
};

export default function HospitalCard({
  hospital,
}: HospitalCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-red-200 hover:shadow-2xl">

      {/* Hospital Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={hospital.coverImage || "/hospital1.jpg"}
          alt={hospital.hospitalName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">

        <div>
          <h3 className="text-2xl font-bold">
            {hospital.hospitalName}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-gray-500">
            <MapPin size={18} />
            <span>
              {hospital.city}, {hospital.state}
            </span>
          </div>
        </div>

        {/* Rating + Beds */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1 text-yellow-500">
            <Star
              size={18}
              fill="currentColor"
            />
            <span className="font-semibold">
              {hospital.rating}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <BedDouble size={18} />
            <span>{hospital.totalBeds} Beds</span>
          </div>

        </div>

        {/* Status */}
        <div>
          {hospital.isActive ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Active Hospital
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
              Currently Offline
            </span>
          )}
        </div>

        {/* Button */}
        <Link
          href={`/hospital/${hospital.slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-red-700 hover:to-red-800"
        >
          View Hospital
          <ArrowRight size={18} />
        </Link>

      </div>
    </div>
  );
}