import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await login(email, password);

      navigate("/");

    } catch (err) {

      setError(err.message);
    }
  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#f7f7fb]
      px-6
    ">

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          w-full
          max-w-xl
          p-12
          rounded-[40px]
          border
          border-pink-100
          shadow-[0_0_40px_rgba(236,72,153,0.08)]
        "
      >

        <h1 className="
          text-6xl
          font-black
          text-gray-900
          mb-5
        ">
          Welcome Back
        </h1>

        <p className="
          text-gray-600
          text-lg
          mb-10
        ">
          Login to continue reading and publishing blogs.
        </p>

        {error && (

          <p className="
            mb-6
            text-red-500
            font-medium
          ">
            {error}
          </p>

        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            p-5
            rounded-3xl
            border
            border-pink-100
            mb-6
            outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            p-5
            rounded-3xl
            border
            border-pink-100
            mb-8
            outline-none
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-pink-500
            hover:bg-pink-600
            text-white
            py-5
            rounded-3xl
            font-bold
            text-xl
            transition
          "
        >
          Login
        </button>

        <p className="
          mt-8
          text-center
          text-gray-600
        ">
          Don’t have an account?
          {" "}

          <Link
            to="/register"
            className="
              text-pink-500
              font-bold
            "
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;