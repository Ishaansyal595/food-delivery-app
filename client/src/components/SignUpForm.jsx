import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CiPhone, CiUser } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../UI/Modal";

const SignUpForm = () => {
  const { dispatch, navigate, loginMode } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/sign-up",
        form
      );

      dispatch({ type: "SET_USER", payload: res.data.user });
      toast.success("User Registered Successfully");

      dispatch({ type: "TOGGLE_LOGIN_MODAL" }); // ✅ close modal after success
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Modal>
      <div className="flex items-center mt-10 w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="md:w-96 w-80 flex flex-col items-center justify-center"
          >
            <h2 className="text-3xl text-gray-900 font-medium">Sign Up</h2>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <CiUser />
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <CiPhone className="text-gray-700/80" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <TfiEmail className="text-gray-700/80" />
              <input
                type="text"
                name="email"
                placeholder="Email id"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <RiLockPasswordFill className="text-gray-700/80" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full h-8 rounded-full text-white bg-[#bb403b] hover:bg-[#920e04] transition-opacity"
            >
              Sign Up
            </button>
            <p className="text-gray-500/90 text-sm mt-4">
              Already have an account?{" "}
              <Link
                onClick={() =>
                  dispatch({ type: "SET_LOGIN_MODE", payload: true })
                }
                className="text-indigo-400 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpForm;
