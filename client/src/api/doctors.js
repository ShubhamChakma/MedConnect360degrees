// client/src/api/doctors.js

export const getAllDoctors = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/doctors");

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch doctors");
    }

    const data = await res.json();
    console.log("✅ Doctors fetched:", data.doctors); // Debug log
    return data;
  } catch (err) {
    console.error("❌ Error in getAllDoctors:", err.message);
    throw err;
  }
};
