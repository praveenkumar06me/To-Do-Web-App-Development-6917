import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'taskflow-todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('taskflow-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim()) {
      const newTask = {
        id: uuidv4(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    if (newText.trim()) {
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, text: newText.trim() } : task
        )
      );
    }
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('taskflow-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Header theme={theme} onToggleTheme={toggleTheme} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`rounded-2xl shadow-xl p-6 backdrop-blur-sm ${
              theme === 'dark'
                ? 'bg-gray-800/80 border border-gray-700'
                : 'bg-white/80 border border-white/20'
            }`}
          >
            <TaskInput onAddTask={addTask} theme={theme} />
            
            <FilterBar 
              filter={filter} 
              onFilterChange={setFilter}
              theme={theme}
              taskCounts={{
                all: tasks.length,
                active: activeTasks.length,
                completed: completedTasks.length
              }}
            />
            
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              theme={theme}
            />
            
            {tasks.length > 0 && (
              <Footer
                activeCount={activeTasks.length}
                completedCount={completedTasks.length}
                onClearCompleted={clearCompleted}
                theme={theme}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;