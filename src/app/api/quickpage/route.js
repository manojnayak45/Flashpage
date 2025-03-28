import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import QuickPage from "@/models/QuickPage";

export async function POST(req) {
  try {
    await connectToDatabase(); // ✅ Connect to DB

    const data = await req.json();
    const newQuickPage = new QuickPage(data);
    await newQuickPage.save();

    return NextResponse.json({ success: true, quickPage: newQuickPage });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// ✅ Fetch all Quick Pages for Drafts Management
export async function GET() {
  try {
    await connectToDatabase();
    const quickPages = await QuickPage.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, quickPages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
