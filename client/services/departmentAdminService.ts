import api from "./api";

export const getAdminDepartments = async (
  hospital = ""
) => {

  const { data } = await api.get(
    "/departments",
    {
      params: {
        hospital,
      },
    }
  );

  return data;

};

export const createDepartment = async (
  department: any
) => {
  const { data } = await api.post(
    "/departments",
    department
  );

  return data;
};

export const updateDepartment = async (
  id: string,
  department: any
) => {
  const { data } = await api.put(
    `/departments/${id}`,
    department
  );

  return data;
};

export const deleteDepartment = async (
  id: string
) => {
  const { data } = await api.delete(
    `/departments/${id}`
  );

  return data;
};