import React from "react";
import DoctorNavbar from "../components/DoctorNavbar";

const DoctorPatients = () => {
  // 🔁 Replace with API later
  const patients = [
    { id: 1, name: "Rahul Verma", age: 30, condition: "Hypertension", lastVisit: "2025-07-01" },
    { id: 2, name: "Pooja Singh", age: 26, condition: "Thyroid", lastVisit: "2025-06-28" },
    { id: 3, name: "Ajay Sharma", age: 45, condition: "Diabetes", lastVisit: "2025-07-04" },
  ];

  return (
    <div>
      <DoctorNavbar />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-[#d63384] mb-6">👥 My Patients</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-[#e6ccff] rounded-xl shadow-sm">
            <thead className="bg-[#e6ccff] text-[#007bff]">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Condition</th>
                <th className="py-3 px-4 text-left">Last Visit</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-[#f9f1ff] text-[#333]">
                  <td className="py-2 px-4 font-medium">{p.name}</td>
                  <td className="py-2 px-4">{p.age}</td>
                  <td className="py-2 px-4">{p.condition}</td>
                  <td className="py-2 px-4">{p.lastVisit}</td>
                  <td className="py-2 px-4">
                    <button className="text-sm bg-[#007bff] text-white px-3 py-1 rounded hover:bg-blue-700 mr-2">
                      View
                    </button>
                    <button className="text-sm bg-[#d63384] text-white px-3 py-1 rounded hover:bg-pink-700">
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;
