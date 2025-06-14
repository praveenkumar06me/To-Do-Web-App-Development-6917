import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEdit3, FiCheck, FiX } from 'react-icons/fi';

const TaskItem = ({ task, onToggle, onDelete, onEdit, theme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleEdit = () => {
    if (editValue.trim() && editValue !== task.text) {
      onEdit(editValue);
    }
    setIsEditing(false);
    setEditValue(task.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(task.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
        task.completed
          ? theme === 'dark'
            ? 'bg-gray-700/50 border-gray-600 opacity-75'
            : 'bg-gray-50 border-gray-200 opacity-75'
          : theme === 'dark'
            ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {/* Checkbox */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : theme === 'dark'
              ? 'border-gray-500 hover:border-green-400'
              : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <FiCheck className="w-4 h-4" />
          </motion.div>
        )}
      </motion.button>

      {/* Task Text */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleEdit}
            autoFocus
            className={`w-full bg-transparent border-none outline-none text-base ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            maxLength={200}
          />
        ) : (
          <p
            onDoubleClick={() => !task.completed && setIsEditing(true)}
            className={`text-base cursor-pointer transition-all duration-300 ${
              task.completed
                ? 'line-through'
                : ''
            } ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {task.text}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isEditing ? (
          <>
            <motion.button
              onClick={handleEdit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <FiCheck className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={handleCancel}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-600 text-white hover:bg-gray-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <FiX className="w-4 h-4" />
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={task.completed}
              className={`p-2 rounded-lg transition-colors ${
                task.completed
                  ? 'opacity-50 cursor-not-allowed'
                  : theme === 'dark'
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiEdit3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={onDelete}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TaskItem;