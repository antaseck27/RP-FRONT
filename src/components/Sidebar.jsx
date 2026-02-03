
// // src/components/Sidebar.jsx
// import { NavLink, useNavigate } from "react-router-dom";
// import { MdDashboard } from "react-icons/md";
// import { BsPcDisplayHorizontal } from "react-icons/bs";
// import { LogOut } from "lucide-react";

// const menuItems = [
//   { id: 1, name: "Dashboard", route: "/dashboard", icon: MdDashboard },
//   { id: 2, name: "Liste des hôtels", route: "/dashboard/hotels", icon: BsPcDisplayHorizontal },
// ];

// const Sidebar = ({ userData, open, setOpen }) => {
//   const navigate = useNavigate();

//   const handleLinkClick = () => {
//     // Fermer la sidebar si on est sur mobile
//     if (window.innerWidth < 768) setOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Hamburger mobile simple et joli */}
//       <button
//         className="md:hidden fixed top-2 left-5 z-50 text-white text-2xl p-2  bg-black/50 hover:bg-black/70 transition-colors duration-200"
//         onClick={() => setOpen(!open)}
//       >
//         ☰
//       </button>

//       {/* Overlay mobile */}
//       {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" />}

//       <aside
//         style={{ width: 322 }}
//         className={`
//           sidebar fixed top-0 left-0 h-full z-40 flex flex-col p-6
//           bg-[rgba(73,76,79,0.8)]
//           bg-[url('assets/WhatsApp Image 2026-01-15 at 16.05.16.jpeg')]
//           bg-center bg-cover
//           transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
//         `}
//       >
//         {/* Logo */}
//         <div className="sidebar-logo mb-6">
//           <span className="logo-icon">◤◥</span>
//           <span className="logo-text">RED PRODUCT</span>
//         </div>

//         {/* Section */}
//         <p className="sidebar-section mb-2">Principal</p>

//         {/* Navigation */}
//      {/* <nav className="sidebar-nav flex flex-col gap-2">
//   {menuItems.map((item) => (
//     <NavLink
//       key={item.id}
//       to={item.route}
//       end={item.route === "/dashboard"}
//       onClick={handleLinkClick}
//       className={({ isActive }) =>
//         `sidebar-link flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
//         ${
//           isActive
//             ? "" // Fond blanc et texte gris très foncé quand actif
//             : "" // Texte blanc et hover léger
//         }`
//       }
//     >
//       {item.icon && <item.icon />}
//       <span>{item.name}</span>
//     </NavLink>
//   ))}
// </nav> */}
// <nav className="sidebar-nav flex flex-col gap-2">
//   {menuItems.map((item) => (
//     <NavLink
//       key={item.id}
//       to={item.route}
//       end={item.route === "/dashboard"}
//       className="sidebar-link flex items-center gap-3 p-2 rounded-lg text-white transition-colors duration-200"
//       onClick={handleLinkClick}
//     >
//       {item.icon && <item.icon />}
//       <span>{item.name}</span>
//     </NavLink>
//   ))}
// </nav>



//         {/* <nav className="sidebar-nav flex flex-col gap-2">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.id}
//               to={item.route}
//               end={item.route === "/dashboard"}
//               className={({ isActive }) =>
//                 `sidebar-link flex items-center gap-3 p-2 rounded-lg text-white transition-colors duration-200 ${
//                   isActive ? "bg-white/20" : "hover:bg-white/90"
//                 }`
//               }
//               onClick={handleLinkClick}
//             >
//               {item.icon && <item.icon />}
//               <span>{item.name}</span>
//             </NavLink>
//           ))}
//         </nav> */}

//         {/* MOBILE USER + DECONNEXION */}
//         {/* <div className="mt-auto md:hidden flex flex-col gap-2">
//           <div className="sidebar-user flex items-center gap-3">
//             <img
//               src={userData?.avatar || "https://i.pravatar.cc/40"}
//               alt="user"
//               className="user-avatar w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="user-name">{userData?.name || "Utilisateur"}</p>
//               <span className="user-status flex items-center text-gray-300 text-sm">
//                 <span className="status-dot w-2 h-2 rounded-full bg-green-400 mr-1" />
//                 {userData?.status || "en ligne"}
//               </span>
//             </div>
//           </div>

//           <button className="flex items-center gap-2 text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors duration-200">
//             <LogOut size={18} /> Déconnexion
//           </button>
//         </div> */}

//         {/* USER DESKTOP */}
//         <div className="sidebar-user hidden md:flex mt-auto items-center gap-3">
//           <img
//             src={userData?.avatar || "https://i.pravatar.cc/40"}
//             alt="user"
//             className="user-avatar w-10 h-10 rounded-full"
//           />
//           <div>
//             <p className="user-name">{userData?.name || "Utilisateur"}</p>
//             <span className="user-status flex items-center text-gray-300 text-sm">
//               <span className="status-dot w-2 h-2 rounded-full bg-green-400 mr-1" />
//               {userData?.status || "en ligne"}
//             </span>
//           </div>
//         </div>
        
//         {/* MOBILE USER + DECONNEXION */}
//         <div className=" p-8 md:hidden">
//           {/* <div className="sidebar-user flex items-center gap-3">
//             <img
//               src={userData?.avatar || "https://i.pravatar.cc/40"}
//               alt="user"
//               className="user-avatar w-10 h-10 rounded-full"
//             />
//             <div>
//               <p className="user-name">{userData?.name || "Utilisateur"}</p>
//               <span className="user-status flex items-center text-gray-300 text-sm">
//                 <span className="status-dot w-2 h-2 rounded-full bg-green-400 mr-1" />
//                 {userData?.status || "en ligne"}
//               </span>
//             </div>
//           </div> */}

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-red-300  rounded-lg hover:bg-red-500/10 transition-colors duration-200"
//           >
//             <LogOut size={18} /> Déconnexion
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { LogOut } from "lucide-react";

const menuItems = [
  { id: 1, name: "Dashboard", route: "/dashboard", icon: MdDashboard },
  { id: 2, name: "Liste des hôtels", route: "/dashboard/hotels", icon: BsPcDisplayHorizontal },
];

const Sidebar = ({ userData, open, setOpen }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    // Fermer la sidebar si on est sur mobile
    if (window.innerWidth < 768) setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Hamburger mobile simple et joli */}
      <button
        className="md:hidden fixed top-2 left-5 z-50 text-white text-2xl p-2  bg-black/50 hover:bg-black/70 transition-colors duration-200"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Overlay mobile */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" />}

      <aside
        style={{ width: 322 }}
        className={`
          sidebar fixed top-0 left-0 h-full z-40 flex flex-col p-6
          bg-[rgba(73,76,79,0.8)]
          bg-[url('assets/WhatsApp Image 2026-01-15 at 16.05.16.jpeg')]
          bg-center bg-cover
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="sidebar-logo mb-6">
          <span className="logo-icon">◤◥</span>
          <span className="logo-text">RED PRODUCT</span>
        </div>

        {/* Section */}
        <p className="sidebar-section mb-2">Principal</p>

        {/* Navigation */}
        <nav className="sidebar-nav flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
              end={item.route === "/dashboard"}
              className="sidebar-link flex items-center gap-3 p-2 rounded-lg text-white transition-colors duration-200"
              onClick={handleLinkClick}
            >
              {item.icon && <item.icon />}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* USER DESKTOP */}
        <div className="sidebar-user hidden md:flex mt-auto items-center gap-3">
          <img
            src={userData?.avatar || "https://i.pravatar.cc/40"}
            alt="user"
            className="user-avatar w-10 h-10 rounded-full"
          />
          <div>
            <p className="user-name">{userData?.name || "Utilisateur"}</p>
            <span className="user-status flex items-center text-gray-300 text-sm">
              <span className="status-dot w-2 h-2 rounded-full bg-green-400 mr-1" />
              {userData?.status || "en ligne"}
            </span>
          </div>
        </div>
        
        {/* MOBILE USER + DECONNEXION */}
        <div className=" p-8 md:hidden">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-300  rounded-lg hover:bg-red-500/10 transition-colors duration-200"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
