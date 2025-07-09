import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js"; // ✅ DB connect
import { appointmentRouter } from "./src/routes/appointment.js";
import doctorRouter from './src/routes/doctorRoutes.js';



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.use("/api/appointments", appointmentRouter);
app.use('/api/doctors', doctorRouter);

// Sample route
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
});
