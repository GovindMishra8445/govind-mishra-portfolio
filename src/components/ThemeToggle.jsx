import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react"; // Icons from Lucide

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg hover:scale-110 transition">
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;