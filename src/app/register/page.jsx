// src/app/register/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-bold">Register</h2>
        <input type="text" placeholder="Name" className="border p-2 w-full" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" className="border p-2 w-full mt-2" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border p-2 w-full mt-2" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full">Register</button>
      </form>
    </div>
  );
}
