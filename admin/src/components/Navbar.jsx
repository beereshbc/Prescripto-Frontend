import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigat = useNavigate();

  const logout = () => {
    navigat("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="flex items-center px-6 sm:px-10 justify-between py-3 border bg-white">
      <div className="flex items-center text-xs gap-4">
        <img className="w-36 sm:w-40" src={assets.admin_logo} alt="" />
        <p className="text-xs bg-primary px-2.5 py-1.5 text-white rounded-full">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        className="text-xs bg-primary px-10 py-2 text-white rounded-full"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
