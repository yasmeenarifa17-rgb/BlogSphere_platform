import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const { user, logout } =
    useContext(AuthContext);

  // USER NOTIFICATIONS

  const userNotifications =
  user
    ? JSON.parse(
        localStorage.getItem(
          `notifications_${user.email}`
        )
      ) || []
    : [];

  

  const unreadCount =
    userNotifications.filter(
      (item) => !item.read
    ).length;

  return (

    <nav className="
      sticky
      top-0
      z-50
      bg-white/75
      backdrop-blur-xl
      border-b
      border-pink-100
      shadow-[0_8px_35px_rgba(236,72,153,0.06)]
    ">

      <div className="
        max-w-7xl
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
            gap-3
            group
          "
        >

          <div className="
            w-11
            h-11
            rounded-2xl
            bg-linear-to-r
            from-pink-500
            to-violet-500
            flex
            items-center
            justify-center
            text-white
            text-lg
            shadow-[0_0_30px_rgba(236,72,153,0.30)]
            group-hover:scale-105
            transition
          ">
            ✦
          </div>

          <div>

            <h1 className="
              text-3xl
              font-black
              text-gray-800
              leading-none
            ">
              BlogSphere
            </h1>

            <p className="
              text-xs
              text-gray-400
              mt-1
            ">
              Modern Creator Platform
            </p>

          </div>

        </Link>

        {/* NAVIGATION */}

        <div className="
          flex
          items-center
          gap-7
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

          <Link
  to="/about"
  className="
    hover:text-pink-500
    transition
  "
>
  About
</Link>

          {/* WRITE */}

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

          {/* ADMIN */}

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

          {user && (

  <Link
    to={`/profile/${user.email.split("@")[0]}`}
    className="
      hover:text-violet-500
      transition
    "
  >
    Profile
  </Link>

)}

{user && (

  <Link
    to="/bookmarks"
    className="
      hover:text-yellow-500
      transition
    "
  >
    Bookmarks
  </Link>

)}

{/* NOTIFICATIONS */}

          {user && (

            <Link
              to="/notifications"
              className="
                relative
                hover:text-yellow-500
                transition
              "
            >

              🔔 Notifications

              {unreadCount > 0 && (

                <span className="
                  absolute
                  -top-3
                  -right-4
                  bg-pink-500
                  text-white
                  text-[10px]
                  font-bold
                  px-2
                  py-1
                  rounded-full
                  shadow-[0_0_20px_rgba(236,72,153,0.35)]
                ">

                  {unreadCount}

                </span>

              )}

            </Link>

          )}

          {/* AUTH */}

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

              {/* USER PROFILE */}

              <div className="
                hidden
                md:flex
                items-center
                gap-3
                bg-[#fafafa]
                px-4
                py-2
                rounded-full
                border
                border-pink-100
              ">

                <div className="
                  w-9
                  h-9
                  rounded-full
                  bg-linear-to-r
                  from-pink-500
                  to-violet-500
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold
                  text-sm
                ">

                  {user.email.charAt(0).toUpperCase()}

                </div>

                <span className="
                  text-sm
                  text-gray-600
                  max-w-40
                  truncate
                ">

                  {user.email}

                </span>

              </div>

              {/* LOGOUT */}

              <button
                onClick={logout}
                className="
                  bg-red-50
                  hover:bg-red-100
                  text-red-500
                  px-4
                  py-2
                  rounded-full
                  transition
                  font-semibold
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