import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFileInvoice,
  faChartLine,
  faUsers,
  faFileAlt,
  faCogs,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";


// TODO:: Complete demo link


export default function HomePage() {
  const features = [
    {
      icon: faClock,
      title: "Smart Time Tracking",
      text: "Start and stop timers or log work manually with intuitive controls and instant syncing.",
    },
    {
      icon: faFileInvoice,
      title: "Instant Invoicing",
      text: "Generate professional invoices from your tracked time in one click — ready to send to clients.",
    },
    {
      icon: faChartLine,
      title: "Analytics & Insights",
      text: "See your earnings, project progress, and time distribution across clients and tasks.",
    },
    {
      icon: faUsers,
      title: "Client Management",
      text: "Organize clients and projects effortlessly, keeping all your work in one secure place.",
    },
    {
      icon: faFileAlt,
      title: "Beautiful Reports",
      text: "Export detailed time reports to share progress or keep accurate records for taxes.",
    },
    {
      icon: faCogs,
      title: "Seamless Integration",
      text: "Built with React, Node, and Prisma for performance, scalability, and reliability.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center px-6 py-28">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-blue-400 mb-6"
        >
          Track Time. Bill Smarter. Grow Your Freelance Business.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
        >
          A clean and intuitive time tracking and invoicing tool built for
          freelancers who want to focus on work — not spreadsheets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4"
        >
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl text-lg font-medium shadow-lg transition"
          >
            Get Started
          </a>
          <a
            href="/demo"
            className="border border-blue-400 hover:bg-blue-400/10 text-blue-300 px-8 py-3 rounded-2xl text-lg font-medium transition"
          >
            View Demo
          </a>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="bg-gray-900 border-t border-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-16">
            Everything You Need to Manage Freelance Work
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center shadow-md hover:shadow-blue-500/10 transition"
              >
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon
                    icon={f.icon}
                    className="text-blue-400 text-4xl"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-300">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Tracking Time Smarter Today
        </h2>
        <p className="text-gray-100 text-lg mb-8">
          Free to try. No credit card required.
        </p>
        <a
          href="/signup"
          className="bg-black hover:bg-gray-900 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition"
        >
          Create Your Account
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-10 text-sm border-t border-gray-800">
        <p>
          © {new Date().getFullYear()} Freelancer Time Tracker. Built with ❤️ by
          MG Works.
        </p>
      </footer>
    </div>
  );
}
