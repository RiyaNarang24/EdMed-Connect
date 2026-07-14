import api from "./api";

export const getAdminPatients = async (
  bed = ""
) => {

  const { data } = await api.get(
    "/patients",
    {
      params: {
        bed,
      },
    }
  );

  return data;

};

export const createPatient = async (
  patient: any
) => {

  const { data } = await api.post(
    "/patients",
    patient
  );

  return data;

};

export const updatePatient = async (
  id: string,
  patient: any
) => {

  const { data } = await api.put(
    `/patients/${id}`,
    patient
  );

  return data;

};

export const deletePatient = async (
  id: string
) => {

  const { data } = await api.delete(
    `/patients/${id}`
  );

  return data;

};