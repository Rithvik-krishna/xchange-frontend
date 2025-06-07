import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 text-white bg-blue-600">
      <Link className="text-2xl font-bold" to="/">XChange</Link>
      <div className="flex items-center gap-4">
        <Link to="/">Browse Listings</Link>
        <Link to="/post">Post Item</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/trades">Trades</Link>
        {user ? (
          <>
            <span className="font-semibold">{user.name}</span>
            <button className="px-4 py-1 ml-2 bg-red-500 rounded" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
