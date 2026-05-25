import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const success = login(
      formData.email,
      formData.password
    );

    if (success) {

      alert("Login Successful");

      navigate("/");
    }
  };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#f7f7fb]
      px-5
    ">

      <div className="
        w-full
        max-w-md
        bg-white
        p-10
        rounded-[35px]
        border
        border-pink-100
        shadow-[0_0_50px_rgba(236,72,153,0.15)]
      ">

        <h1 className="
          text-5xl
          font-bold
          text-gray-800
          mb-3
        ">
          Welcome Back
        </h1>

        <p className="
          text-gray-500
          mb-10
        ">
          Login to continue reading and publishing blogs.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-pink-100
              outline-none
              focus:ring-2
              focus:ring-pink-300
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-pink-100
              outline-none
              focus:ring-2
              focus:ring-pink-300
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-pink-500
              hover:bg-pink-600
              transition
              text-white
              py-4
              rounded-2xl
              font-semibold
              shadow-[0_0_30px_rgba(236,72,153,0.35)]
            "
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;