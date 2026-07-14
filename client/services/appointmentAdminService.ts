import api from "./api";

export const getAppointments = async () => {
  const { data } = await api.get("/appointments");
  return data;
};

export const createAppointment = async (appointment: any) => {
  const { data } = await api.post(
    "/appointments",
    appointment
  );
  return data;
};

export const updateAppointment = async ({
  id,
  appointment,
}: {
  id: string;
  appointment: any;
}) => {
  const { data } = await api.put(
    `/appointments/${id}`,
    appointment
  );
  return data;
};

export const deleteAppointment = async (
  id: string
) => {
  const { data } = await api.delete(
    `/appointments/${id}`
  );
  return data;
};