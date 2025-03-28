"use client";
import "../styles/globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({ children }) {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
      if (pathname === "/login") {
        router.push("/dashboard"); // Redirect to dashboard after login
      }
    } else if (pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/login");
  };

  // Hide Sidebar and Navbar on login page
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="flex h-screen">
        {!isLoginPage && admin && <Sidebar />}
        <div className="flex flex-col w-full">
          {!isLoginPage && admin && <Navbar admin={admin} onLogout={handleLogout} />}
          <main className="p-6 bg-gray-100 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
