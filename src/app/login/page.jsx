// src/app/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123",
  name: "manoj",
  avatar: "/admin-avatar.png"
};

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (
      formData.email === ADMIN_CREDENTIALS.email &&
      formData.password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem(
        "admin",
        JSON.stringify({ name: ADMIN_CREDENTIALS.name, email: ADMIN_CREDENTIALS.email, avatar: ADMIN_CREDENTIALS.avatar })
      );
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Dark Blue Panel) */}
      <div className="w-1/3 bg-[#151A3F] text-white flex flex-col justify-center items-center p-10">
        {/* Logo */}
        <Image src="/grow-bharat-logo.png" alt="Grow Bharat Technology" width={100} height={100} />
        
        {/* Spacing */}
        <div className="mt-6">
          <p className="text-2xl font-semibold text-center leading-snug">
            One Stop Solution for <br /> Grow Bharat Technology
          </p>
        </div>
      </div>

      {/* Right Side (Login Section) */}
      <div className="w-2/3 flex justify-center items-center  relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 "></div>

        <form onSubmit={handleSubmit} className="relative z-10  p-10 rounded-lg w-[400px]">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Login into Grow Bharat</h2>
          
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Username */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="email"
              placeholder="Enter your username"
              className="border p-3 w-full rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border p-3 w-full rounded bg-gray-100 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Forgot Password */}
          <p className="text-orange-500 text-sm text-right mt-2 cursor-pointer">Forgot password?</p>

          {/* Login Button */}
          <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded text-lg font-semibold hover:bg-orange-600">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
