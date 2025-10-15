import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faCommentDots,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useSendMessageMutation } from "../features/Users/routes/contactApi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sendMessage, { isLoading, isSuccess, isError }] =
    useSendMessageMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-blue-400 mb-6"
        >
          Contact Us
        </motion.h1>
        <p className="text-gray-300 mb-10 text-lg">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-md"
        >
          {/* Name */}
          <div className="mb-6 text-left">
            <label className="block text-gray-300 mb-2" htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="text-blue-400 mr-2" />
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-6 text-left">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-blue-400 mr-2"
              />
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div className="mb-6 text-left">
            <label className="block text-gray-300 mb-2" htmlFor="message">
              <FontAwesomeIcon
                icon={faCommentDots}
                className="text-blue-400 mr-2"
              />
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-medium transition flex items-center justify-center mx-auto gap-2"
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {isSuccess && (
            <p className="text-green-400 mt-6">
              ✅ Your message has been sent successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-400 mt-6">
              ❌ Something went wrong. Please try again later.
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
