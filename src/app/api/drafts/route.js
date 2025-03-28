import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import QuickPage from "@/models/QuickPage";

// ✅ Fetch All Drafts
export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const companyName = searchParams.get("companyName");

    if (companyName) {
      const quickPage = await QuickPage.findOne({ companyName });
      if (!quickPage) {
        return NextResponse.json({ success: false, error: "QuickPage not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, quickPage });
    }

    const quickPages = await QuickPage.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, quickPages });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// ✅ Save New Quick Page (Draft or Published)
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    console.log("📤 Received Draft Data:", data);

    // ✅ Ensure status is "Draft"
    if (!data.status || data.status === "Drafts") {
      data.status = "Draft";
    }

    if (!data.companyName || !data.logo || !data.createdBy) {
      return NextResponse.json({ success: false, error: "Missing required fields" });
    }

    const newQuickPage = new QuickPage(data);
    await newQuickPage.save();

    console.log("✅ Saved Draft to DB:", newQuickPage);
    return NextResponse.json({ success: true, quickPage: newQuickPage });
  } catch (error) {
    console.error("❌ Error saving draft:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}


  

// ✅ Update QuickPage Status (Publish/Draft)
export async function PATCH(req) {
  try {
    await connectToDatabase();

    // Extract `id` and `status` from request body
    const { id, status } = await req.json();

   

    // Update QuickPage status in DB
    const updatedQuickPage = await QuickPage.findByIdAndUpdate(
      id,
      { status: status || "Published" },
      { new: true } // Return updated document
    );

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing QuickPage ID" });
    }
    if (!updatedQuickPage) {
      return NextResponse.json({ success: false, error: "QuickPage not found" });
    }

    return NextResponse.json({ success: true, message: "Status updated successfully", quickPage: updatedQuickPage });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// ✅ Delete Quick Page
// ✅ Delete Quick Page
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing QuickPage ID" }, { status: 400 });
    }

    await connectToDatabase();
    const result = await QuickPage.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ success: false, message: "QuickPage not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "QuickPage deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error: " + error.message }, { status: 500 });
  }
}

