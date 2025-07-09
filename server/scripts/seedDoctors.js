// server/seedDoctors.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from '../src/models/Doctor.js';


dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/medconnect360";

const doctors = [
  { name: "Dr. Ayush Aggarwal", specialization: "Cardiologist", rating: 4.5 },
  { name: "Dr. Sidhant Mandal", specialization: "Orthopaedics", rating: 4.8 },
  { name: "Dr. Surveer", specialization: "Dentist", rating: 3.9 },
  { name: "Dr. Shubham Yadav", specialization: "Dermatologist", rating: 4.1 },
  { name: "Dr. Aryan Negi", specialization: "Gynecologist", rating: 4.9 },
  { name: "Dr. Shubham Chakma", specialization: "Pediatrics", rating: 4.2 },
  { name: "Dr. Shivam Gupta", specialization: "Ophthalmologist", rating: 4.6 },
  { name: "Dr. Srinivas", specialization: "Pathologist", rating: 4.0 }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log("✅ Doctors seeded");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding doctors:", err.message);
    process.exit(1);
  }
};

seedDoctors();
