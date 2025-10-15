import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faHome,
  faKey,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../routes/profileApi";


export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChanging, isSuccess: pwChanged }] =
    useChangePasswordMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    await changePassword(passwordData);
    setPasswordData({ oldPassword: "", newPassword: "" });
  };

  if (isLoading)
    return (
      <div className="text-center text-gray-300 py-40">Loading profile...</div>
    );
  if (isError)
    return (
      <div className="text-center text-red-400 py-40">
        Error loading profile data.
      </div>
    );

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-blue-400 mb-10 text-center"
        >
          My Profile
        </motion.h1>

        {/* Profile Info Form */}
        <motion.form
          onSubmit={handleProfileSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-md mb-12"
        >
          <h2 className="text-2xl font-semibold text-blue-300 mb-6">
            Personal Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2">
                <FontAwesomeIcon icon={faUser} className="text-blue-400 mr-2" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-blue-400 mr-2"
                />
                Email
              </label>
              <input
                type="email"
                name="email"
                disabled
                value={formData.email}
                className="w-full bg-gray-700 text-gray-400 rounded-xl px-4 py-3 border border-gray-700 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 mb-2">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-blue-400 mr-2"
                />
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-300 mb-2">
                <FontAwesomeIcon icon={faHome} className="text-blue-400 mr-2" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl text-white font-medium shadow-md transition flex items-center justify-center mx-auto gap-2"
            >
              <FontAwesomeIcon icon={faSave} />
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.form>

        {/* Password Change Form */}
        <motion.form
          onSubmit={handlePasswordSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-md"
        >
          <h2 className="text-2xl font-semibold text-blue-300 mb-6">
            Change Password
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">
                <FontAwesomeIcon icon={faKey} className="text-blue-400 mr-2" />
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                <FontAwesomeIcon icon={faKey} className="text-blue-400 mr-2" />
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-3 border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={isChanging}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl text-white font-medium shadow-md transition flex items-center justify-center mx-auto gap-2"
            >
              {isChanging ? "Updating..." : "Change Password"}
            </button>
            {pwChanged && (
              <p className="text-green-400 mt-4">
                ✅ Password updated successfully!
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
}
