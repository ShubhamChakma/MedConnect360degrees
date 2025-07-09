import express from "express";
import Appointment from "../models/Appointment.js";

export const appointmentRouter = express.Router();

// ⏱️ Book new appointment
appointmentRouter.post("/", async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      specialization,
      appointmentDate,
      timeSlot,
      paymentStatus = "completed", // fake payment logic
    } = req.body;

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      specialization,
      appointmentDate,
      timeSlot,
      paymentStatus,
    });

    await newAppointment.save();

    // 🟢 Simulate WhatsApp reminder (you'll integrate Twilio later)
    console.log(`📲 WhatsApp reminder scheduled 2 hours before appointment for patient ${patientId}`);

    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error("❌ Error booking appointment:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📃 Get all appointments (doctor or patient based)
appointmentRouter.get("/", async (req, res) => {
  try {
    const { userId, role } = req.query; // doctor or patient

    const filter = role === "doctor" ? { doctorId: userId } : { patientId: userId };

    const appointments = await Appointment.find(filter).sort({ appointmentDate: 1 });

    res.json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
