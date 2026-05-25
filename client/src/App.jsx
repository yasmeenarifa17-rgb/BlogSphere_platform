import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import BlogDetails from "./pages/BlogDetails";
import Admin from "./pages/Admin";
import Notifications from "./pages/Notifications";

import "./styles/main.css";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/create"
          element={<CreatePost />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;