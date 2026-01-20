// // export default Sidebar;

// import { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";
// import { BsPcDisplayHorizontal } from "react-icons/bs";

// // Exemple de menu dynamique
// const menuItems = [
//   { id: 1, name: "Dashboard", route: "/dashboard", icon: MdDashboard },
//   { id: 2, name: "Liste des hôtels", route: "/dashboard/hotels", icon: BsPcDisplayHorizontal },
// ];

// const Sidebar = ({ userData }) => {
//   const [open, setOpen] = useState(false); // toggle sidebar mobile
//   const location = useLocation(); // pour gérer active link

//   // Fonction pour fermer sidebar sur mobile après clic sur lien
//   const handleLinkClick = () => {
//     if (window.innerWidth < 768) setOpen(false);
//   };

//   // Scroll si sidebar dépasse l'écran
//   useEffect(() => {
//     const sidebarEl = document.querySelector(".sidebar");
//     if (sidebarEl) sidebarEl.style.overflowY = "auto";
//   }, []);

//   return (
//     <>
//       {/* Hamburger mobile */}
//       <button
//         className="sidebar-hamburger md:hidden fixed top-4 left-4 z-50 text-white text-2xl"
//         onClick={() => setOpen(!open)}
//       >
//         ☰
//       </button>

//       <aside
//         className={`sidebar fixed top-0 left-0 h-full z-40 flex flex-col p-6 
//         bg-[rgba(73,76,79,0.8)] 
//         bg-[url('assets/WhatsApp Image 2026-01-15 at 16.05.16.jpeg')] 
//         bg-center bg-cover 
//         transition-transform duration-300
//         ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         {/* Logo */}
//         <div className="sidebar-logo">
//           <span className="logo-icon">◤◥</span>
//           <span className="logo-text">RED PRODUCT</span>
//         </div>

//         {/* Section */}
//         <p className="sidebar-section">Principal</p>

//         {/* Navigation */}
//         <nav className="sidebar-nav">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.id}
//               to={item.route}
//               end={item.route === "/dashboard"} // seulement Dashboard end
//               className={({ isActive }) =>
//                 `sidebar-link ${isActive ? "active" : ""}`
//               }
//               onClick={handleLinkClick} // ferme sidebar sur mobile
//             >
//               {item.icon && <item.icon />}
//               <span>{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>

//         {/* User */}
//         <div className="sidebar-user">
//           <img
//             src={userData?.avatar || "https://i.pravatar.cc/40"}
//             alt="user"
//             className="user-avatar"
//           />
//           <div>
//             <p className="user-name">{userData?.name || "Anta seck"}</p>
//             <span className="user-status">
//               <span className="status-dot" />
//               {userData?.status || "en ligne"}
//             </span>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BsPcDisplayHorizontal } from "react-icons/bs";

const menuItems = [
  { id: 1, name: "Dashboard", route: "/dashboard", icon: MdDashboard },
  { id: 2, name: "Liste des hôtels", route: "/dashboard/hotels", icon: BsPcDisplayHorizontal },
];

const Sidebar = ({ userData, open, setOpen }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setOpen(false);
  };

  return (
    <>
      {/* Hamburger mobile */}
      <button
        className="sidebar-hamburger md:hidden fixed top-4 left-4 z-50 text-white text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <aside
      style={{ width: 322 }}
        className={`
          sidebar fixed top-0 left-0 h-full w-64 z-40 flex flex-col p-6
          bg-[rgba(73,76,79,0.8)]
          bg-[url('assets/WhatsApp Image 2026-01-15 at 16.05.16.jpeg')]
          bg-center bg-cover
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <span className="logo-icon">◤◥</span>
          <span className="logo-text">RED PRODUCT</span>
        </div>

        {/* Section */}
        <p className="sidebar-section">Principal</p>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
              end={item.route === "/dashboard"}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              onClick={handleLinkClick}
            >
              {item.icon && <item.icon />}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="sidebar-user">
          <img
            src={userData?.avatar || "https://i.pravatar.cc/40"}
            alt="user"
            className="user-avatar"
          />
          <div>
            <p className="user-name">{userData?.name || "Anta seck"}</p>
            <span className="user-status">
              <span className="status-dot" />
              {userData?.status || "en ligne"}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
