import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginForm from "./components/LoginForm"; // ✅ CORRECT

export default function Login() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = () => {
    if (role === "doctor") navigate("/admin/doctor");
    else if (role === "hospital") navigate("/admin/hospital");
    else navigate("/dashboard");
  };

  const handleBack = () => {
    setRole(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md space-y-6 text-center">
        {!role ? (
          <>
            <h2 className="text-2xl font-semibold text-blue-700">Login as</h2>
            <div className="flex flex-col space-y-4">
              <Button onClick={() => setRole("doctor")} className="bg-blue-600 text-white">Doctor</Button>
              <Button onClick={() => setRole("hospital")} className="bg-green-600 text-white">Hospital</Button>
              <Button onClick={() => setRole("patient")} className="bg-purple-600 text-white">Patient</Button>
            </div>
          </>
        ) : (
          <LoginForm role={role} onSuccess={handleSuccess} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}
