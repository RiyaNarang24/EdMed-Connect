"use client";

import useDashboard from "@/hooks/useDashboard";
import { useAuth } from "@/context/AuthContext";
import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import RecentPatients from "@/components/admin/dashboard/RecentPatients";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import RecentHospitals from "@/components/admin/dashboard/RecentHospitals";
import BedOccupancyChart from "@/components/admin/dashboard/Charts/BedOccupancyChart";
import GenderChart from "@/components/admin/dashboard/Charts/GenderChart";
import PatientStatusChart from "@/components/admin/dashboard/Charts/PatientStatusChart";
import BloodGroupChart from "@/components/admin/dashboard/Charts/BloodGroupChart";
import RecentDepartments from "@/components/admin/dashboard/RecentDepartments";
export default function DashboardPage() {

  const { data, isLoading } = useDashboard();
const { isSuperAdmin } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
  <div className="space-y-10">

    {/* Statistics */}
    <StatsGrid stats={data.stats} />

    {/* Analytics */}
    <section>

      <h2 className="mb-6 text-3xl font-bold">
        Analytics Overview
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        <BedOccupancyChart
          analytics={data.analytics}
        />

        <GenderChart
          analytics={data.analytics}
        />

        <PatientStatusChart
          analytics={data.analytics}
        />

        <BloodGroupChart
          analytics={data.analytics}
        />

      </div>

    </section>

    {/* Recent Activity */}

    <section>

      <h2 className="mb-6 text-3xl font-bold">
        Recent Activity
      </h2>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">

        <div className="grid gap-10 lg:grid-cols-3">

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              👤 Patients
            </h3>

            <RecentPatients
              patients={data.recentPatients}
            />

          </div>

          {isSuperAdmin && (

<div>

  <h3 className="mb-5 text-xl font-semibold">
    🏥 Hospitals
  </h3>

  <RecentHospitals
    hospitals={data.recentHospitals}
  />

</div>

)}

          <div>

            <h3 className="mb-5 text-xl font-semibold">
              🩺 Departments
            </h3>

            <RecentDepartments
              departments={data.recentDepartments}
            />

          </div>

        </div>

      </div>

    </section>

    {/* Bottom */}

    <div className="grid gap-6 lg:grid-cols-2">

      <QuickActions />

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-2xl font-bold">
          Last Updated
        </h2>

        <p className="text-gray-500">
          {new Date(
            data.lastUpdated
          ).toLocaleString()}
        </p>

      </div>

    </div>

  </div>
);
}