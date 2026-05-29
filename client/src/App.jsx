import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import BlogDetails from "./pages/BlogDetails";
import Admin from "./pages/Admin";
import Notifications from "./pages/Notifications";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";

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

        <Route
          path="/about"
          element={<About />}
        />

<Route
  path="/profile/:username"
  element={<Profile />}
/>
        
        <Route
  path="/bookmarks"
  element={<Bookmarks />}
/>

      </Routes>

      <Footer />

    </BrowserRouter>

  );
}

export default App;