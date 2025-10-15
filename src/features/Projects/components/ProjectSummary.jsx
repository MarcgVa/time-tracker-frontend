import React from "react";
import { motion } from "framer-motion";

export const ProjectSummary = () => {
  return (
    <section className="bg-gray-900 border-t border-gray-800 py-5">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 p-5">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-blue-500/10 transition text-gray-400 text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Projects</h3>
          <p className="text-2xl">10</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-blue-500/10 transition text-gray-400 text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Active Projects</h3>
          <p className="text-2xl">7</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-blue-500/10 transition text-gray-400 text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Completed Projects</h3>
          <p className="text-2xl">3</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-blue-500/10 transition text-gray-400 text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Hours Logged</h3>
          <p className="text-2xl">120 hrs</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-blue-500/10 transition text-gray-400 text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Total Earnings</h3>
          <p className="text-2xl">$15,000</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-blue-500/10 transition text-gray-400 text-center"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Average Hourly Rate</h3>
          <p className="text-2xl">$125/hr</p>
        </motion.div>
      </div>
    </section>
  );
};
