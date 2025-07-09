// server/src/routes/doctorRoutes.js

import express from 'express';
import Doctor from '../models/Doctor.js'; // ✅ Assumes you’ll create Doctor model too

const router = express.Router();

// GET /api/doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors
    res.json({ success: true, doctors });
  } catch (err) {
    console.error("Error fetching doctors:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
