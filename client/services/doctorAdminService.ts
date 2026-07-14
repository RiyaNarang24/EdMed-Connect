import api from "./api";

export const getDoctors = async () => {
  const { data } = await api.get("/doctors");
  return data;
};

export const createDoctor = async (doctor: any) => {
  const { data } = await api.post(
    "/doctors",
    doctor
  );
  return data;
};

export const updateDoctor = async ({
  id,
  doctor,
}: {
  id: string;
  doctor: any;
}) => {
  const { data } = await api.put(
    `/doctors/${id}`,
    doctor
  );
  return data;
};

export const deleteDoctor = async (
  id: string
) => {
  const { data } = await api.delete(
    `/doctors/${id}`
  );
  return data;
};