import api from "./api";

export const getAdminBeds = async (
  room = ""
) => {

  const { data } = await api.get(
    "/beds",
    {
      params: {
        room,
      },
    }
  );

  return data;

};

export const createBed = async (
  bed: any
) => {

  const { data } = await api.post(
    "/beds",
    bed
  );

  return data;

};

export const updateBed = async (
  id: string,
  bed: any
) => {

  const { data } = await api.put(
    `/beds/${id}`,
    bed
  );

  return data;

};

export const deleteBed = async (
  id: string
) => {

  const { data } = await api.delete(
    `/beds/${id}`
  );

  return data;

};