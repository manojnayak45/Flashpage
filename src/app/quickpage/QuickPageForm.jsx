import { useState } from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaGlobe,
  FaUpload,
  FaUser,
  FaTrash,
  FaPlusCircle
} from "react-icons/fa";

const socialMediaOptions = [
  { name: "Website", icon: <FaGlobe className="text-blue-500 text-2xl" /> },
  { name: "Linkedin", icon: <FaLinkedin className="text-blue-700 text-2xl" /> },
  { name: "Whatsapp", icon: <FaWhatsapp className="text-green-500 text-2xl" /> },
  { name: "Instagram", icon: <FaInstagram className="text-pink-500 text-2xl" /> },
  { name: "Facebook", icon: <FaFacebook className="text-blue-600 text-2xl" /> },
  { name: "Founder", icon: <FaUser className="text-blue-600 text-2xl" /> },
];

export default function QuickPageForm({ formData, setFormData }) {
 
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState({ name: "", url: "" });
    

  
  // Handle Input Changes
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [key]: value },
    }));
  };

  // Handle File Uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name.split(".")[0],
      }));
      setFormData((prev) => ({ ...prev, files: [...(prev.files || []), ...newFiles] }));
    }
  };

  // Handle Remove File
  const handleRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

 // Handle Deleting a Link
 const handleDeleteLink = (key) => {
  const updatedLinks = { ...formData.links };
  delete updatedLinks[key];
  setFormData((prev) => ({ ...prev, links: updatedLinks }));
};

 // Handle Adding a Link
 const handleAddLink = () => {
  if (newLink.name && newLink.url) {
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [newLink.name]: newLink.url },
    }));
    setNewLink({ name: "", url: "" });
    setShowLinkModal(false);
  }
};


  return (
    <div className="p-6 w-full max-w-lg mx-auto space-y-3">
      {/* === Quick Page Header === */}
      <h2 className="text-2xl font-bold text-gray-800">Quick Page</h2>

      {/* === Company Name === */}
      <h3 className="text-lg font-bold text-gray-700">Company Name</h3>
      <p className="text-sm text-gray-500">This name will appear on the Quick Page.</p>
      <input
        type="text"
        className="border p-2 w-full rounded-2xl bg-gray-100"
        value={formData.companyName || ""}
        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
      />

      {/* === Company Logo === */}
      <h3 className="text-lg font-bold text-gray-700">Company Logo</h3>
      <p className="text-sm text-gray-500">Upload your business logo.</p>
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-2xl text-center bg-gray-50 relative">
      <input
        type="file"
        className="hidden"
        id="logoUpload"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const logoURL = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, logo: logoURL }));
          }
        }}
      />
      {formData.logo ? (
        <img
          src={formData.logo}
          alt="Logo"
          className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
        />
      ) : (
        <div className="text-gray-400 mb-4">
          <p>Max 12MB, PNG, JPEG, SVG</p>
        </div>
      )}
      <label
        htmlFor="logoUpload"
        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      >
        <FaUpload className="mr-2" /> Browse Logo
      </label>
     
    </div>
    <p className="text-xs text-gray-400 mt-2">Note: Don’t have any, skip the logo</p>

      {/* === Company Tagline === */}
      <h3 className="text-lg font-bold text-gray-700">Company Tagline</h3>
      <p className="text-sm text-gray-500">A short and catchy tagline for your business.</p>
      <input
        type="text"
        className="border p-2 w-full rounded-2xl bg-gray-100"
        value={formData.companyTagLine || ""}
        onChange={(e) => setFormData({ ...formData, companyTagLine: e.target.value })}
      />

      {/* === URL Entries === */}
       {/* === URL Entries === */}
<div className="space-y-2">


{/* Display Added Links */}
{/* === URL Entries === */}
<div className="space-y-2">
  <h2 className="text-lg font-semibold">URL Entries</h2>
  <p className="text-sm text-gray-500">This link will appear in the particular company forms.</p>

  {/* Display Added Links */}
  {formData.links && Object.keys(formData.links).length > 0 && (
    <div className="mt-4 space-y-2">
      {Object.entries(formData.links).map(([name, url], index) => (
        url && (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-full"
          >
            <div className="flex items-center space-x-2">
              {socialMediaOptions.find((opt) => opt.name === name)?.icon}
              <span>{name}</span>
            </div>
            <button
              onClick={() => handleDeleteLink(name)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        )
      ))}
    </div>
  )}

  {/* Add Link Button */}
  <button
    className="mt-4 w-full py-4 bg-orange-500 text-white rounded-full flex items-center justify-center space-x-2 hover:bg-orange-600 transition duration-150"
    onClick={() => setShowLinkModal(true)}
  >
    <FaPlusCircle className="mr-1" />
    <span className="font-semibold">Add Link</span>
  </button>
</div>


{/* Link Modal */}
{showLinkModal && (
  <div className="fixed inset-0 flex justify-center items-center z-10  right-[400px]">
    <div className="bg-white p-6 rounded-lg text-center w-[500px] shadow-lg relative ">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setShowLinkModal(false)}
      >
        ✖
      </button>
      <h2 className="text-lg font-bold">Enter URL / App</h2>
      <input
        type="text"
        className="border p-2 w-full rounded mt-2"
        placeholder="Custom App Name"
        value={newLink.name}
        onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
      />
      <div className="flex items-center border p-2 w-full rounded mt-2">
        <input
          type="text"
          className="w-full outline-none"
          placeholder="Enter URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <button
          className="ml-2 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-150"
          onClick={handleAddLink}
        >
          ADD
        </button>
      </div>
      <div className="mt-4">
  <p className="text-sm text-gray-500">Suggestions</p>
  <div className="flex justify-around mt-2 space-x-4">
    {socialMediaOptions.map((option) => (
      <button
  key={option.name}
  className="flex flex-col items-center text-sm text-gray-600 hover:text-gray-900 w-20"
  onClick={() => setNewLink({ name: option.name, url: '' })}
>
  <div className="w-8 h-8 flex justify-center items-center">
    <span className="text-xl">{option.icon}</span>
  </div>
  <span className="truncate">{option.name}</span>
</button>

    ))}
  </div>
</div>

    </div>
  </div>
)}
</div>



      {/* === About Company === */}
      <h3 className="text-lg font-bold text-gray-700">About Company</h3>
      <p className="text-sm text-gray-500">Provide a brief description of your business.</p>
      <textarea
        className="border p-2 w-full rounded bg-gray-100 h-24"
        value={formData.companyAbout || ""}
        onChange={(e) => setFormData({ ...formData, companyAbout: e.target.value })}
      />

      {/* === Location URL === */}
      <h3 className="text-lg font-bold text-gray-700">Location URL</h3>
      <p className="text-sm text-gray-500">Enter your Google Maps location link.</p>
      <input
        type="text"
        className="border p-2 w-full rounded bg-gray-100"
        value={formData.locationURL || ""}
        onChange={(e) => setFormData({ ...formData, locationURL: e.target.value })}
      />

      {/* === Mobile Number === */}
      <h3 className="text-lg font-bold text-gray-700">Mobile Number</h3>
      <p className="text-sm text-gray-500">Enter a contact number for your business.</p>
      <input
        type="text"
        className="border p-2 w-full rounded bg-gray-100"
        value={formData.mobileNumber || ""}
        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
      />

      {/* === File Uploads (Gallery) === */}
     
      

{/* Uploaded Files Preview */}
{/* === File Uploads (Gallery) === */}
<h3 className="text-lg font-bold text-gray-700">File Uploads</h3>
<p className="text-sm text-gray-500">Upload images for the Gallery section.</p>
<div className="border border-dashed p-4 rounded-lg text-center bg-gray-50">
  <input
    type="file"
    className="hidden"
    id="fileUpload"
    accept="image/*"
    multiple
    onChange={handleFileUpload}
  />
  <label
    htmlFor="fileUpload"
    className="w-full block bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer"
  >
    <FaUpload className="inline-block mr-2" /> Add Pictures
  </label>
</div>

{/* Uploaded Files Preview (Gallery) */}
<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
  {formData.files?.map((file, index) => (
    <div
      key={index}
      className="relative group bg-white rounded-lg shadow p-2 flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <img
          src={file.url}
          alt={file.name}
          className="w-16 h-16 rounded-md object-cover"
        />
        <input
          type="text"
          value={file.name}
          readOnly
          className="text-sm border-none focus:ring-0 bg-transparent"
        />
      </div>
      <button
        onClick={() => handleRemove(index)}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700"
      >
        <FaTrash />
      </button>
    </div>
  ))}
</div>


    </div>
  );
}
