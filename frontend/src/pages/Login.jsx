import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import API from "../utils/api";

import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log(formData);

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // SUCCESS TOAST
      toast.success(
        "Login Successful"
      );

      navigate("/profile");

    } catch (error) {

      console.log(
        error.response?.data
      );

      // ERROR TOAST
      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div>

      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-xl w-[90%] md:w-[400px]"
        >

          <h1 className="text-3xl font-bold mb-8 text-center">
            Login
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-5"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-5"
            required
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-5"
          >

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>

        </form>

      </div>

      <Footer />

    </div>
  );
};

export default Login;