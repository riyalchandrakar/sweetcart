import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
 <Toaster
  position="top-center"
  containerStyle={{
    top: 72, // navbar height ke niche
  }}
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "12px",
      background: "#3B1D14",
      color: "#FFF4EC",
      fontWeight: "500",
      pointerEvents: "none", // 👈 IMPORTANT
    },
    success: {
      iconTheme: {
        primary: "#E11D48",
        secondary: "#FFF",
      },
    },
    error: {
      iconTheme: {
        primary: "#DC2626",
        secondary: "#FFF",
      },
    },
  }}
/>
     </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
