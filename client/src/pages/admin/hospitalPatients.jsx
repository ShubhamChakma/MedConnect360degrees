// FILE: src/pages/admin/hospitalPatients.jsx
import React from "react";
import HospitalNavbar from "../components/HospitalNavbar";

const HospitalPatients = () => {
  // 🔁 Replace with API later
  const patients = [
    { id: 1, name: "Ritika Das", age: 28, condition: "Hypertension" },
    { id: 2, name: "Aman Yadav", age: 43, condition: "Diabetes" },
    { id: 3, name: "Megha Kapoor", age: 36, condition: "Asthma" },
  ];

  return (
    <div>
      <HospitalNavbar />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-[#d63384] mb-6">👥 Patient Records</h1>

        <div className="grid gap-4">
          {patients.map((pat) => (
            <div key={pat.id} className="p-4 bg-[#e6ccff] rounded-xl shadow">
              <h2 className="text-xl font-semibold text-[#007bff]">{pat.name}</h2>
              <p className="text-sm text-[#333]">Age: {pat.age}</p>
              <p className="text-sm text-[#d63384] font-medium">Condition: {pat.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalPatients;
