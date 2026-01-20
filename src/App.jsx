

// // export default App;
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import DashboardLayout from "./layouts/DashboardLayout";
// import AuthLayout from "./layouts/AuthLayout";

// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import DashboardHome from "./pages/dashboard/DashboardHome";
// import ListHotels from "./pages/dashboard/ListHotels";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Auth routes */}
//         <Route element={<AuthLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<div>Forgot Password</div>} />
//         </Route>

//         {/* Dashboard routes */}
//         <Route element={<DashboardLayout />}>
//           <Route path="/" element={<DashboardHome />} />
//           <Route path="/dashboard/hotels" element={<ListHotels />} />
//         </Route>

//         {/* Redirect si page non trouvée */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ListHotels from "./pages/dashboard/ListHotels";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} /> {/* ← Login par défaut */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/hotels" element={<ListHotels />} />
        </Route>

        {/* Redirect si page non trouvée */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
