const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://medconnect360degrees.onrender.com";

export const getAllDoctors = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/doctors`);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch doctors");
    }

    const data = await res.json();
    console.log("✅ Doctors fetched:", data.doctors);
    return data;
  } catch (err) {
    console.error("❌ Error in getAllDoctors:", err.message);
    throw err;
  }
};
