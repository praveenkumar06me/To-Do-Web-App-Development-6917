import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiCheckSquare } from 'react-icons/fi';

const Header = ({ theme, onToggleTheme }) => {
  return (
    <motion.header 
      className="text-center space-y-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center space-x-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`p-3 rounded-full ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
              : 'bg-gradient-to-r from-blue-600 to-purple-700'
          }`}
        >
          <FiCheckSquare className="w-8 h-8 text-white" />
        </motion.div>
        
        <div>
          <h1 className={`text-4xl font-bold bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-blue-400 to-purple-400'
              : 'from-blue-600 to-purple-600'
          } bg-clip-text text-transparent`}>
            TaskFlow
          </h1>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Organize your life, one task at a time
          </p>
        </div>
      </div>

      <motion.button
        onClick={onToggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-3 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <FiSun className="w-5 h-5" />
        ) : (
          <FiMoon className="w-5 h-5" />
        )}
      </motion.button>
    </motion.header>
  );
};

export default Header;