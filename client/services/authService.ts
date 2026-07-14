import api from "./api";

// ==============================
// REGISTER (PATIENT)
// ==============================
export const registerUser = async (data: {
  role?: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
}) => {

  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;

};

// ==============================
// LOGIN
// ==============================
export const loginUser = async (data: {
  email: string;
  password: string;
  role: string;
}) => {

  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;

};

// ==============================
// FORGOT PASSWORD
// ==============================
export const forgotPassword = async (
  email: string
) => {

  const { data } = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return data;

};

// ==============================
// RESET PASSWORD
// ==============================
export const resetPassword = async (
  token: string,
  password: string
) => {

  const { data } = await api.put(
  `/auth/reset-password/${token}`,
  { password }
);

  return data;

};// ==============================
// GET PROFILE
// ==============================

export const getProfile = async () => {

  const { data } = await api.get(
    "/auth/profile"
  );

  return data;

};

// ==============================
// UPDATE PROFILE
// ==============================

export const updateProfile = async (data: {

  fullName: string;

  email: string;

  phone: string;

  gender?: string;

  bloodGroup?: string;

})  => {

  const response = await api.put(

    "/auth/profile",

    data

  );

  return response.data;

};