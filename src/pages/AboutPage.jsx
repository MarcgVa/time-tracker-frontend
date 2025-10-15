import React from 'react'

export default function AboutPage() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
          About Freelancer Time Tracker
        </h1>
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          Freelancer Time Tracker was built to help independent developers,
          designers, and freelancers simplify their workflow. Tired of
          spreadsheets and manual time entries, our team designed a platform
          that makes time tracking, invoicing, and reporting effortless — all in
          one intuitive interface.
        </p>
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          Our mission is to empower freelancers to focus more on what they love:
          delivering quality work. We handle the details — from precise time
          logs to clean, professional invoices.
        </p>
        <p className="text-gray-400 italic text-center">
          "Less admin. More creation."
        </p>
      </div>
    </div>
  );
}
