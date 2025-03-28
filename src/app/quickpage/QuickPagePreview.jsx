import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaGlobe,
  FaBook,
  FaUser,
  FaPhone,
  FaStar,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaShare,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCopy,
  FaTwitter
} from "react-icons/fa";

const iconMap = {
  website: <FaGlobe className="text-blue-500 text-lg" />,
  catalog: <FaBook className="text-green-500 text-lg" />,
  founder: <FaUser className="text-gray-700 text-lg" />,
  call: <FaPhone className="text-blue-700 text-lg" />,
  rate: <FaStar className="text-yellow-500 text-lg" />,
  linkedin: <FaLinkedin className="text-blue-700 text-lg" />,
  whatsapp: <FaWhatsapp className="text-green-500 text-lg" />,
  instagram: <FaInstagram className="text-pink-500 text-lg" />,
  facebook: <FaFacebook className="text-blue-600 text-lg" />,
};

export default function QuickPagePreview({ formData, handleSave }) {
  const [activeTab, setActiveTab] = useState("Links");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedURL, setGeneratedURL] = useState("");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handlePublish = () => {
    setShowPublishModal(true);
  };


  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const confirmPublish = async () => {
    setShowPublishModal(false); // ✅ Close the first modal
  
    const companySlug = formData.companyName.replace(/\s+/g, "-").toLowerCase();
    const uniqueURL = `https://links.growbharat.tech/${companySlug}`;
    
    setGeneratedURL(uniqueURL);
  
    const quickPageData = {
      ...formData,
      status: "Published",
      url: uniqueURL,
      createdAt: new Date(),
      serialNumber: Date.now(),
      createdBy: "Admin User",
    };
  
    try {
      let response;
      if (formData._id) {
        response = await fetch(`/api/drafts/${formData._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: formData._id, status: "Published", url: uniqueURL }),
        });
      } else {
        response = await fetch("/api/drafts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quickPageData),
        });
      }
  
      const data = await response.json();
  
      if (data.success) {
        setTimeout(() => {
          setShowSuccessModal(true); // ✅ Delay slightly to ensure visibility
        }, 200); // 200ms delay ensures the modal opens after fetch completion
      } else {
        console.error("Error updating status:", data.error);
      }
    } catch (error) {
      console.error("Server error while publishing:", error);
    }
  };
  
  




  const handleSaveDraft = async () => {
    const quickPageData = { ...formData, status: "Draft" }; // ✅ Fix status
  
    try {
      console.log("📤 Sending Draft Data:", quickPageData);
    
      const response = await fetch("/api/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quickPageData),
      });
  
      const data = await response.json();
      console.log("📥 Server Response:", data);
  
      if (data.success) {
        alert("Saved as Draft!");
        if (handleSave) {
          await handleSave(false);
        }
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("❌ Error saving draft:", error);
      alert("Failed to save draft.");
    }
  };
  
  

  const handleCopyURL = () => {
    navigator.clipboard.writeText(generatedURL);
    setCopied(true);
    router.push("/drafts"); // Redirects to Quick Page after copying the URL
  };
  

  return (
    <div className="bg-white p-6 shadow-md rounded-xl w-full max-w-xs mx-auto text-center border">
      <div className="flex justify-center">
        {formData.logo ? (
          <img
            src={formData.logo}
            alt="Company Logo"
            className="w-20 h-20 rounded-full shadow-md"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        )}
      </div>
      <h2 className="text-lg font-bold mt-2">
        {formData.companyName || "Company Name"}
      </h2>
      <p className="text-gray-500 text-sm">
        {formData.companyTagLine || "Tag Line"}
      </p>
      <div className="flex items-center justify-center gap-2 mt-4">
        {/* Share Button */}
        <button className="flex items-center gap-2 bg-[#1c1c50] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#151540] transition duration-150">
          Share
          <FaShare className="text-white text-lg" />
        </button>

        {/* Icons Section */}
        {/* Icons Section */}
        <div className="flex gap-2">
          {/* Location Icon */}
          <div className="p-2 bg-white rounded-full shadow-md">
            <a
              href={
                formData.locationURL
                  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      formData.locationURL
                    )}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt className="text-blue-500 text-2xl" />
            </a>
          </div>

          {/* WhatsApp Icon */}
          <div className="p-2 bg-white rounded-full shadow-md">
            <a
              href={
                formData.links ? `https://wa.me/${formData.links}` : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-green-500 text-2xl" />
            </a>
          </div>

          {/* Phone Icon */}
          <div className="p-2 bg-white rounded-full shadow-md">
            <a href={formData.mobileNumber ? `tel:${formData.mobileNumber}` : "#"}>
              <FaPhoneAlt className="text-blue-600 text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-4 bg-gray-100 rounded-full p-2">
        {["Links", "About", "Gallery"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-full text-sm ${
              activeTab === tab
                ? "bg-white shadow-md font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "Links" &&
          formData.links &&
          Object.keys(formData.links).length > 0 && (
            <ul className="space-y-2">
              {Object.entries(formData.links).map(([key, value]) =>
                value ? (
                  <li
                    key={key}
                    className="flex items-center bg-gray-100 p-2 rounded-lg justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {iconMap[key.toLowerCase()] || "🔗"}{" "}
                      <span className="text-sm text-gray-700">{key}</span>
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          )}
        {activeTab === "About" && (
          <div>
            <p className="text-gray-700 font-medium text-start">
              {formData.companyAbout || "No company description provided."}
            </p>
            {formData.locationURL && (
              <iframe
                src={formData.locationURL}
                className="w-full h-40 rounded-md border mt-2"
                allowFullScreen
                loading="lazy"
              ></iframe>
            )}
          </div>
        )}
        {activeTab === "Gallery" &&
          formData.files &&
          formData.files.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {formData.files.map((file, index) => (
                <img
                  key={index}
                  src={file.url}
                  alt={file.name}
                  className="w-full h-16 object-cover rounded-md"
                />
              ))}
            </div>
          )}
      </div>
      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-300 text-sm rounded w-[48%]"
          onClick={() => handleSave(false)}
        >
          Save as Draft
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white text-sm rounded w-[48%]"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 flex justify-center items-center z-10  ">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-left w-[480px]">
            <h2 className="text-xl font-semibold mb-4">Final URL Link</h2>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-500 bg-gray-100 p-2 rounded-md">links://growbharat.tech/</span>
              <input
                type="text"
                className="border border-red-500 p-2 rounded-md flex-grow"
                placeholder="Repository name"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">This field must not be blanked</p>
      
            <div className="mt-6 flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg"
                onClick={() => setShowPublishModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-orange-500 text-white rounded-lg"
                onClick={confirmPublish}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex justify-center items-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[480px] relative">
            
            {/* Success Icon */}
            <div className="flex justify-center items-center relative mb-4">
              <div className="text-5xl text-green-500">✔</div>
            </div>
            
            {/* Success Message */}
            <h2 className="text-lg font-bold mt-2">
              Successfully Published URL:  
              <span className="text-orange-500 block break-all">{generatedURL}</span>
            </h2>
      
            {/* Copy Link Section */}
            <div className="mt-4">
              <p className="text-gray-700 font-medium mb-2">Share this link</p>
              <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                <p className="text-blue-500 font-semibold text-sm truncate">{generatedURL}</p>
                <button
                  className="ml-2 px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={handleCopyURL}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
      
            {/* Close Button */}
            <button
              className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg"
              onClick={() => setShowSuccessModal(false)} // ✅ Manually close modal
            >
              Go To Quick Page
            </button>
          </div>
        </div>
      )}
      
      
      
    </div>
    
  );
}
