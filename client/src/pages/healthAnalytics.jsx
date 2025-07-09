import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Simulated data
const healthData = {
  weight: [95, 93, 91, 89, 87],
  glucose: [160, 155, 150, 145, 140],
  cholesterol: [230, 225, 220, 218, 215],
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
};

const doctorVisits = [
  { date: "2024-06-01", doctor: "Dr. Sharma", purpose: "Diabetes Review" },
  { date: "2024-05-10", doctor: "Dr. Roy", purpose: "Annual Checkup" }
];

const prescriptions = [
  { date: "2024-06-01", meds: ["Metformin 500mg", "Atorvastatin"] },
  { date: "2024-05-10", meds: ["Amlodipine", "Multivitamin"] }
];

const getCompliance = (data, target) => {
  const withinRange = data.filter(val => val <= target);
  return Math.round((withinRange.length / data.length) * 100);
};

export default function HealthAnalyticsDashboard() {
  const [compliance, setCompliance] = useState({});

  useEffect(() => {
    const comp = {
      weight: getCompliance(healthData.weight, 88),
      glucose: getCompliance(healthData.glucose, 140),
      cholesterol: getCompliance(healthData.cholesterol, 200),
    };
    setCompliance(comp);
  }, []);

  const getLineChartData = (label, data, color) => ({
    labels: healthData.labels,
    datasets: [
      {
        label,
        data,
        fill: false,
        borderColor: color,
        backgroundColor: color,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-800">📊 Health Analytics</h1>
          <p className="mt-2 text-gray-600 text-lg">
            Track your progress, visualize trends, and review past health activity.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[{
            label: "⚖️ Weight",
            latest: `${healthData.weight[4]} kg`,
            compliance: compliance.weight,
            bg: "from-yellow-100 to-yellow-50"
          }, {
            label: "🩸 Glucose",
            latest: `${healthData.glucose[4]} mg/dL`,
            compliance: compliance.glucose,
            bg: "from-red-100 to-red-50"
          }, {
            label: "❤️ Cholesterol",
            latest: `${healthData.cholesterol[4]} mg/dL`,
            compliance: compliance.cholesterol,
            bg: "from-pink-100 to-pink-50"
          }].map((metric, index) => (
            <Card key={index} className={`bg-gradient-to-br ${metric.bg} shadow-lg`}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">{metric.label}</h2>
                <p className="text-2xl font-bold text-blue-900">{metric.latest}</p>
                <p className="text-green-600 mt-1 font-medium">Compliance: {metric.compliance}%</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="space-y-8">
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">📈 Weight Trend</h3>
              <Line data={getLineChartData("Weight (kg)", healthData.weight, "#3b82f6")} />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">🩸 Glucose Trend</h3>
              <Line data={getLineChartData("Glucose (mg/dL)", healthData.glucose, "#f97316")} />
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">❤️ Cholesterol Trend</h3>
              <Line data={getLineChartData("Cholesterol (mg/dL)", healthData.cholesterol, "#10b981")} />
            </CardContent>
          </Card>
        </div>

        {/* 👨‍⚕️ Doctor Visits */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">🗓️ Doctor Visits</h3>
            <ul className="space-y-2 text-gray-700">
              {doctorVisits.map((v, i) => (
                <li key={i} className="flex justify-between">
                  <span>{v.date}</span>
                  <span>{v.doctor}</span>
                  <span className="italic">{v.purpose}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 💊 Prescriptions */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">💊 Prescriptions</h3>
            <ul className="space-y-2 text-gray-700">
              {prescriptions.map((p, i) => (
                <li key={i}>
                  <strong>{p.date}:</strong> {p.meds.join(", ")}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 📁 Reports Placeholder */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">📁 Medical Reports</h3>
            <p className="text-gray-500 italic">Coming soon: Upload and view lab reports, scans, and other documents.</p>
          </CardContent>
        </Card>

        {/* 🧠 LLM Summary */}
        <Card className="bg-blue-50 border-l-4 border-green-400 rounded-2xl shadow-md">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">LLM Summary</h2>
            <p className="text-blue-800">
              "Your health metrics show a consistent downward trend in weight and glucose. Cholesterol is improving. Keep following your medicine and diet plan!"
            </p>
            <Button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white">Download PDF</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
