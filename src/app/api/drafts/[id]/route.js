import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import QuickPage from "@/models/QuickPage";

export async function PATCH(req, { params }) {
  try {
    await connectToDatabase();
    
    // ✅ Extract `id` from request URL
    const { id } = params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing QuickPage ID" });
    }

    // ✅ Extract `status` and `url` from request body
    const { status, url } = await req.json();
    if (!status) {
      return NextResponse.json({ success: false, error: "Missing required fields" });
    }

    // ✅ Update QuickPage in MongoDB
    const updatedQuickPage = await QuickPage.findByIdAndUpdate(
      id,
      { status, url },
      { new: true } // Return the updated document
    );

    if (!updatedQuickPage) {
      return NextResponse.json({ success: false, error: "QuickPage not found" });
    }

    return NextResponse.json({ success: true, message: "Status updated successfully", quickPage: updatedQuickPage });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
