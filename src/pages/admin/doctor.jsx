import React from "react";
import DoctorNavbar from "../components/DoctorNavbar";

const Doctor = () => {
  // 🔁 Replace with API later
  const stats = {
    todayAppointments: 5,
    newPatients: 2,
    pendingReports: 3,
  };

  return (
    <div>
      <DoctorNavbar />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-[#d63384] mb-6">👨‍⚕️ Doctor Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#e6ccff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-[#007bff]">Today's Appointments</h2>
            <p className="text-3xl mt-2 text-[#d63384]">{stats.todayAppointments}</p>
          </div>
          <div className="bg-[#e6ccff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-[#007bff]">New Patients</h2>
            <p className="text-3xl mt-2 text-[#d63384]">{stats.newPatients}</p>
          </div>
          <div className="bg-[#e6ccff] p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-[#007bff]">Pending Reports</h2>
            <p className="text-3xl mt-2 text-[#d63384]">{stats.pendingReports}</p>
          </div>
        </div>

        <div className="mt-8 bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#d63384] mb-4">📊 Weekly Summary</h2>
          <div className="h-40 bg-blue-50 flex items-center justify-center text-blue-300 italic">
            {/* 🔁 Replace with Chart.js / API Component */}
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
