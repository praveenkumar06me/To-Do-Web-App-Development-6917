import React from 'react';
import { motion } from 'framer-motion';

const FilterBar = ({ filter, onFilterChange, theme, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All', count: taskCounts.all },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <motion.div
      className={`flex rounded-xl p-1 mb-6 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      {filters.map((filterOption) => (
        <motion.button
          key={filterOption.key}
          onClick={() => onFilterChange(filterOption.key)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 relative ${
            filter === filterOption.key
              ? theme === 'dark'
                ? 'bg-gray-600 text-white shadow-md'
                : 'bg-white text-gray-900 shadow-md'
              : theme === 'dark'
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {filterOption.label}
            <span className={`text-xs px-2 py-1 rounded-full ${
              filter === filterOption.key
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                  ? 'bg-gray-600 text-gray-300'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {filterOption.count}
            </span>
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FilterBar;