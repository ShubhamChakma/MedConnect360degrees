import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusCircle, Trash2 } from "lucide-react";

export default function MedicineTracker() {
  const [medicines, setMedicines] = useState([
    { id: 1, time: "8:00 AM", name: "Paracetamol", taken: false },
    { id: 2, time: "2:00 PM", name: "Amoxicillin", taken: true },
  ]);

  const [newMed, setNewMed] = useState({ time: "", name: "" });

  // ✅ Toggle taken status locally
  const toggleTaken = (index) => {
    const updated = [...medicines];
    updated[index].taken = !updated[index].taken;
    setMedicines(updated);
  };

  // ➕ Add medicine locally
  const handleAddMedicine = () => {
    if (!newMed.time || !newMed.name) return;
    const newItem = {
      id: Date.now(),
      ...newMed,
      taken: false,
    };
    setMedicines([...medicines, newItem]);
    setNewMed({ time: "", name: "" });
  };

  // ❌ Delete medicine locally
  const handleDelete = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">💊 Medicine Tracker</h1>

        {/* Add Medicine */}
        <Card className="mb-6 bg-white shadow-md">
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Time (e.g. 9:00 AM)"
                value={newMed.time}
                onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Medicine Name"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              />
              <Button onClick={handleAddMedicine} className="bg-blue-600 text-white hover:bg-blue-700">
                <PlusCircle className="w-5 h-5 mr-2" /> Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* List Medicines */}
        <div className="grid gap-4">
          {medicines.map((med, index) => (
            <Card key={med.id} className="bg-white shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-700">🕒 {med.time}</p>
                  <p className="text-gray-600">{med.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => toggleTaken(index)}
                    className={`${
                      med.taken ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 hover:bg-gray-400"
                    } text-white`}
                  >
                    {med.taken ? "Taken" : "Mark as Taken"}
                  </Button>
                  <Button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
