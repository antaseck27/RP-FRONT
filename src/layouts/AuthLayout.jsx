import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Outlet /> {/* Ici seront rendues les pages Login / Signup / ForgotPassword */}
    </div>
  );
};

export default AuthLayout;
