import React from "react";

export default function ComingSoon() {
  return (
    <div className=" flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Coming Soon
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This feature is under development and will be available soon. Stay tuned for updates!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            disabled
            className="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-6 py-2 rounded-lg cursor-not-allowed opacity-75"
          >
            Notify Me
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Expected Release: Q4 2025
        </p>
      </div>
    </div>
  );
}