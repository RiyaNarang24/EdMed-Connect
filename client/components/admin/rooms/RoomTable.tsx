"use client";

import { useState } from "react";

import ConfirmModal from "@/components/common/ConfirmModal";

import useDeleteRoom from "@/hooks/useDeleteRoom";

type Props = {
  rooms: any[];
  onEdit: (room: any) => void;
};

export default function RoomTable({
  rooms,
  onEdit,
}: Props) {

  const deleteRoom = useDeleteRoom();

  const [selectedRoom, setSelectedRoom] =
    useState<any>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  if (rooms.length === 0) {

    return (

      <div className="rounded-3xl border bg-white py-20 text-center shadow-sm">

        <h2 className="text-2xl font-bold">

          No Rooms Found

        </h2>

        <p className="mt-3 text-gray-500">

          Click "Add Room" to create your first room.

        </p>

      </div>

    );

  }

  return (

    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-8 py-5 text-left font-semibold">
              Room No.
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Ward
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Type
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Floor
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Capacity
            </th>

            <th className="px-8 py-5 text-left font-semibold">
              Status
            </th>

            <th className="px-8 py-5 text-center font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {rooms.map((room) => (

            <tr
              key={room._id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="px-8 py-6 font-medium">

                {room.roomNumber}

              </td>

              <td className="px-8 py-6">

                {room.ward?.wardName}

              </td>

              <td className="px-8 py-6">

                {room.roomType}

              </td>

              <td className="px-8 py-6">

                {room.floor}

              </td>

              <td className="px-8 py-6">

                {room.capacity}

              </td>

              <td className="px-8 py-6">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    room.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {room.isActive
                    ? "Active"
                    : "Inactive"}

                </span>

              </td>

              <td className="px-8 py-6">

                <div className="flex justify-center gap-5">

                  <button
                    onClick={() => onEdit(room)}
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() => {

                      setSelectedRoom(room);

                      setConfirmOpen(true);

                    }}
                    className="font-medium text-red-600 hover:text-red-800"
                  >

                    Delete

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <ConfirmModal

        open={confirmOpen}

        title="Delete Room"

        message="Are you sure you want to delete this room? This action cannot be undone."

        onCancel={() => {

          setConfirmOpen(false);

          setSelectedRoom(null);

        }}

        onConfirm={() => {

          if (!selectedRoom) return;

          deleteRoom.mutate(

            selectedRoom._id,

            {

              onSuccess: () => {

                setConfirmOpen(false);

                setSelectedRoom(null);

              },

            }

          );

        }}

      />

    </div>

  );

}