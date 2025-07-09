import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  StethoscopeIcon,
  AlarmClock,
  FileText,
  LayoutDashboard,
  BellRing,
  FileUp,
  Video
} from "lucide-react";

export default function PatientDashboard() {
  const today = new Date().toLocaleDateString("en-GB");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-800">🏥 Patient Dashboard</h1>
          <p className="mt-2 text-gray-600 text-lg">
            Welcome back! Here's what's scheduled and tracked for you today: {today}
          </p>
        </div>

        {/* GRID OF CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Appointment */}
          <Card className="bg-gradient-to-tr from-white to-blue-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-blue-700">
                <CalendarIcon /> <span className="font-semibold text-lg">Upcoming Appointment</span>
              </div>
              <p>🩺 With Dr. Sharma</p>
              <p>📍 Sunshine Clinic</p>
              <p>🕒 03 July, 11:00 AM</p>
              <Button className="mt-4 bg-blue-700 text-white hover:bg-blue-800">Reschedule</Button>
            </CardContent>
          </Card>

          {/* Today's Medicines */}
          <Card className="bg-gradient-to-tr from-white to-green-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-green-700">
                <AlarmClock /> <span className="font-semibold text-lg">Today's Medicines</span>
              </div>
              <ul className="list-disc pl-5 text-gray-700">
                <li>8:00 AM - Metformin 500mg</li>
                <li>12:00 PM - Vitamin D</li>
                <li>8:00 PM - Atorvastatin</li>
              </ul>
              <Button className="mt-4 bg-green-700 text-white hover:bg-green-800">Mark Taken</Button>
            </CardContent>
          </Card>

          {/* Diet Plan */}
          <Card className="bg-gradient-to-tr from-white to-yellow-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-yellow-700">
                <FileText /> <span className="font-semibold text-lg">Diet Plan</span>
              </div>
              <p>🍽️ Breakfast: Oats & Fruits</p>
              <p>🥗 Lunch: Grilled chicken + salad</p>
              <p>🥛 Dinner: Veg soup + 2 roti</p>
              <Button className="mt-4 bg-yellow-600 text-white hover:bg-yellow-700">View Full Plan</Button>
            </CardContent>
          </Card>

          {/* Symptom Checker */}
          <Card className="bg-gradient-to-tr from-white to-indigo-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-indigo-700">
                <StethoscopeIcon /> <span className="font-semibold text-lg">Symptom Checker</span>
              </div>
              <p>🤒 Not feeling well?</p>
              <p>Answer a few questions to get suggestions.</p>
              <Button className="mt-4 bg-indigo-700 text-white hover:bg-indigo-800">Start Checkup</Button>
            </CardContent>
          </Card>

          {/* Health Analytics */}
          <Card className="bg-gradient-to-tr from-white to-sky-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-sky-700">
                <LayoutDashboard /> <span className="font-semibold text-lg">Health Analytics</span>
              </div>
              <p>📊 See your weight, sugar & compliance trends</p>
              <Button className="mt-4 bg-sky-600 text-white hover:bg-sky-700">Go to Analytics</Button>
            </CardContent>
          </Card>

          {/* 🔔 Reminders */}
          <Card className="bg-gradient-to-tr from-white to-red-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-red-700">
                <BellRing /> <span className="font-semibold text-lg">Reminders</span>
              </div>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Missed: Metformin at 8:00 AM</li>
                <li>Log your lunch intake</li>
              </ul>
              <Button className="mt-4 bg-red-600 text-white hover:bg-red-700">View All</Button>
            </CardContent>
          </Card>

          {/* 📁 Medical Records */}
          <Card className="bg-gradient-to-tr from-white to-purple-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-purple-700">
                <FileUp /> <span className="font-semibold text-lg">Medical Records</span>
              </div>
              <p>Upload and view prescriptions, lab reports, scans and more.</p>
              <Button className="mt-4 bg-purple-700 text-white hover:bg-purple-800">Manage Files</Button>
            </CardContent>
          </Card>

          {/* 📞 Telemedicine */}
          <Card className="bg-gradient-to-tr from-white to-emerald-100 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-emerald-700">
                <Video /> <span className="font-semibold text-lg">Telemedicine</span>
              </div>
              <p>Next call: Today at 5:00 PM</p>
              <p>Doctor: Dr. Sharma</p>
              <Button className="mt-4 bg-emerald-600 text-white hover:bg-emerald-700">Join Call</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
