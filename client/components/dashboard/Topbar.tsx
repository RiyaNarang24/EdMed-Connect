"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {

  const {

  user,

  logout,

  isHospitalAdmin,

} = useAuth();

  return (

    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white px-8">

      <div>

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, {user?.fullName || "Admin"}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <Link
         href={
  isHospitalAdmin
    ? "/hospital-admin/profile"
    : "/admin/profile"
}
          className="rounded-xl border p-3 hover:bg-gray-100"
        >
          <User size={20} />
        </Link>

        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
        >

          <div className="flex items-center gap-2">

            <LogOut size={18} />

            Logout

          </div>

        </button>

      </div>

    </header>

  );

}