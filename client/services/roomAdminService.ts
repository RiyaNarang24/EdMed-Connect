import api from "./api";

export const getAdminRooms = async (
  ward = ""
) => {

  const { data } = await api.get(
    "/rooms",
    {
      params: {
        ward,
      },
    }
  );

  return data;

};

export const createRoom = async (
  room: any
) => {

  const { data } =
    await api.post(
      "/rooms",
      room
    );

  return data;

};

export const updateRoom = async (
  id: string,
  room: any
) => {

  const { data } =
    await api.put(
      `/rooms/${id}`,
      room
    );

  return data;

};

export const deleteRoom = async (
  id: string
) => {

  const { data } =
    await api.delete(
      `/rooms/${id}`
    );

  return data;

};