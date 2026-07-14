import api from "./api";

// ===================================
// MY APPOINTMENTS
// ===================================

export const getPatientAppointments =
  async () => {

    const { data } =
      await api.get(
        "/appointments/me"
      );

    return data;

  };

// ===================================
// CANCEL APPOINTMENT
// ===================================

export const cancelAppointment =
  async (id: string) => {

    const { data } =
      await api.put(
        `/appointments/${id}`,
        {
          status: "Cancelled",
        }
      );

    return data;

  };