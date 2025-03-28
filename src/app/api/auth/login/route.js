import { connectDB } from "@/app/lib/mongodb";
import User from "@/models/User";

import { compare } from "bcryptjs";


export async function POST(req) {
    try {
      const { email, password } = await req.json();
      await connectDB();
      const user = await User.findOne({ email });
      
      if (!user || !(await compare(password, user.password))) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
      }
  
      return new Response(JSON.stringify({ name: user.name, email: user.email }), { status: 200 });
    } catch (error) {
      console.error("Login Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  };
  