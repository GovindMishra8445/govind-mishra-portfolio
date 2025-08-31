import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { X, ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import MenuItem from "../lib/MenuItem";
import { menuItems } from "../lib/utils/menuItems";

export default function Sidebar({
  open,
  setOpen,
  projectCount,
  setCollapsed,
  collapsed,
}) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const handleItemClick = () => setOpen(false);

  const handleToggleExpand = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen z-50 ${
          collapsed ? "w-20" : "w-72"
        } bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header - Fixed at Top */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div
              className={`transform transition-all duration-300 ease-in-out ${
                collapsed
                  ? "opacity-0 scale-95 -translate-x-2 w-0 overflow-hidden"
                  : "opacity-100 scale-100 translate-x-0"
              }`}
            >
              <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Management Dashboard
              </p>
            </div>
          </div>

          {/* Toggle buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {collapsed ? (
              <ArrowRightFromLine
                size={16}
                onClick={() => setCollapsed(false)}
                className="cursor-pointer text-gray-500 dark:text-gray-400"
              />
            ) : (
              <ArrowLeftFromLine
                size={20}
                onClick={() => setCollapsed(true)}
                className="cursor-pointer text-gray-500 dark:text-gray-400"
              />
            )}
          </div>

          {/* Mobile close */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Middle - Scrollable with Custom Scrollbar */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gradient-from-blue-500 scrollbar-thumb-gradient-to-purple-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.subItems &&
                item.subItems.some((sub) => location.pathname === sub.to));

            return (
              <MenuItem
                key={item.name}
                item={item}
                isActive={isActive}
                onItemClick={handleItemClick}
                isExpanded={expandedItems[item.name]}
                onToggleExpand={handleToggleExpand}
                projectCount={item.name === "Projects" ? projectCount : null}
                collapsed={collapsed}
              />
            );
          })}
        </nav>

        {/* Footer - Fixed at Bottom */}
        {/* <div className="sticky bottom-0 z-10 flex-shrink-0 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">GM</span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out transform ${
                collapsed
                  ? "opacity-0 scale-95 -translate-x-2 w-0 overflow-hidden"
                  : "opacity-100 scale-100 translate-x-0"
              }`}
            >
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Govind Mishra
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </div>
            </div>
          </div>
          <div
            className={`text-xs text-gray-500 dark:text-gray-400 text-center transition-all duration-300 ease-in-out ${
              collapsed
                ? "opacity-0 scale-95 -translate-x-2 w-0 overflow-hidden"
                : "opacity-100 scale-100 translate-x-0"
            }`}
          >
            © {new Date().getFullYear()} My Portfolio. All rights reserved.
          </div>
        </div> */}
      </aside>
    </>
  );
}
