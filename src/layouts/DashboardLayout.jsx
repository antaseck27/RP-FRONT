

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

  const userData = {
    name: "Anta Seck",
    avatar: "https://i.pravatar.cc/35",
    status: "en ligne",
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
