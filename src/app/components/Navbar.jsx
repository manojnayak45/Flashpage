import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa"; // Import dropdown arrow icon

export default function Navbar({ admin, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&s"
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">{admin?.name || "Adam Rosser"}</span>
            <span className="text-sm text-gray-500">Admin</span>
          </div>
          <FaChevronDown className="text-gray-600" />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50">
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
