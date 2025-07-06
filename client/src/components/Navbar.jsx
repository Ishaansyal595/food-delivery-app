import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { assets } from "./../assets/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { user, dispatch, cartCount, searchQuery } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate(`/products`);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_CART", payload: {} });
    dispatch({ type: "SET_ADMIN", payload: false });
    localStorage.removeItem("user");
    localStorage.removeItem("cartItem");
    navigate("/");
  };

  return (
    <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-20 py-4 shadow-md bg-gradient-to-r from-red-700 via-red-100 to-yellow-500 transition-all z-20 w-full">
      <NavLink to="/" className="text-2xl font-bold text-white drop-shadow-sm">
        Grocery App
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 text-gray-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:border-t-2 hover:border-b-2 hover:border-hover ${
              isActive ? "text-hover" : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `hover:border-t-2 hover:border-b-2 hover:border-hover ${
              isActive ? "text-hover" : ""
            }`
          }
        >
          All Products
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border bg-white border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            onChange={(e) =>
              dispatch({ type: "SEARCH_QUERY", payload: e.target.value })
            }
          />
          <CiSearch size={20} />
        </div>

        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="relative cursor-pointer"
        >
          <IoCartOutline size={25} className="text-white" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#bd1e18] w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>

        {user ? (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="h-10 w-10" />
            <ul className="hidden group-hover:block absolute top-10 -right-10 w-40 bg-white rounded-md p-4 shadow-md z-50">
              <li className="cursor-pointer">Profile</li>
              <li
                onClick={() => {
                  navigate("/my-orders");
                }}
                className="cursor-pointer"
              >
                My Orders
              </li>
              <li onClick={handleLogout} className="cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              dispatch({ type: "TOGGLE_MODAL", payload: true });
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-hover transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Hamburger Icon */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>

        {/* Mobile Search Input Toggle */}
        {!showMobileSearch ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowMobileSearch(true)}
          >
            <CiSearch className="text-black" size={20} />
          </div>
        ) : (
          <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-full w-full">
            <input
              type="text"
              placeholder="Search products"
              className="py-1.5 w-full outline-none placeholder-gray-500"
              autoFocus
              onChange={(e) =>
                dispatch({ type: "SEARCH_QUERY", payload: e.target.value })
              }
            />
            <button onClick={() => setShowMobileSearch(false)}>❌</button>
          </div>
        )}

        
        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="relative cursor-pointer"
        >
          <IoCartOutline size={25} className="text-white" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#bd1e18] w-[18px] h-[18px] rounded-full">
            {cartCount()}
          </button>
        </div>


        {user ? (
          <>
            <button onClick={() => navigate("/my-orders")}>My Orders</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button
            onClick={() => {
              dispatch({ type: "TOGGLE_MODAL", payload: true });
            }}
            className="cursor-pointer px-8 py-2 bg-[#bd1e18] hover:bg-[#920e04] transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
