const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://medconnect360degrees.onrender.com";

export const bookAppointment = async (appointmentData) => {
  const res = await fetch(`${BASE_URL}/api/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to book appointment");
  }

  return res.json();
};
