import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
// user
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import ProductsCategoryDetails from "./pages/ProductsCategoryDetails";
import PageNotFound from "./pages/PageNotFound";
import ContactPage from "./pages/ContactPage";

// admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProductList from "./pages/admin/AdminProductList";

// Components
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/seller/ProtectedRoutes";
// import AdminLogin from "./components/admin/AdminLogin";

// Context
import { AppContext } from "./context/AppContext";

const App = () => {
  const { pathname } = useLocation();
  const isAdminPath = pathname.includes("admin");

  const { showModal, loginMode, isAdmin } = useContext(AppContext);

  // className="px-4 md:px-16 lg:px-24 xl:px-32"

  return (
    <div>
      {isAdminPath ? null : <Navbar />}
      {showModal && (loginMode ? <LoginForm /> : <SignUpForm />)}
      <main className={`${isAdminPath ? "" : "md:px-30 "}`}>
        <Routes>
          {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:category"
            element={<ProductsCategoryDetails />}
          />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="*" element={<PageNotFound />} />

          {/* admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoutes isAllowed={isAdmin}>
                <AdminLayout />
              </ProtectedRoutes>
            }
          >
            {/* Index route (optional welcome/dashboard) */}
            <Route index element={<AdminProductList />} />

            {/* Nested paths */}
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
      {isAdminPath ? null : <Footer />}
    </div>
  );
};

export default App;
