import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { MdOutlineBorderColor } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { isAdmin, dispatch, navigate } = useContext(AppContext);

  const sidebarLinks = [
    { name: "Product List", path: "/admin", icon: <FaClipboardList /> },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: <IoIosAddCircleOutline />,
    },
    { name: "Orders", path: "/admin/orders", icon: <MdOutlineBorderColor /> },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8  py-3 shadow-md bg-gradient-to-r from-red-700 via-red-100 to-yellow-500 transition-all duration-300">
        <NavLink
          to="/"
          className="text-2xl font-bold text-white drop-shadow-sm cursor-pointer"
        >
          Grocery App
        </NavLink>

        <div className="flex items-center gap-5 text-white">
          <p>Hi! admin</p>
          <button
            onClick={() => {
              dispatch({ type: "SET_USER", payload: null }); // ✅ remove user
              dispatch({ type: "SET_ADMIN", payload: false }); // ✅ reset admin flag
              localStorage.removeItem("user"); // ✅ clear from localStorage (optional but recommended)
              navigate("/");
            }}
            className="rounded-full text-sm px-4 py-1 bg-primary hover:bg-hover cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex w-full">
        <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`}
            >
              {item.icon}
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="p-6 flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
