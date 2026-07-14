import api from "./api";

// ==============================
// GET PUBLIC DEPARTMENTS
// ==============================

export const getDepartments = async (
  hospitalId?: string
) => {

  const { data } = await api.get(
    "/departments",
    {
      params: {
        hospital: hospitalId,
      },
    }
  );

  return data;

};