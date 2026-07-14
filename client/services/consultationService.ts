import api from "./api";

// =====================================
// GET CONSULTATIONS
// =====================================

export const getConsultations = async () => {

  const { data } =
    await api.get(
      "/consultations"
    );

  return data;

};

// =====================================
// GET MY CONSULTATIONS
// =====================================

export const getMyConsultations = async () => {

  const { data } =
    await api.get(
      "/consultations"
    );

  return data;

};

// =====================================
// CREATE CONSULTATION
// =====================================

export const createConsultation =
async (consultation: any) => {

  const { data } =
    await api.post(

      "/consultations",

      consultation

    );

  return data;

};

// =====================================
// UPDATE CONSULTATION
// =====================================

export const updateConsultation =
async ({
  id,
  consultation,
}: {
  id: string;
  consultation: any;
}) => {

  const { data } =
    await api.put(

      `/consultations/${id}`,

      consultation

    );

  return data;

};

// =====================================
// DELETE CONSULTATION
// =====================================

export const deleteConsultation =
async (id: string) => {

  const { data } =
    await api.delete(

      `/consultations/${id}`

    );

  return data;

};