// app/components/Sidebar.jsx
"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Quick Page", path: "/quickpage" },
    { name: "Drafts Mgt.", path: "/drafts" },
    
  ];

  return (
    <div className="w-64 bg-[#151A3F] text-white p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Grow Bharat Technology</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className={`py-3 px-4 rounded-md ${pathname === item.path ? "bg-orange-500" : ""}`}>
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;