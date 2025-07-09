// server/src/models/Doctor.js

import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
