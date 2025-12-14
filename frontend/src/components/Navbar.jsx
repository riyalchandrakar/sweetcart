import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../context/useAuth";
import LogoutButton from "./LogoutButton";
import {
  ShoppingCart,
  ShoppingBag,
  Home,
  Shield,
  Menu,
  X,
} from "lucide-react";

const navClass = ({ isActive }) =>
  `
    flex items-center gap-2 px-4 py-2 rounded-xl
    text-sm font-medium transition-all
    ${
      isActive
        ? "bg-white/20 text-white"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }
  `;

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#3B1D14] via-[#5A2A1B] to-[#7A2E2E] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* BRAND */}
        <NavLink
          to={isAdmin ? "/admin" : "/"}
          onClick={closeMenu}
          className="flex items-center gap-2 font-heading text-xl text-[#FFF4EC]"
        >
          <span className="text-2xl">🍬</span>
          <span className="hidden sm:inline">SweetShop</span>
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2">

          {/* HOME (NON-ADMIN) */}
          {!isAdmin && (
            <NavLink to="/" className={navClass}>
              <Home size={16} />
              Home
            </NavLink>
          )}

          {/* GUEST */}
          {!user && (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition"
              >
                Register
              </NavLink>
            </>
          )}

          {/* USER */}
          {user?.role === "user" && (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>

              <NavLink to="/orders" className={navClass}>
                <ShoppingBag size={16} />
                Orders
              </NavLink>

              <button
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <ShoppingCart size={16} />
                Cart
              </button>

              <LogoutButton
                variant="ghost"
                className="text-white/80 hover:text-white"
              />
            </>
          )}

          {/* ADMIN */}
          {isAdmin && (
            <>
              <NavLink to="/admin" className={navClass}>
                <Shield size={16} />
                Admin
              </NavLink>

              <LogoutButton
                variant="ghost"
                className="text-white/80 hover:text-white"
              />
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#3B1D14]/95 backdrop-blur">

          {!isAdmin && (
            <NavLink to="/" onClick={closeMenu} className={navClass}>
              <Home size={16} />
              Home
            </NavLink>
          )}

          {!user && (
            <>
              <NavLink to="/login" onClick={closeMenu} className={navClass}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className="block px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold text-center"
              >
                Register
              </NavLink>
            </>
          )}

          {user?.role === "user" && (
            <>
              <NavLink to="/dashboard" onClick={closeMenu} className={navClass}>
                Dashboard
              </NavLink>

              <NavLink to="/orders" onClick={closeMenu} className={navClass}>
                <ShoppingBag size={16} />
                Orders
              </NavLink>

              <button
                onClick={() => {
                  navigate("/cart");
                  closeMenu();
                }}
                className="flex w-full items-center gap-2 px-4 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <ShoppingCart size={16} />
                Cart
              </button>

              <LogoutButton
                className="w-full text-left text-white/80 hover:text-white"
                onClick={closeMenu}
              />
            </>
          )}

          {isAdmin && (
            <>
              <NavLink to="/admin" onClick={closeMenu} className={navClass}>
                <Shield size={16} />
                Admin
              </NavLink>

              <LogoutButton
                className="w-full text-left text-white/80 hover:text-white"
                onClick={closeMenu}
              />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
