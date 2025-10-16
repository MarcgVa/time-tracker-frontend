import { motion } from "framer-motion";


export const StatCard = ({ title, value, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center shadow-lg"
    >
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <h3 className={`text-3xl font-bold ${color}`}>{value}</h3>
    </motion.div>
  );
}
