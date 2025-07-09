import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true, // e.g., "10:00 AM - 10:30 AM"
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  phoneNumber: {
    type: String,
    required: true, // Required for WhatsApp reminders, format: 91XXXXXXXXXX
  },
  doctorName: {
    type: String,
    required: true, // For showing in WhatsApp reminder
  },
  patientName: {
    type: String,
    required: true, // For displaying in logs or messages
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Appointment', appointmentSchema);
