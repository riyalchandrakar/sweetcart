import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

const LogoutButton = ({
  redirectTo = "/login",
  className = "",
  label = "Logout",
  variant = "danger", // "danger" | "ghost"
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.custom((t) => (
      <div
        className="
          bg-white rounded-2xl shadow-xl
          px-4 py-3
          flex items-center gap-3
          border
        "
      >
        <span className="text-sm text-slate-700">
          Are you sure you want to logout?
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              logout();
              navigate(redirectTo);
              toast.success("Logged out successfully 👋");
            }}
            className="
              px-3 py-1.5 rounded-lg
              bg-rose-600 text-white
              text-sm font-semibold
              hover:bg-rose-700
            "
          >
            Logout
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="
              px-3 py-1.5 rounded-lg
              text-sm
              border border-slate-200
              hover:bg-slate-50
            "
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition";

  const styles =
    variant === "ghost"
      ? "text-slate-600 hover:bg-slate-100"
      : "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98]";

  return (
    <button
      onClick={handleLogout}
      className={`${base} ${styles} ${className}`}
    >
      <LogOut size={16} />
      {label}
    </button>
  );
};

export default LogoutButton;
