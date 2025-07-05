import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "./../context/AppContext";

const ContactPage = () => {
  const { axios } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/public/contact-us", formData);
      if (res.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        "Failed to send message. Please check your internet or try later."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center text-sm text-slate-800 my-10"
    >
      <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">
        Contact Us
      </p>
      <h1 className={`text-4xl font-bold py-4 text-center text-gray-800`}>
        Let’s Get In Touch.
      </h1>
      <p className={`max-md:text-sm text-gray-500 pb-10 text-center`}>
        Or just reach out manually to us at{" "}
        <a
          href="mailto:hello@prebuiltui.com"
          className="text-indigo-600 hover:underline"
        >
          hello@prebuiltui.com
        </a>
      </p>

      <div className="max-w-96 w-full px-4 flex flex-col gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className={`font-medium text-gray-600`}>
            Full Name
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
                fill={`gray`}
              />
            </svg>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`h-full px-2 w-full outline-none bg-transparent text-gray-600`}
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={`font-medium text-gray-600`}>
            Email Address
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z"
                fill={`gray`}
              />
            </svg>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`h-full px-2 w-full outline-none bg-transparent text-gray-600`}
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={`font-medium text-gray-600`}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all text-gray-600`}
            placeholder="Enter your message"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition"
        >
          Submit Form
          <svg
            className="mt-0.5"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ContactPage;
