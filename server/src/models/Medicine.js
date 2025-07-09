// server/src/models/Medicine.js
import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  patientName: String,
  phoneNumber: String,  // WhatsApp number in format 91XXXXXXXXXX
  medicineName: String,
  dosage: String,       // e.g., "1 tablet"
  time: Date            // when to remind
});

export default mongoose.model('Medicine', medicineSchema);
