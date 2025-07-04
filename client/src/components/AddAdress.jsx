import { useState } from "react";
import Modal from "../UI/Modal";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddressForm = () => {
  const { dispatch, axios, user, userAddress } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAddress = {
        ...formData,
      };

      // Send to backend (optional)
      await axios.post(
        "/api/users/address/add",
        { address: newAddress },

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Address added!");

      dispatch({
        type: "SET_ADDRESS",
        payload: [...userAddress, newAddress],
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "India",
      });

      dispatch({ type: "SET_ADDRESS_MODAL", payload: false });
    } catch (error) {
      console.error("Error submitting Address:", error);
      toast.error("Failed to add Address.");
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="h-full">
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <p className="text-sm text-gray-700 mb-10">Add you Address</p>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-lg w-full"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-lg w-full"
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-lg w-full col-span-2"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-lg-lg w-full"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-lg w-full"
          />

          <input
            type="text"
            name="zip"
            placeholder="PIN / ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-lg w-full"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
        >
          Save Address
        </button>
      </form>
    </Modal>
  );
};

export default AddressForm;
