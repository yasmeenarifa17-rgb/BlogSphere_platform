import "./styles/main.css";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/main.css";

import AuthProvider from "./context/AuthContext";
import BlogProvider from "./context/BlogContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AuthProvider>

      <BlogProvider>

        <App />

      </BlogProvider>

    </AuthProvider>

  </React.StrictMode>
);