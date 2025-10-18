import React from "react";

export default function HelpPage() {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
          Help & Support
        </h1>

        <p className="text-gray-300 mb-4 text-lg">
          Need assistance? We're here to help you get the most out of your
          Freelancer Time Tracker account.
        </p>

        <ul className="text-gray-400 space-y-4 list-disc list-inside mb-10">
          <li>
            <strong>Getting Started:</strong> Check out our step-by-step guide
            for setting up your first project and tracking time.
          </li>
          <li>
            <strong>Invoices:</strong> Learn how to generate and send invoices
            directly to clients.
          </li>
          <li>
            <strong>Reports:</strong> Discover insights on your productivity and
            income trends.
          </li>
        </ul>

        <p className="text-gray-300 mb-2">
          Still have questions? Contact us at{" "}
          <a
            href="mailto:support@mgworks.dev"
            className="text-blue-400 hover:underline"
          >
            support@mgworks.dev
          </a>
        </p>
        <p className="text-gray-500 text-sm">
          Our team usually responds within 24 hours.
        </p>
      </div>
    </div>
  );
}
