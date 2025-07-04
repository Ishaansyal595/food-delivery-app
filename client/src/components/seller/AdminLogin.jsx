import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";

const SellerLogin = () => {
  const { isSeller, navigate, dispatch } = useContext(AppContext);

  // Track email and password inputs
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Update state when input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle login logic here
    dispatch({type: "SET_SELLER", payload: true})
  };

  return (
    !isSeller && (
      <div
        className="flex items-center justify-center bg-white w-full"
        style={{ height: "100vh" }}
      >
        <div className="my-10 flex flex-col items-center bg-white justify-center rounded-lg p-10">
          <form
            onSubmit={handleSubmit}
            className="md:w-96 w-80 flex flex-col items-center justify-center"
          >
            <h2 className="text-3xl text-gray-900 font-medium">
              Seller's Sign-in
            </h2>
            <p className="text-sm mb-5 text-gray-500/90 mt-3">
              Welcome back! Please sign in to continue
            </p>

            {/* Email Input */}
            <div className="flex items-center w-full border border-gray-600/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <TfiEmail className="text-gray-700/80" />
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent text-gray-600/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center mt-6 w-full border border-gray-600/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
              <a className="text-sm underline" href="#">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-3 w-full h-8 rounded-full text-white bg-[#bb403b] hover:bg-[#920e04] transition-opacity"
            >
              Login
            </button>

            {/* Link to Sign Up */}
          </form>
        </div>
      </div>
    )
  );
};

export default SellerLogin;
