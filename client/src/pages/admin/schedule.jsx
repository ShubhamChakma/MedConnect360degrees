import React from "react";
import DoctorNavbar from "../components/DoctorNavbar";

const DoctorSchedule = () => {
  // 🔁 Replace with API later
  const appointments = [
    { time: "09:00 AM", patient: "Rahul Verma", purpose: "Checkup", status: "Confirmed" },
    { time: "11:00 AM", patient: "Pooja Singh", purpose: "Follow-up", status: "Pending" },
    { time: "02:30 PM", patient: "Ajay Sharma", purpose: "ECG Review", status: "Cancelled" },
  ];

  return (
    <div>
      <DoctorNavbar />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-[#d63384] mb-6">📅 My Schedule</h1>

        <div className="space-y-4">
          {appointments.map((appt, idx) => (
            <div key={idx} className="bg-[#e6ccff] p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[#007bff] font-semibold text-sm">{appt.time}</p>
                  <p className="text-lg font-bold text-[#d63384]">{appt.patient}</p>
                  <p className="text-sm text-gray-700">📝 {appt.purpose}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-semibold ${
                    appt.status === "Confirmed"
                      ? "bg-green-200 text-green-800"
                      : appt.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {appt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
