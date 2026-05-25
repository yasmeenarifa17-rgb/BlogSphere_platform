import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const { user, logout } =
    useContext(AuthContext);

  return (
    <nav className="
      sticky
      top-0
      z-50
      bg-white/70
      backdrop-blur-lg
      border-b
      border-gray-100
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-6
        py-5
        flex
        items-center
        justify-between
      ">

        {/* LOGO */}

        <Link
          to="/"
          className="
            flex
            items-center
            gap-2
            group
          "
        >

          <span
            className="
              text-3xl
              font-bold
              text-pink-500
              transition
              duration-300
              group-hover:scale-105
            "
          >
            BlogSphere
          </span>

          {/* STICKMAN */}

          <span
            className="
              text-xl
              animate-bounce
              select-none
            "
          >
            🧍‍♂️
          </span>

        </Link>

        {/* NAV LINKS */}

        <div className="
          flex
          items-center
          gap-8
          text-gray-700
          font-medium
        ">

          <Link
            to="/"
            className="
              hover:text-pink-500
              transition
            "
          >
            Home
          </Link>

          {user && (

            <Link
              to="/create"
              className="
                hover:text-cyan-500
                transition
              "
            >
              Write
            </Link>

          )}

          {/* ADMIN LINK */}

          {user?.role === "admin" && (

            <Link
              to="/admin"
              className="
                hover:text-violet-500
                transition
              "
            >
              Admin
            </Link>

          )}

          {/* FUTURE NOTIFICATIONS */}

          {user && (
 
            <Link
              to="/notifications"
              className="
                hover:text-yellow-500
                transition
              "
            >
              Notifications
            </Link>

          )}

          {!user ? (

            <>

              <Link
                to="/login"
                className="
                  hover:text-pink-500
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  hover:text-cyan-500
                  transition
                "
              >
                Register
              </Link>

            </>

          ) : (

            <div className="
              flex
              items-center
              gap-5
            ">

              <span className="
                text-sm
                text-gray-500
              ">
                {user.email}
              </span>

              <button
                onClick={logout}
                className="
                  text-red-500
                  font-semibold
                  hover:scale-105
                  transition
                "
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;