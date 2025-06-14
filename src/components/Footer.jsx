import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash } from 'react-icons/fi';

const Footer = ({ activeCount, completedCount, onClearCompleted, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className={`flex items-center justify-between pt-4 border-t ${
        theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
      }`}
    >
      <div className={`text-sm ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <span className="font-medium">{activeCount}</span> item{activeCount !== 1 ? 's' : ''} left
      </div>

      {completedCount > 0 && (
        <motion.button
          onClick={onClearCompleted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}
        >
          <FiTrash className="w-4 h-4" />
          Clear completed ({completedCount})
        </motion.button>
      )}
    </motion.div>
  );
};

export default Footer;