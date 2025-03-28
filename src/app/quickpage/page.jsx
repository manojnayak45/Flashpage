"use client";
import { useState } from "react";
import QuickPageForm from "./QuickPageForm";
import QuickPagePreview from "./QuickPagePreview";
import { useRouter } from "next/navigation";

export default function QuickPage({ fetchDrafts }) { // ✅ Receive fetchDrafts
  const router = useRouter();
  
  // ✅ State for form data
  const [formData, setFormData] = useState({
    companyName: "",
    companyTagLine: "",
    companyAbout: "",
    mobileNumber: "",
    logo: "",
    links: {
      whatsapp: "",
      linkedin: "",
      facebook: "",
      instagram: "",
      website: "",
      founder: "",
    },
    files: [],
  });

  // ✅ Define handleSave function
  const handleSave = async (isPublished, generatedURL = "") => {
    console.log("Save triggered");  // 📝 Log to check
    const quickPageData = {
      ...formData,
      status: isPublished ? "Published" : "Drafts",
      url: generatedURL,
      createdAt: new Date(),
      serialNumber: Date.now(),
      createdBy: "Admin User",
    };
  
    try {
      const response = await fetch("/api/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quickPageData),
      });
  
      if (response.ok) {
        console.log("QuickPage saved successfully!");
        if (fetchDrafts) {
          fetchDrafts();
        }
        router.push("/drafts");
      } else {
        console.error("Error saving QuickPage.");
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };
  

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Left Side: Quick Page Form */}
      <div className="w-1/2 p-6 bg-white shadow-md rounded-lg overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Create Quick Page</h2>
        <QuickPageForm formData={formData} setFormData={setFormData} />
      </div>

      {/* Right Side: Quick Page Preview */}
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <QuickPagePreview formData={formData} handleSave={handleSave} /> {/* ✅ Pass handleSave */}
      </div>
    </div>
  );
}
