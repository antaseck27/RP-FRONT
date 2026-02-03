



import { Menu, Bell, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/hotels": "Liste des hôtels",
};

const Header = ({ userData, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const notifRef = useRef(null);

  const [title, setTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadNotifications] = useState(3);

  useEffect(() => {
    setTitle(pageTitles[location.pathname] || "");
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 md:left-[322px] h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-6 z-30">

      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
          <Menu size={22} strokeWidth={1.8} />
        </button>

        <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          {title}
        </h1>
      </div>

      {/* RIGHT – DESKTOP ONLY */}
      <div className="hidden md:flex items-center gap-4">

        {/* Recherche */}
        <input
          type="text"
          placeholder="Recherche..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[180px] h-10 px-3 rounded-2xl text-gray-700 bg-gray-200 focus:outline-none"
        />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="but1 relative text-gray-600 hover:text-gray-800 transition"
          >
            <Bell size={22} strokeWidth={1.8} />
            {unreadNotifications > 0 && (
              <span className="but1 absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {unreadNotifications}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-4 w-72 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b text-sm font-semibold">
                Notifications
              </div>
              <div className="px-4 py-3 text-sm hover:bg-gray-50">
                Nouvelle réservation
              </div>
              <div className="px-4 py-3 text-sm hover:bg-gray-50">
                Message client
              </div>
            </div>
          )}
        </div>

        {/* PHOTO DE PROFIL – DESKTOP SEULEMENT */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer"
          style={{ backgroundColor: userData?.color || "#64748b" }}
          title={userData?.name || "Utilisateur"}
        >
          {userData?.initials || "U"}
        </div>

        {/* Déconnexion */}
        <button
          onClick={handleLogout}
          className="but1 text-gray-600 hover:text-red-500 transition"
        >
          <LogOut size={22} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
};

export default Header;
