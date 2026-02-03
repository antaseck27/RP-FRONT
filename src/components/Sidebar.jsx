

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
//         <nav className="sidebar-nav flex flex-col gap-2">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.id}
//               to={item.route}
//               end={item.route === "/dashboard"}
//               className="sidebar-link flex items-center gap-3 p-2 rounded-lg text-white transition-colors duration-200"
//               onClick={handleLinkClick}
//             >
//               {item.icon && <item.icon />}
//               <span>{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>

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


import {
  Home,
  Building2,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user")) || null;

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase();
  };

  const getAvatarColor = (seed) => {
    if (!seed) return "#64748b";
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "#ef4444", "#f97316", "#f59e0b", "#84cc16",
      "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6",
      "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  const avatarBg = getAvatarColor(userData?.email || userData?.name);
  const initials = getInitials(userData?.name);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-[320px] bg-white shadow-lg p-6 z-50">
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
          style={{ backgroundColor: avatarBg }}
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {userData?.name || "Utilisateur"}
          </p>
          <p className="text-xs text-gray-500">{userData?.email || ""}</p>
        </div>
      </div>

      <nav className="space-y-4">
        <a href="/dashboard" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
          <Home className="w-5 h-5" /> Dashboard
        </a>
        <a href="/dashboard/hotels" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
          <Building2 className="w-5 h-5" /> Hôtels
        </a>
        <a href="/dashboard/users" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
          <Users className="w-5 h-5" /> Utilisateurs
        </a>
        <a href="/dashboard/forms" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
          <FileText className="w-5 h-5" /> Formulaires
        </a>
        <a href="/dashboard/settings" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
          <Settings className="w-5 h-5" /> Paramètres
        </a>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 flex items-center gap-2 text-red-500 hover:text-red-600"
      >
        <LogOut className="w-4 h-4" />
        Déconnexion
      </button>
    </aside>
  );
};

export default Sidebar;

