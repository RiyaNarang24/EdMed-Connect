"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile } from "@/services/authService";
import { LogOut, Mail, Phone, User, Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PatientProfilePage() {
 const auth = useAuth();

console.log("AUTH =", auth);

const {
  user,
  logout,
  updateUser,
} = auth;
  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
  });

  // Populate form whenever user changes
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!editing) {
      setEditing(true);
      return;
    }

    try {
      const res = await updateProfile(form);

      updateUser(res.user);

      setEditing(false);

      alert("Profile updated successfully.");
    } catch (error: any) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to update profile."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-red-700 to-red-600 py-14 text-white">
        <div className="mx-auto max-w-6xl px-8">
          <h1 className="text-5xl font-bold">
            My Profile
          </h1>

          <p className="mt-3 text-red-100">
            Manage your personal information.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-8 py-10">
        <div className="rounded-3xl bg-white p-10 shadow">

          <div className="mb-10 flex items-center justify-between">

            <div>
              <h2 className="text-3xl font-bold">
                {user?.fullName}
              </h2>

              <p className="mt-2 text-gray-500">
                Super Admin Account
              </p>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl border border-red-600 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              <Pencil size={18} />

              {editing ? "Save Changes" : "Edit Profile"}
            </button>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Full Name */}

            <div className="rounded-2xl border p-6">

              <div className="mb-2 flex items-center gap-3">
                <User className="text-red-600" />
                <span className="font-semibold">
                  Full Name
                </span>
              </div>

              {editing ? (
                <input
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fullName: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border p-2"
                />
              ) : (
                <p>{user?.fullName}</p>
              )}

            </div>

            {/* Email */}

            <div className="rounded-2xl border p-6">

              <div className="mb-2 flex items-center gap-3">
                <Mail className="text-red-600" />
                <span className="font-semibold">
                  Email
                </span>
              </div>

              {editing ? (
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border p-2"
                />
              ) : (
                <p>{user?.email}</p>
              )}

            </div>

            {/* Phone */}

            <div className="rounded-2xl border p-6">

              <div className="mb-2 flex items-center gap-3">
                <Phone className="text-red-600" />
                <span className="font-semibold">
                  Phone
                </span>
              </div>

              {editing ? (
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border p-2"
                />
              ) : (
                <p>{user?.phone || "Not Available"}</p>
              )}

            </div>

            {/* Gender */}

            <div className="rounded-2xl border p-6">

              <div className="mb-2 flex items-center gap-3">
                <User className="text-red-600" />
                <span className="font-semibold">
                  Gender
                </span>
              </div>

              {editing ? (
                <select
                  value={form.gender}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      gender: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-lg border p-2"
                >
                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>
              ) : (
                <p>{user?.gender || "Not Available"}</p>
              )}

            </div>

          </div>

          <div className="mt-10">

            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              <LogOut size={20} />
              Logout
            </button>

          </div>

        </div>
      </section>
    </div>
  );
}