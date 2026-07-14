"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useAuth } from "@/context/AuthContext";

export default function HospitalAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    isAuthenticated,
    isHospitalAdmin,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isHospitalAdmin) {
      router.replace("/");
    }
  }, [
    isAuthenticated,
    isHospitalAdmin,
    router,
  ]);

  if (!isAuthenticated || !isHospitalAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}