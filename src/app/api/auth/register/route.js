import { connectDB } from "@/app/lib/mongodb";
import User from "../../../models/User";

import { compare } from "bcryptjs";


export async function POST(req) {
  const { name, email, password } = await req.json();
  await connectDB();
  const hashedPassword = await hash(password, 10);
  await User.create({ name, email, password: hashedPassword });
  return new Response(null, { status: 201 });
}