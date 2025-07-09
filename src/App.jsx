import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 🧠 Common components
import Navbar from './pages/components/NavBar';
import Footer from './pages/components/Footer';

// 🏥 Patient pages
import Home from './pages/homepg.jsx';
import Appointment from './pages/appointmentBooking.jsx';
import DietPlanner from './pages/dietPlanner.jsx';
import HealthAnalytics from './pages/healthAnalytics.jsx';
import MedicineTracker from './pages/medicineTracker.jsx';
import PatientDashboard from './pages/patientDashboard.jsx';
import SymptomChecker from './pages/symptomChecker.jsx';
import TeleMedicine from './pages/teleMedicine.jsx';
import Login from './pages/login.jsx';

// 🔐 Auth forms
import LoginForm from "./pages/components/LoginForm";

// 🛠 Admin routes
import Hospital from './pages/admin/hospital.jsx';
import Doctor from './pages/admin/doctor.jsx';
import HospitalDoctors from './pages/admin/hospitalDoctors.jsx';
import HospitalPatients from './pages/admin/hospitalPatients.jsx';
import Patients from './pages/admin/patients.jsx';
import Schedule from './pages/admin/schedule.jsx';

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 👤 Patient-facing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/diet" element={<DietPlanner />} />
        <Route path="/analytics" element={<HealthAnalytics />} />
        <Route path="/medicine" element={<MedicineTracker />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/symptom" element={<SymptomChecker />} />
        <Route path="/telemedicine" element={<TeleMedicine />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Auth role-based routes */}
        <Route path="/login/doctor" element={<LoginForm role="doctor" />} />
        <Route path="/login/hospital" element={<LoginForm role="hospital" />} />
        <Route path="/login/patient" element={<LoginForm role="patient" />} />

        {/* 🏥 Hospital Admin Routes */}
        <Route path="/admin/hospital" element={<Hospital />} />
        <Route path="/admin/hospital/doctors" element={<HospitalDoctors />} />
        <Route path="/admin/hospital/patients" element={<HospitalPatients />} />

        {/* 🧑‍⚕️ Doctor Dashboard */}
        <Route path="/admin/doctor" element={<Doctor />} />
        <Route path="/admin/doctor/patients" element={<Patients />} />
        <Route path="/admin/doctor/schedule" element={<Schedule />} />

      </Routes>

      <Footer />
    </>
  );
};

export default App;
