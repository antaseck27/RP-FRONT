

// import { Outlet } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const userData = {
//     name: "Anta Seck",
//     avatar: "https://i.pravatar.cc/40",
//     status: "en ligne",
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Sidebar FIXED */}
//       <Sidebar
//         userData={userData}
//         open={sidebarOpen}
//         setOpen={setSidebarOpen}
//       />

//       {/* HEADER */}
//       <Header
//         userData={userData}
//         toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//       />

//       {/* CONTENU */}
//       <main
//         className="
//           pt-16
//           ml-0 md:ml-64
//           p-6
//           transition-all
//         "
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const buildUserData = () => {
    let raw = null;
    try {
      raw = JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      raw = null;
    }

    if (!raw) return null;

    const seed = raw.email || raw.name || "user";
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#84cc16",
      "#22c55e",
      "#14b8a6",
      "#06b6d4",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#ec4899",
      "#f43f5e",
    ];
    const color = colors[Math.abs(hash) % colors.length];

    const parts = (raw.name || "Utilisateur").trim().split(" ");
    const first = parts[0]?.[0] || "U";
    const last = parts[1]?.[0] || "";
    const initials = `${first}${last}`.toUpperCase();

    return {
      ...raw,
      initials,
      color,
      status: raw.status || "en ligne",
    };
  };

  const [userData, setUserData] = useState(buildUserData);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "user") {
        setUserData(buildUserData());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar userData={userData} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content + header */}
      {/* <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isDesktop ? "md:ml-64" : ""
        }`}
      > */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isDesktop ? "md:ml-[322px]" : ""}`}>

        <Header
          userData={userData}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-6 mt-16 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
