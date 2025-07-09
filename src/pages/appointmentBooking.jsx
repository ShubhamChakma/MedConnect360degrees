import React, { useEffect, useState } from "react";
import { bookAppointment } from "../api/appointments";
import { getAllDoctors } from "../api/doctors";

const diagnosisTests = [
  "Blood Test", "X-Ray", "MRI", "CT Scan", "Urine Test",
  "COVID-19 Test", "Thyroid Test", "Liver Function Test", "Kidney Function Test", "Glucose Test"
];

const createTimeSlots = () => {
  const slots = [];
  const addSlots = (startHour, endHour) => {
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += 20) {
        const hr = h % 12 === 0 ? 12 : h % 12;
        const min = m.toString().padStart(2, "0");
        const ampm = h < 12 ? "AM" : "PM";
        slots.push({ time: `${hr}:${min} ${ampm}`, isBooked: false });
      }
    }
  };
  addSlots(9, 13);
  addSlots(14, 17);
  return slots;
};

const generateTests = () => {
  return diagnosisTests.map((test, idx) => ({
    id: idx + 100,
    name: test,
    slots: createTimeSlots(),
  }));
};

const Appointment = () => {
  const [selectedType, setSelectedType] = useState("");
  const [view, setView] = useState("doctor");
  const [appointments, setAppointments] = useState([]);
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [expandedTest, setExpandedTest] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { doctors } = await getAllDoctors();
        const doctorsWithSlots = doctors.map((doc, i) => ({
          ...doc,
          id: doc._id || i + 1,
          name: doc.name,
          type: doc.specialization,
          rating: doc.rating || 4.5,
          slots: createTimeSlots(),
        }));
        setDoctors(doctorsWithSlots);
      } catch (err) {
        console.error("Failed to fetch doctors:", err.message);
      }
    };

    fetchDoctors();
    setTests(generateTests());
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) => selectedType === "" || doc.type === selectedType
  );

  const handleBooking = async (entity, slot, type) => {
    const id = `${type}-${entity.id}-${slot.time}`;
    if (appointments.find((a) => a.id === id)) return;

    const appointmentPayload = {
      patientId: "660c22a8fa9c5f1c0d503a9d",
      doctorId: entity._id || "660c22b7fa9c5f1c0d503abc",
      specialization: entity.type || "General",
      appointmentDate: new Date().toISOString(),
      timeSlot: slot.time,
      paymentStatus: "completed",
    };

    try {
      const saved = await bookAppointment(appointmentPayload);
      console.log("✅ Booked:", saved);

      setAppointments((prev) => [...prev, { id, entity, time: slot.time, type }]);
      slot.isBooked = true;
    } catch (err) {
      console.error("❌ Booking failed:", err.message);
      alert("Failed to book appointment");
    }
  };

  const cancelBooking = (id) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  const specializations = [...new Set(doctors.map((d) => d.type))];

  return (
    <div className="min-h-screen bg-white text-blue-900 font-sans scroll-smooth">
      <header className="bg-blue-700 text-white shadow-md sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">Appointments</h1>
          <div className="space-x-6 text-sm md:text-base">
            <button onClick={() => setView("doctor")} className={`hover:text-yellow-300 ${view === "doctor" ? "underline font-semibold" : ""}`}>Doctor Appointment</button>
            <button onClick={() => setView("test")} className={`hover:text-yellow-300 ${view === "test" ? "underline font-semibold" : ""}`}>Test Booking</button>
            <button onClick={() => setView("myappointments")} className={`hover:text-yellow-300 ${view === "myappointments" ? "underline font-semibold" : ""}`}>My Appointments</button>
          </div>
        </nav>
      </header>

      {view === "doctor" && (
        <section className="p-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Book a Doctor</h2>
          <div className="mb-6 max-w-lg mx-auto">
            <label className="block mb-2 font-medium">Select Specialization</label>
            <select
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
              className="w-full p-3 border border-blue-300 rounded focus:outline-none"
            >
              <option value="">-- All Specializations --</option>
              {specializations.map((spec, idx) => (
                <option key={idx} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="p-5 rounded-lg shadow-md bg-white border border-blue-200">
                <h3 className="text-xl font-semibold">{doc.name}</h3>
                <p className="text-sm text-gray-700">{doc.type} | ⭐ {doc.rating}</p>
                <button
                  onClick={() => setExpandedDoctor(expandedDoctor === doc.id ? null : doc.id)}
                  className="mt-3 w-full text-sm py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {expandedDoctor === doc.id ? "Hide Slots" : "Show Available Slots"}
                </button>

                {expandedDoctor === doc.id && (
                  <div className="mt-4 grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto">
                    {doc.slots.map((slot, idx) => {
                      const appointmentId = `doctor-${doc.id}-${slot.time}`;
                      const alreadyBooked = appointments.some((a) => a.id === appointmentId);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleBooking(doc, slot, "doctor")}
                          disabled={slot.isBooked || alreadyBooked}
                          className={`px-2 py-1 text-sm rounded border ${
                            slot.isBooked || alreadyBooked
                              ? "bg-gray-300 cursor-not-allowed text-gray-600"
                              : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "test" && (
        <section className="p-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Book a Diagnostic Test</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div key={test.id} className="p-5 rounded-lg shadow-md bg-white border border-blue-200">
                <h3 className="text-xl font-semibold">{test.name}</h3>
                <button
                  onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                  className="mt-3 w-full text-sm py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {expandedTest === test.id ? "Hide Slots" : "Show Available Slots"}
                </button>

                {expandedTest === test.id && (
                  <div className="mt-4 grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto">
                    {test.slots.map((slot, idx) => {
                      const appointmentId = `test-${test.id}-${slot.time}`;
                      const alreadyBooked = appointments.some((a) => a.id === appointmentId);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleBooking(test, slot, "test")}
                          disabled={slot.isBooked || alreadyBooked}
                          className={`px-2 py-1 text-sm rounded border ${
                            slot.isBooked || alreadyBooked
                              ? "bg-gray-300 cursor-not-allowed text-gray-600"
                              : "bg-green-100 hover:bg-green-200 text-green-800"
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "myappointments" && (
        <section className="p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Your Booked Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">No Appointments Booked.</p>
          ) : (
            <div className="grid gap-4">
              {appointments.map((app) => (
                <div key={app.id} className="p-5 rounded bg-white shadow border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800">{app.entity.name}</h3>
                  <p>{app.type === "doctor" ? app.entity.type : "Test"} | {app.time}</p>
                  <button
                    onClick={() => cancelBooking(app.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel Appointment
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Appointment;
