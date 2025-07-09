import React, { useState } from "react";
import { auth, db } from "../../lib/firebase"; // ✅ include db
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // ✅ firestore import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm({ role, onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 🔥 Store user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: role,
          createdAt: serverTimestamp()
        });
      }

      onSuccess(); // route to dashboard
    } catch (err) {
      alert("Firebase Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-800">
        {isLogin ? `Login as ${role}` : `Sign up as ${role}`}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          disabled={loading}
          className={`w-full ${isLogin ? "bg-blue-600" : "bg-green-600"} text-white`}
        >
          {loading ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>

      <div className="text-sm text-center space-y-2">
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
        <button onClick={onBack} className="text-blue-500 hover:underline">
          ← Back to role selection
        </button>
      </div>
    </div>
  );
}
