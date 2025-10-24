import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFolderOpen,
  faFileInvoiceDollar,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetDashboardStatsQuery } from "../routes/dashboardApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { StatCard } from "../components/StatCard"


export default function DashboardPage() {
  //const user = useSelector((state) => state.auth.user) 
  const user = JSON.parse(window.sessionStorage.getItem('user'));
  const { data, isLoading } = useGetDashboardStatsQuery();

  const cards = [
    {
      title: "Start Tracking Time",
      icon: faClock,
      color: "text-blue-400",
      link: "/time-tracker",
    },
    {
      title: "View Projects",
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
    <div className="w-full h-full mt-2">
      <div className="flex grow flex-col w-full h-full gap-y-2 overflow-y-auto  px-4 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0">
        <div className="mx-auto pl-2">
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-3 text-blue-400"
          >
            Welcome {user?.name ? `, ${user.name}` : ""}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-6"
          >
            Here’s a quick look at your week.
          </motion.p>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {isLoading ? (
              <p className="col-span-3 text-gray-500">Loading your data...</p>
            ) : (
              <>
                <StatCard
                  title="Time Tracked"
                  value={`${data?.totalHours ?? 0}`}
                  color="text-blue-400"
                />
                <StatCard
                  title="Active Projects"
                  value={data?.activeProjects ?? 0}
                  color="text-cyan-400"
                />
                <StatCard
                  title="Upcoming Invoices"
                  value={`$${data?.upcomingInvoices ?? 0}`}
                  color="text-teal-400"
                />
              </>
            )}
          </div>

          {/* Time Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md p-3 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">
              Weekly Time Overview
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data?.weeklyData ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #1f2937",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  to={card.link}
                  className="group block bg-gray-900 border border-gray-800 rounded-2xl p-3 hover:shadow-blue-500/20 transition-all"
                >
                  <FontAwesomeIcon
                    icon={card.icon}
                    className={`text-4xl mb-3 ${card.color} group-hover:scale-110 transition-transform`}
                  />
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-400">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {i === 0
                      ? "Start your next task with one click."
                      : i === 1
                      ? "Organize and manage your work."
                      : i === 2
                      ? "Review upcoming invoices."
                      : "Update your personal info."}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            className="mt-10 mb-1 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p>⏱️ Stay on top of your time. Build better habits.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


