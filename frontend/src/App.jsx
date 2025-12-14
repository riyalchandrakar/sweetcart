import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./context/useAuth";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory"; // ✅ NEW

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            !user ? (
              <Login />
            ) : (
              <Navigate
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                replace
              />
            )
          }
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/dashboard"
          element={
            user && user.role === "user" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/cart"
          element={
            user && user.role === "user" ? (
              <Cart />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/checkout"
          element={
            user && user.role === "user" ? (
              <Checkout />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ ORDER HISTORY */}
        <Route
          path="/orders"
          element={
            user && user.role === "user" ? (
              <OrderHistory />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
