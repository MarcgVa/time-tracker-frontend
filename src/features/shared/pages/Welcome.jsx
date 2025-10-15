import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFolderOpen,
  faFileInvoiceDollar,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Welcome() {
  const user = useSelector((state) => state.auth.user); // Assuming auth slice stores user info

  const cards = [
    {
      title: "Start Tracking Time",
      icon: faClock,
      color: "text-blue-400",
      link: "/time-tracker",
    },
    {
      title: "View Your Projects",
      icon: faFolderOpen,
      color: "text-cyan-400",
      link: "/projects",
    },
    {
      title: "Manage Invoices",
      icon: faFileInvoiceDollar,
      color: "text-teal-400",
      link: "/invoices",
    },
    {
      title: "Edit Profile",
      icon: faUserCog,
      color: "text-indigo-400",
      link: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-400"
        >
          Welcome back{user?.name ? `, ${user.name}` : ""}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg mb-12"
        >
          Let’s make today productive — track time, manage projects, and stay
          organized.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <Link
                to={card.link}
                className="group block bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition duration-200"
              >
                <FontAwesomeIcon
                  icon={card.icon}
                  className={`text-4xl mb-4 ${card.color} group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {i === 0
                    ? "Start your next task with just one click."
                    : i === 1
                    ? "Review and organize your ongoing work."
                    : i === 2
                    ? "Create or view detailed invoices."
                    : "Update your personal details and preferences."}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>⏱️ Keep your focus. Track your time. Own your day.</p>
        </motion.div>
      </div>
    </div>
  );
}
