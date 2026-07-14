"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {
  user,
  isSuperAdmin,
}=useAuth();

const router =
useRouter();

useEffect(() => {

 if(!user){

    router.push("/login");
    return;
 }

 if(!isSuperAdmin){

    router.push("/");
 }

},[
    user,
    isSuperAdmin,
    router
]);
if (!user) {
  return null;
}
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <main className="flex-1">

        <Topbar />

        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}