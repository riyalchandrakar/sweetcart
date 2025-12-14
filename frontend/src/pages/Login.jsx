import { useState } from "react";
import API from "../api/api";
import useAuth from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔄 Loading toast
    const toastId = toast.loading("Logging you in...");

    try {
      const res = await API.post("/auth/login", {
        ...form,
        role,
      });

      login(res.data);

      // ✅ Success toast (role-based)
      toast.success(
        res.data.role === "admin"
          ? "Welcome Admin 👋 Dashboard ready."
          : "Welcome back! Ready to order sweets 🍬",
        { id: toastId }
      );

      navigate(res.data.role === "admin" ? "/admin" : "/dashboard");
    } catch {
      toast.dismiss(toastId);

      // ❌ Error + Action toast (Retry)
      toast.custom((t) => (
        <div
          className="
            bg-[#3B1D14] text-[#FFF4EC]
            px-4 py-3 rounded-xl shadow-lg
            flex items-center gap-3
          "
        >
          <span className="text-sm">
            Login failed. Check credentials.
          </span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              submitHandler(e);
            }}
            className="bg-rose-600 px-3 py-1 rounded text-sm font-semibold"
          >
            Retry
          </button>
        </div>
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-rose-100 to-amber-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-heading text-center text-[#3B1D14] mb-2">
          Welcome Back 🍬
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Login to continue to Sweet Shop
        </p>

        {/* ROLE SWITCH */}
        <div className="flex justify-center mb-5">
          <div className="bg-[#FFF4EC] rounded-full p-1 flex w-full">
            {["user", "admin"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                  role === r
                    ? "bg-rose-600 text-white shadow"
                    : "text-[#3B1D14]"
                }`}
              >
                {r === "user" ? "User" : "Admin"}
              </button>
            ))}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-rose-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-rose-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold ${
              loading
                ? "bg-slate-400"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {loading ? "Logging in..." : `Login as ${role}`}
          </button>
        </form>

        {role === "user" && (
          <p className="text-center text-sm text-slate-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-rose-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
