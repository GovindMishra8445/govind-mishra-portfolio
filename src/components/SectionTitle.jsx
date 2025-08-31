// components/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 relative inline-block">
        {title}
        <span className="absolute bottom-0 top-12 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-y-2"></span>
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-lg">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;