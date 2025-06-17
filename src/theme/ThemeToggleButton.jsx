// ThemeToggleButton.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // adjust the path

const ThemeToggleButton = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
