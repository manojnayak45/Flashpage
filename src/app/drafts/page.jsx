"use client";
import { useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useRouter } from "next/navigation";

// PopupMenu Component
const PopupMenu = ({ draft, handleEdit, handlePublish, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-100">
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg">
          {draft.status === "Draft" ? (
            <>
              <button
                onClick={() => handleEdit(draft._id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Edit
              </button>
              <button
                onClick={() => handlePublish(draft._id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Publish
              </button>
              <button
                onClick={() => handleDelete(draft._id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => handleDelete(draft._id)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// DraftsPage Component
export default function DraftsPage() {
  const [drafts, setDrafts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchDrafts();
  }, []);

  async function fetchDrafts() {
    try {
      const response = await fetch("/api/drafts");
      const data = await response.json();
      if (data.success) {
        const draftsData = Array.isArray(data.quickPages) ? data.quickPages : [];
        setDrafts(draftsData);
      } else {
        console.error("Error fetching drafts:", data.error || "Unknown error occurred.");
        setDrafts([]);
      }
    } catch (error) {
      console.error("Error fetching drafts:", error.message);
      setDrafts([]);
    }
  }

  const handleEdit = (id) => {
    router.push(`/quickpage/edit/${id}`);
  };

  const handlePublish = async (id) => {
    try {
      const response = await fetch(`/api/drafts`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Published" }),
      });

      const data = await response.json();
      if (data.success) {
        alert("QuickPage Published!");
        fetchDrafts();
      } else {
        console.error("Publish Error:", data.error);
      }
    } catch (error) {
      console.error("Error publishing:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    try {
      const res = await fetch(`/api/drafts?id=${id}`, { method: "DELETE" });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Error deleting QuickPage: " + errorData.message);
        return;
      }

      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft._id !== id));
      alert("QuickPage deleted successfully.");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Unexpected error while deleting.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Companies</h2>
        <button
          onClick={() => router.push("/quickpage")}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          + Create
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-600">
              <th className="p-3">Logo</th>
              <th className="p-3">Company</th>
              <th className="p-3">QuickPage ID.</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Created Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {drafts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No drafts found.
                </td>
              </tr>
            ) : (
              drafts.map((draft) => (
                <tr key={draft._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={draft.logo || "/default-logo.png"}
                      alt="Logo"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{draft.companyName}</td>
                  <td className="p-3">{draft.serialNumber}</td>
                  <td className="p-3">{draft.createdBy}</td>
                  <td className="p-3">{new Date(draft.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        draft.status === "Published"
                          ? "bg-green-200 text-green-700"
                          : "bg-orange-200 text-orange-700"
                      }`}
                    >
                      {draft.status === "Published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-3">
                    <PopupMenu
                      draft={draft}
                      handleEdit={handleEdit}
                      handlePublish={handlePublish}
                      handleDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
