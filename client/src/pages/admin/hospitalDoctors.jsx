// FILE: src/pages/admin/hospitalDoctors.jsx
import React from "react";
import HospitalNavbar from "../components/HospitalNavbar";

const HospitalDoctors = () => {
  // 🔁 Replace with API later
  const doctors = [
    { id: 1, name: "Dr. Arjun Mehta", specialty: "Cardiologist", status: "Available" },
    { id: 2, name: "Dr. Nidhi Sharma", specialty: "Dermatologist", status: "On Leave" },
    { id: 3, name: "Dr. Ravi Verma", specialty: "Orthopaedic", status: "Available" },
  ];

  return (
    <div>
      <HospitalNavbar />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-[#d63384] mb-6">🩺 Doctors Management</h1>

        <div className="grid gap-4">
          {doctors.map((doc) => (
            <div key={doc.id} className="p-4 bg-[#e6ccff] rounded-xl shadow">
              <h2 className="text-xl font-semibold text-[#007bff]">{doc.name}</h2>
              <p className="text-sm text-[#333]">Specialty: {doc.specialty}</p>
              <p className={`text-sm mt-1 font-semibold ${doc.status === 'Available' ? 'text-green-600' : 'text-red-500'}`}>
                Status: {doc.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDoctors;
