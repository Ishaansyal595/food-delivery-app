import { createContext, useEffect, useReducer } from "react";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext(null);

// Reducer to manage global app state
const reducerHandler = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ADMIN":
      return { ...state, isAdmin: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_LOGIN_MODE":
      return { ...state, loginMode: action.payload };
    case "SET_ADDRESS_MODAL":
      return { ...state, addressModal: action.payload };
    case "SET_ADDRESS":
      return { ...state, userAddress: action.payload };
    case "SET_CATEGORY_MODAL":
      return { ...state, categoryModal: action.payload };
    case "SET_PRODUCT":
      return { ...state, products: action.payload };
    case "SET_CATEGORY":
      return { ...state, categories: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_CART":
      return { ...state, cartItem: action.payload };
    case "SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const initialValue = {
    user: localUser || null,
    isAdmin: localUser?.role === "admin",
    showModal: false,
    loginMode: true,
    products: [],
    userAddress: [],
    categories: [],
    mode: true,
    cartItem: JSON.parse(localStorage.getItem("cartItem")) || {},
    searchQuery: "",
    addressModal: false,
    categoryModal: false,
  };

  const [state, dispatch] = useReducer(reducerHandler, initialValue);
  const { cartItem } = state;
  const { userAddress } = state;

  // Axios config
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  //
  //
  //
  //
  // 🔄 Sync frontend cart object to backend
  const syncCartToBackend = async (cartObj) => {
    const cartArray = Object.entries(cartObj).map(([productId, quantity]) => ({
      product: productId,
      quantity,
    }));

    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser) return;

      await axios.post(`/api/users/cart/update-cart`, {
        cartItem: cartArray,
      });
    } catch (err) {
      console.error("Sync cart failed", err);
    }
  };

  //
  //
  //
  // 📦 Cart functions
  const addToCart = (itemId) => {
    const cartData = { ...cartItem };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    dispatch({ type: "SET_CART", payload: cartData });
    localStorage.setItem("cartItem", JSON.stringify(cartData));
    syncCartToBackend(cartData);
    toast.success("Added to Cart");
  };

  const removeFromCart = (itemId) => {
    const cartData = { ...cartItem };
    if (cartData[itemId] > 1) {
      cartData[itemId]--;
    } else {
      delete cartData[itemId];
      dispatch({ type: "SET_CART", payload: cartData });
    }
    dispatch({ type: "SET_CART", payload: cartData });

    localStorage.setItem("cartItem", JSON.stringify(cartData));
    syncCartToBackend(cartData);
    toast.success("Item Removed from Cart");
  };

  const updateToCart = (itemId, quantity) => {
    const cartData = { ...cartItem };
    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }
    dispatch({ type: "SET_CART", payload: cartData });
    localStorage.setItem("cartItem", JSON.stringify(cartData));
    syncCartToBackend(cartData);
    toast.success("Cart Updated");
  };

  const deleteCart = (itemId) => {
    const cartData = { ...cartItem };
    delete cartData[itemId];
    if (Object.keys(cartData).length === 0) {
      localStorage.removeItem("cartItem");
    } else {
      localStorage.setItem("cartItem", JSON.stringify(cartData));
    }

    syncCartToBackend(cartData);
    toast.success("Item Removed from Cart");
  };

  const cartCount = () => {
    if (!cartItem || typeof cartItem !== "object") return 0;

    return Object.values(cartItem)
      .map((qty) => Number(qty))
      .filter((qty) => Number.isFinite(qty) && qty > 0)
      .reduce((acc, qty) => acc + qty, 0);
  };

  const totalAmount = Object.entries(cartItem).reduce((acc, [itemId, qty]) => {
    const product = state.products.find((p) => p._id === itemId);
    if (product) {
      acc += (product.productOfferPrice || 0) * qty;
    }
    return acc;
  }, 0);

  //
  //
  //
  //
  // 🔁 Fetch user
  const fetchUser = async () => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser?._id) return;

      const res = await axios.get(`/api/users/get-user/${localUser._id}`);
      const user = res.data.user;
      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_ADMIN", payload: user?.isAdmin || false });
    } catch (error) {
      console.error("Fetch user failed:", error);
    }
  };

  //
  //
  //
  //
  // 🔁 Fetch cart from backend
  const fetchCart = async () => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser?._id) return;

      const res = await axios.get(`/api/users/get-user/${localUser._id}`);
      const user = res.data.user;

      const formattedCart = {};
      user.cartItem.forEach((item) => {
        formattedCart[item.product] = item.quantity;
      });

      dispatch({ type: "SET_CART", payload: formattedCart });
      localStorage.setItem("cartItem", JSON.stringify(formattedCart));
    } catch (error) {
      console.error("Fetch cart items failed:", error);
    }
  };

  //
  //
  //
  //
  // Fetch Address
  const fetchAddress = async () => {
    const res = await axios.get("/api/users/address/get");
    dispatch({ type: "SET_ADDRESS", payload: res.data.address });
  };

  //
  //
  //
  // Initial load
  useEffect(() => {
    fetchUser();
    fetchCart();
    fetchAddress();
  }, []);

  //
  //
  //
  //
  // Re-fetch cart when user logs in/changes
  useEffect(() => {
    if (state.user?._id) {
      fetchCart();
      fetchAddress()
    }
  }, [state.user]);

  //
  //
  //
  //
  // Remove cart from localStorage if it's empty
  useEffect(() => {
    if (Object.keys(cartItem).length === 0) {
      localStorage.removeItem("cartItem");
    }
  }, [cartItem]);

  //
  //
  //
  //
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/users/products");
        dispatch({ type: "SET_PRODUCT", payload: res.data.products });
      } catch (err) {
        console.warn("API failed. Loading dummy products.");
        dispatch({ type: "SET_PRODUCT", payload: dummyProducts });
      }
    };

    fetchProducts();
  }, []);

  //
  //
  //
  //
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/users/category/get-categories");
        dispatch({ type: "SET_CATEGORY", payload: res.data.categories });
      } catch (err) {
        console.warn("API failed. Loading dummy products.");
      }
    };

    fetchCategories();
  }, []);

  //
  //
  //
  //
  const value = {
    ...state,
    dispatch,
    addToCart,
    updateToCart,
    removeFromCart,
    cartCount,
    totalAmount,
    deleteCart,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
