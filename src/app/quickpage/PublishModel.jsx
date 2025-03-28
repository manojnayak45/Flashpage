import { useState } from "react";
import { FaLink } from "react-icons/fa";

export default function PublishModal({ formData, setFormData, onClose }) {
  const [generatedLink, setGeneratedLink] = useState("");

  const handlePublish = () => {
    const uniqueId = Math.random().toString(36).substr(2, 8); // Generate a unique link ID
    const newLink = `https://growbharat.tech/${uniqueId}`;
    
    // Update the formData to store the published link
    setFormData((prev) => ({
      ...prev,
      publishedLink: newLink,
      status: "published",
    }));

    setGeneratedLink(newLink);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800">Do you want to publish?</h2>
        <p className="text-gray-500">Your page will be available at:</p>

        {generatedLink ? (
          <div className="mt-3 p-3 border rounded flex items-center justify-between">
            <span>{generatedLink}</span>
            <button
              onClick={() => navigator.clipboard.writeText(generatedLink)}
              className="bg-orange-500 text-white px-3 py-1 rounded flex items-center gap-2"
            >
              <FaLink /> Copy
            </button>
          </div>
        ) : (
          <div className="mt-3 p-3 border rounded bg-gray-100 text-gray-700">
            https://growbharat.tech/
            <input type="text" className="border-none bg-transparent w-20 outline-none" placeholder="custom-name" />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handlePublish} className="px-4 py-2 bg-orange-500 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
}
