import api from "./api";

export const getHospitals = async () => {
  const { data } = await api.get("/hospitals");
  return data;
};