



// import { Menu, Bell, LogOut } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";

// const pageTitles = {
//   "/dashboard": "Dashboard",
//   "/dashboard/hotels": "Liste des hôtels",
// };

// const Header = ({ userData, toggleSidebar }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const notifRef = useRef(null);

//   const [title, setTitle] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [notifOpen, setNotifOpen] = useState(false);
//   const [unreadNotifications] = useState(3);

//   useEffect(() => {
//     setTitle(pageTitles[location.pathname] || "");
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (notifRef.current && !notifRef.current.contains(e.target)) {
//         setNotifOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 md:left-[322px] h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-6 z-30">

//       {/* LEFT */}
//       <div className="flex items-center gap-4 min-w-0">
//         <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
//           <Menu size={22} strokeWidth={1.8} />
//         </button>

//         <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
//           {title}
//         </h1>
//       </div>

//       {/* RIGHT – DESKTOP ONLY */}
//       <div className="hidden md:flex items-center gap-4">

//         {/* Recherche */}
//         <input
//           type="text"
//           placeholder="Recherche..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-[180px] h-10 px-3 rounded-2xl text-gray-700 bg-gray-200 focus:outline-none"
//         />

//         {/* Notifications */}
//         <div className="relative" ref={notifRef}>
//           <button
//             onClick={() => setNotifOpen(!notifOpen)}
//             className="but1 relative text-gray-600 hover:text-gray-800 transition"
//           >
//             <Bell size={22} strokeWidth={1.8} />
//             {unreadNotifications > 0 && (
//               <span className="but1 absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
//                 {unreadNotifications}
//               </span>
//             )}
//           </button>

//           {notifOpen && (
//             <div className="absolute right-0 mt-4 w-72 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
//               <div className="px-4 py-3 border-b text-sm font-semibold">
//                 Notifications
//               </div>
//               <div className="px-4 py-3 text-sm hover:bg-gray-50">
//                 Nouvelle réservation
//               </div>
//               <div className="px-4 py-3 text-sm hover:bg-gray-50">
//                 Message client
//               </div>
//             </div>
//           )}
//         </div>

//         {/* PHOTO DE PROFIL – DESKTOP SEULEMENT */}
//         <img
//         src="https://i.pinimg.com/736x/b0/19/f6/b019f6c43757fcb7526a9457eddb8c31.jpg"
//           // src={userData?.avatar || "https://i.pravatar.cc/40"}
//           alt="Profil"
//           className="w-9 h-9 rounded-full object-cover cursor-pointer"
//         />

//         {/* Déconnexion */}
//         <button
//           onClick={handleLogout}
//           className="but1 text-gray-600 hover:text-red-500 transition"
//         >
//           <LogOut size={22} strokeWidth={1.8} />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


import { Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
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
    <header className="fixed top-0 left-0 right-0 md:left-[322px] bg-white shadow-md h-[70px] flex items-center justify-between px-6 z-40">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: avatarBg }}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              {userData?.name || "Utilisateur"}
            </p>
            <p className="text-xs text-gray-500">{userData?.email || ""}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </header>
  );
};

export default Header;
