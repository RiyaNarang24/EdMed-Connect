import api from "./api";

export const getHospitalBySlug = async (slug: string) => {
  const { data } = await api.get(
    `/hospitals/slug/${slug}`
  );

  return data;
};