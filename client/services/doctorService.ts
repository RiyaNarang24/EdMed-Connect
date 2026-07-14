import api from "./api";

// ==============================
// GET PUBLIC DOCTORS
// ==============================

export const getDoctors = async (
  hospitalId?: string,
  departmentId?: string
) => {

  const { data } = await api.get(
    "/doctors",
    {
      params: {
        hospital: hospitalId,
        department: departmentId,
      },
    }
  );

  return data;

};