import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";
import { PiSmileySadLight } from "react-icons/pi";
import AddressForm from "../components/AddAdress";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItem,
    products,
    addToCart,
    removeFromCart,
    deleteCart,
    updateToCart,
    dispatch,
    showModal,
    totalAmount,
    user,
    loginMode,
    addressModal,
    userAddress,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const list = products
      .filter((item) => cartItem[item._id])
      .map((item) => ({
        ...item,
        quantity: cartItem[item._id],
      }));
    setProductList(list);
  }, [products, cartItem]);

  return (
    <div className="flex flex-col py-11 max-w-6xl w-full px-6 mx-auto">
      <h2 className={`text-2xl md:text-3xl font-medium text-gray-800`}>
        Shopping Cart
      </h2>

      {productList.length > 0 ? (
        <>
          {" "}
          <div className=" mt-10 flex-1 w-full">
            {/* Items Heading */}
            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-600 text-xl font-medium pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {productList.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex md:gap-6 gap-3">
                  {/* Product Image */}
                  <div
                    onClick={() =>
                      navigate(
                        `/products/${product.productCategory}/${product._id}`
                      )
                    }
                    className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-700 bg-white rounded"
                  >
                    <img
                      className="max-w-full h-full object-cover"
                      src={product.productImage[0]}
                      alt={product.productName}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-3">
                    <p className="text-gray-500 block font-semibold">
                      {product.productName}
                    </p>
                    <div className="font-normal text-gray-500">
                      {product.size && (
                        <p>
                          Size: <span>{product.size || "N/A"}</span>
                        </p>
                      )}
                      {product.weight && (
                        <p>
                          Weight: <span>{product.weight || "N/A"}</span>
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-gray-500">
                        {/* - Button */}
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="px-2 border rounded bg-gray-200 hover:bg-gray-300"
                        >
                          -
                        </button>

                        {/* Quantity Select Dropdown */}
                        <select
                          value={product.quantity}
                          onChange={(e) =>
                            updateToCart(product._id, parseInt(e.target.value))
                          }
                          className="px-2 py-0.5 border rounded text-gray-400"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>

                        {/* + Button */}
                        <button
                          onClick={() => addToCart(product._id)}
                          className="px-2 border rounded bg-gray-200 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Price */}
                <p className="flex justify-center items-start text-gray-500">
                  ${product.productOfferPrice * product.quantity}
                </p>

                {/* Product Action */}
                <div className="flex flex-col items-center justify-center gap-3">
                  {/* Remove Button */}
                  <button
                    onClick={() => deleteCart(product._id)}
                    className="cursor-pointer mx-auto"
                  >
                    <CiCircleRemove className="text-primary" size={30} />
                  </button>
                </div>
              </div>
            ))}

            {/* Continue Shopping Button */}
            <button
              onClick={() => {
                navigate("/products");
              }}
              className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
            >
              <FaArrowLeftLong />
              Continue Shopping
            </button>
          </div>
          {/* Checkout Section */}
          <div className="flex-1 w-full bg-gray-100 p-5 mt-16 border border-gray-300/70 px-10">
            <h2 className="text-xl md:text-2xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
              <div className="flex justify-between items-center h-20">
                <p className="text-md font-medium uppercase">
                  Delivery Address
                </p>
                <div className="relative flex flex-col justify-between items-start">
                  {userAddress?.length > 0 ? (
                    <div className="text-sm text-gray-700 mt-2 leading-6">
                      <p>{userAddress[0].fullName}</p>
                      <p>
                        {userAddress[0].street}, {userAddress[0].city},{" "}
                        {userAddress[0].state} - {userAddress[0].zip}
                      </p>
                      <p>{userAddress[0].country}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700 mt-2 leading-6">
                      No address found!
                    </p>
                  )}
                  <button
                    onClick={() =>
                      dispatch({ type: "SET_ADDRESS_MODAL", payload: true })
                    }
                    className="text-indigo-500 hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                  {addressModal && <AddressForm />}
                </div>
              </div>

              <p className="text-sm font-medium uppercase mt-6">
                Payment Method
              </p>

              <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Price</span>
                <span>${totalAmount}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span>${(totalAmount * 0.02).toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total Amount:</span>
                <span>${(totalAmount + totalAmount * 0.02).toFixed(2)}</span>
              </p>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  dispatch({ type: "TOGGLE_MODAL", payload: true });
                } else {
                  navigate("/my-orders");
                }
              }}
              className="w-full py-3 mt-6 cursor-pointer bg-yellow-600 text-white font-medium hover:bg-yellow-500 transition"
            >
              Place Order
            </button>
          </div>{" "}
        </>
      ) : (
        <div
          className={`w-full py-5 mt-10 rounded-lg flex flex-col items-center justify-center bg-gray-500`}
        >
          <PiSmileySadLight size={36} className={` text-gray-300"}`} />
          <p className={` text-gray-300"}`}>
            Sorry, there are no items in the cart!
          </p>
        </div>
      )}
      {showModal && (loginMode ? <LoginForm /> : <SignUpForm />)}
    </div>
  );
};

export default Cart;
