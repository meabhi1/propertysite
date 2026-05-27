import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#fff",
          padding: "14px",
          borderRadius: "10px",
          fontSize: "14px",
        },
      }}
    />

    <App />

  </React.StrictMode>
);