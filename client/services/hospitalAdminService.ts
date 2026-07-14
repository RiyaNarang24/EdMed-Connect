import api from "./api";

export const getAdminHospitals = async () => {
  const { data } = await api.get("/hospitals");

  return data;
};

export const createHospital = async (hospital: any) => {
  const { data } = await api.post(
    "/hospitals",
    hospital
  );

  return data;
};

export const updateHospital = async (
  id: string,
  hospital: any
) => {
  const { data } = await api.put(
    `/hospitals/${id}`,
    hospital
  );

  return data;
};

export const deleteHospital = async (
  id: string
) => {
  const { data } = await api.delete(
    `/hospitals/${id}`
  );

  return data;
};