"use client";

import { useState } from "react";

import useAdminRooms from "@/hooks/useAdminRooms";
import useCreateRoom from "@/hooks/useCreateRoom";
import useUpdateRoom from "@/hooks/useUpdateRoom";

import RoomTable from "@/components/admin/rooms/RoomTable";
import RoomForm from "@/components/admin/rooms/RoomForm";
import Modal from "@/components/common/Modal";

export default function RoomsPage() {

  const { data, isLoading } =
    useAdminRooms();

  const createRoom =
    useCreateRoom();

  const updateRoom =
    useUpdateRoom();

  const [open, setOpen] =
    useState(false);

  const [editingRoom, setEditingRoom] =
    useState<any>(null);

  if (isLoading) {

    return <div>Loading...</div>;

  }

  return (

    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Rooms
        </h1>

        <button
          onClick={() => {
            setEditingRoom(null);
            setOpen(true);
          }}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          + Add Room
        </button>

      </div>

      <RoomTable
        rooms={data?.data || []}
        onEdit={(room) => {
          setEditingRoom(room);
          setOpen(true);
        }}
      />

      <Modal
        open={open}
        title={
          editingRoom
            ? "Edit Room"
            : "Add Room"
        }
        onClose={() => {
          setEditingRoom(null);
          setOpen(false);
        }}
      >

        <RoomForm
          initialData={editingRoom}
          loading={
            createRoom.isPending ||
            updateRoom.isPending
          }
          onSubmit={(formData) => {

            if (editingRoom) {

              updateRoom.mutate({

                id: editingRoom._id,

                room: formData,

              },{

                onSuccess:()=>{

                  setEditingRoom(null);

                  setOpen(false);

                }

              });

            } else {

              createRoom.mutate(formData,{

                onSuccess:()=>{

                  setOpen(false);

                }

              });

            }

          }}
        />

      </Modal>

    </div>

  );

}