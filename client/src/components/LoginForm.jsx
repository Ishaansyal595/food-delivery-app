import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../UI/Modal";

const LoginForm = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/users/sign-in", form);

      if (res.status === 200 && res.data.success && res.data.user) {
        const loggedInUser = res.data.user;

        dispatch({ type: "SET_USER", payload: loggedInUser });
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        if (loggedInUser.role === "admin") {
          dispatch({ type: "SET_ADMIN", payload: true });
          navigate("/admin");
        } else {
          navigate("/");
        }

        toast.success("Login Successful");
        dispatch({ type: "TOGGLE_MODAL", payload: false });
      } else {
        toast.error("Unexpected login response");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
            <h2 className="text-3xl text-gray-900 font-medium">Sign in</h2>
            <p className="text-sm text-gray-500/90 mt-3">
              Welcome back! Please sign in to continue
            </p>

            {/* Google Button (Disabled for now) */}
            <button
              type="button"
              disabled
              title="Google sign-in coming soon"
              className="w-full mt-3 bg-gray-500/10 flex items-center justify-center h-8 gap-2 rounded-full cursor-not-allowed opacity-60"
            >
              <FcGoogle />
              <span className="text-sm text-gray-600">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full my-3">
              <div className="w-full h-px bg-gray-300/90" />
              <p className="w-full text-nowrap text-sm text-gray-500/90">
                or sign in with email
              </p>
              <div className="w-full h-px bg-gray-300/90" />
            </div>

            {/* Email Input */}
            <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <TfiEmail className="text-gray-700/80" />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <RiLockPasswordFill className="text-gray-700/80" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="w-full flex items-center justify-between mt-3 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input className="h-5" type="checkbox" id="checkbox" />
                <label className="text-sm" htmlFor="checkbox">
                  Remember me
                </label>
              </div>
              <a className="text-sm underline" href="#">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full h-8 rounded-full text-white bg-[#bb403b] hover:bg-[#920e04] transition-opacity disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Link to Sign Up */}
            <p className="text-gray-500/90 text-sm mt-4">
              Don’t have an account?{" "}
              <Link
                onClick={() =>
                  dispatch({ type: "SET_LOGIN_MODE", payload: false })
                }
                className="text-indigo-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginForm;
