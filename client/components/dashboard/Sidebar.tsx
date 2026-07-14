"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { sidebarLinks } from "@/constants/sidebarLinks";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
export default function Sidebar() {
  const pathname = usePathname();
const { user } = useAuth();
const { isHospitalAdmin } = useAuth();

const basePath = isHospitalAdmin
  ? "/hospital-admin"
  : "/admin";
  return (
    <aside className="sticky top-0 h-screen w-72 border-r bg-white">

      <div className="border-b p-6">

        <Link
  href={`${basePath}/dashboard`}
  className="flex items-center gap-3"
>
          <Image
            src="/logo.png"
            alt="EdMed"
            width={42}
            height={42}
          />

          <div>

            <h2 className="font-bold text-xl">
              EdMed Admin
            </h2>

            <p className="text-sm text-gray-500">
              Hospital Management
            </p>

          </div>

        </Link>

      </div>

      <nav className="p-4">

        {sidebarLinks
  .filter((item) => {

    if (
      user?.role === "hospital-admin" &&
      (
        item.title === "Hospitals" ||
        item.title === "Hospital Admins"
      )
    ) {
      return false;
    }

    return true;

  })
  .map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={`${basePath}${item.href}`}
              className={cn(
                "mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition",
                pathname === item.href
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-100"
              )}
            >
              <Icon size={20} />

              {item.title}

            </Link>
          );
        })}

      </nav>

    </aside>
  );
}