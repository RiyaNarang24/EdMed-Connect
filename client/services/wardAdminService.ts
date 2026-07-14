import api from "./api";

export const getAdminWards = async (
  department = ""
) => {

  const { data } = await api.get(
    "/wards",
    {
      params: {
        department,
      },
    }
  );

  return data;

};

export const createWard = async (
  ward: any
) => {

  const { data } =
    await api.post(
      "/wards",
      ward
    );

  return data;

};

export const updateWard = async (
  id: string,
  ward: any
) => {

  const { data } =
    await api.put(
      `/wards/${id}`,
      ward
    );

  return data;

};

export const deleteWard = async (
  id: string
) => {

  const { data } =
    await api.delete(
      `/wards/${id}`
    );

  return data;

};