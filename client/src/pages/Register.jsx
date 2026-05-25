import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Register() {

  const navigate = useNavigate();

  const { register } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert("Passwords do not match");

      return;
    }

    const success = register(
      formData.email,
      formData.password
    );

    if (success) {

      alert("Registration Successful");

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
        border-cyan-100
        shadow-[0_0_50px_rgba(6,182,212,0.15)]
      ">

        <h1 className="
          text-5xl
          font-bold
          text-gray-800
          mb-3
        ">
          Create Account
        </h1>

        <p className="
          text-gray-500
          mb-10
        ">
          Join BlogSphere and start sharing your ideas.
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
              border-cyan-100
              outline-none
              focus:ring-2
              focus:ring-cyan-300
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
              border-cyan-100
              outline-none
              focus:ring-2
              focus:ring-cyan-300
            "
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-cyan-100
              outline-none
              focus:ring-2
              focus:ring-cyan-300
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-600
              transition
              text-white
              py-4
              rounded-2xl
              font-semibold
              shadow-[0_0_30px_rgba(6,182,212,0.35)]
            "
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;