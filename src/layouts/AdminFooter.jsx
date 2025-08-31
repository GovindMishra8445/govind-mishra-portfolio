import React from "react";
export default function AdminFooter(){
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 text-sm text-center">
      Admin • Manage content • {new Date().getFullYear()}
    </footer>
  );
}
    