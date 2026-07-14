"use client";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";
export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-10">

      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="mt-2 text-gray-500">
          You are successfully logged in.
        </p>

        <div className="mt-10 space-y-4">

          <div>
            <span className="font-semibold">
              Name :
            </span>{" "}
            {user?.fullName}
          </div>

          <div>
            <span className="font-semibold">
              Email :
            </span>{" "}
            {user?.email}
          </div>

          <div>
            <span className="font-semibold">
              Role :
            </span>{" "}
            {user?.role}
          </div>

        </div>

        <button
          onClick={logout}
          className="mt-10 rounded-xl bg-red-600 px-8 py-3 text-white"
        >
          Logout
        </button>

      </div>

    </div>
    </ProtectedRoute>
  );
}