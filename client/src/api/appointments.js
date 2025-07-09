// client/src/api/appointments.js

export const bookAppointment = async (appointmentData) => {
  const res = await fetch("http://localhost:3000/api/appointments", {
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

  return res.json(); // contains the saved appointment
};
