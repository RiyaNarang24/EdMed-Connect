import api from "./api";

export const getHospitalAdmins = async () => {
  const { data } = await api.get(
    "/admin-invites/hospital-admin"
  );

  return data;
};

export const createHospitalAdmin = async (
  admin: any
) => {
  const { data } = await api.post(
    "/admin-invites/hospital-admin",
    admin
  );

  return data;
};

export const deleteHospitalAdmin = async (
  id: string
) => {
  const { data } = await api.delete(
    `/admin-invites/hospital-admin/${id}`
  );

  return data;
};