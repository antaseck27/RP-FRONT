
// // export default Header;

// import { FaBars, FaBell, FaSignOutAlt } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// const Header = ({ userData, toggleSidebar }) => {
//   const location = useLocation();

//   // Détermination dynamique du titre
//   const getTitle = (pathname) => {
//     if (pathname === "/") return "Dashboard";
//     if (pathname.startsWith("/dashboard/hotels")) return "Liste des hôtels";
//     return "";
//   };

//   const title = getTitle(location.pathname);

//   return (
//     <header
//       className="
       
//         fixed top-0 right-0 left-0 md:left-[322px] h-16 
//         h-18 bg-white border-b shadow
//         flex items-center justify-between
//         px-4 md:px-6 z-30
//       "
//     >
//       {/* Hamburger mobile */}
//       <button
//         className="md:hidden text-xl text-gray-700"
//         onClick={toggleSidebar}
//       >
//         <FaBars />
//       </button>

//       {/* TITRE DYNAMIQUE */}
//       <h1 className="text-lg md:text-xl font-semibold text-gray-800">
//         {title}
//       </h1>

//       {/* Actions */}
//       <div className="flex items-center gap-4">
//         <FaBell className="text-gray-600 cursor-pointer" />

//         <img
//           src={userData?.avatar || "https://i.pravatar.cc/40"}
//           className="w-9 h-9 rounded-full object-cover"
//           alt="user"
//         />

//         <FaSignOutAlt className="text-gray-600 cursor-pointer hover:text-red-500" />
//       </div>
//     </header>
//   );
// };


import { FaBars, FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/hotels": "Liste des hôtels",
};

const Header = ({ userData, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState(pageTitles[location.pathname] || "");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Etat pour la recherche

  // Mettre à jour le titre à chaque changement de pathname
  useEffect(() => {
    setTitle(pageTitles[location.pathname] || "");
  }, [location.pathname]);

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erreur de déconnexion: ", error.message);
    }
  };

  // Simuler l'ajout d'une notification
  const handleNewNotification = () => {
    setUnreadNotifications(prev => prev + 1);
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[322px] h-16 bg-white border-b shadow flex items-center justify-between px-4 md:px-6 z-30">
      {/* Hamburger mobile */}
      <button className="md:hidden text-xl" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Titre dynamique */}
      <h1 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-4">

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Recherche..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[180px] h-[40px] px-3 rounded-2xl text-gray-700 bg-gray-200 focus:outline-none"
        />
        
        {/* Notification */}
        <button
          className="relative text-gray-600 cursor-pointer"
          onClick={handleNewNotification}
        >
          <FaBell className="text-gray-600" />
          {unreadNotifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
              {unreadNotifications}
            </span>
          )}
        </button>

        

        {/* Avatar utilisateur */}
        <img
          src={userData?.avatar || "https://i.pravatar.cc/35"}
          className="w-9 h-9 rounded-full"
          alt="user"
        />

        {/* Bouton de déconnexion */}
        <FaSignOutAlt
          className="text-gray-600 cursor-pointer hover:text-red-500"
          onClick={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;



// // export default Header;


// import { FaBars, FaBell, FaSignOutAlt } from "react-icons/fa";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// const pageTitles = {
//   "/dashboard": "Dashboard",
//   "/dashboard/hotels": "Liste des hôtels",
// };

// const Header = ({ userData, toggleSidebar }) => {
//   const location = useLocation();
//   const [title, setTitle] = useState(pageTitles[location.pathname] || "");

//   // Mettre à jour le titre à chaque changement de pathname
//   useEffect(() => {
//     setTitle(pageTitles[location.pathname] || "");
//   }, [location.pathname]);

//   return (
//     <header
//       className="fixed top-0 right-0 left-0 md:left-[322px] h-16
//       bg-white border-b shadow flex items-center justify-between
//       px-4 md:px-6 z-30"
//     >
//       {/* Hamburger mobile */}
//       <button className="md:hidden text-xl" onClick={toggleSidebar}>
//         <FaBars />
//       </button>

//       {/* Titre dynamique */}
//       <h1 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h1>

//       <div className="flex items-center gap-4">
//         <FaBell className="text-gray-600 cursor-pointer" />
//         <img
//           src={userData?.avatar || "https://i.pravatar.cc/35"}
//           className="w-9 h-9 rounded-full"
//           alt="user"
//         />
//         <FaSignOutAlt className="text-gray-600 cursor-pointer hover:text-red-500" />
//       </div>
//     </header>
//   );
// };

// export default Header;
