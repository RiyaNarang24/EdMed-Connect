import api from "./api";

// ==============================
// GET HOSPITALS
// ==============================

export const getHospitals = async () => {

  const { data } =
    await api.get("/hospitals");

  return data;

};

// ==============================
// GET DEPARTMENTS
// ==============================

export const getDepartments = async (
  hospitalId: string
) => {

  const { data } =
    await api.get(
      `/departments?hospital=${hospitalId}`
    );

  return data;

};

// ==============================
// GET DOCTORS
// ==============================

export const getDoctors = async (
  hospitalId: string,
  departmentId: string
) => {

  const { data } =
    await api.get(
      `/doctors?hospital=${hospitalId}&department=${departmentId}`
    );

  return data;

};

// ==============================
// BOOK APPOINTMENT
// ==============================

export interface AppointmentPayload {

  hospital: string;

  department: string;

  doctor: string;

  appointmentDate: string;

  appointmentTime: string;

  reason: string;

}

export const bookAppointment = async (
  appointment: AppointmentPayload
) => {

  const { data } =
    await api.post(
      "/appointments",
      appointment
    );

  return data;

};