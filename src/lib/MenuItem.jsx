import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react"; // Updated to lucide-react

function MenuItem({
  item,
  isActive,
  onItemClick,
  isExpanded,
  onToggleExpand,
  projectCount,
  collapsed,
}) {
  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  if (hasSubItems) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => onToggleExpand(item.name)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon size={18} />
            <span
              className={`transition-all duration-300 ease-in-out ${
                collapsed
                  ? "opacity-0 scale-95 -translate-x-2 w-0 overflow-hidden"
                  : "opacity-100 scale-100 translate-x-0"
              }`}
            >
              {item.name}
            </span>
          </div>
          {!collapsed && (
            <div className="flex items-center gap-2">
              {item.name === "Projects" && projectCount > 0 && (
                <span
                  className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  }`}
                >
                  {projectCount}
                </span>
              )}
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          )}
        </button>

        {isExpanded && !collapsed && (
          <div className="ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
            {item.subItems.map((subItem) => {
              const SubIcon = subItem.icon;
              return (
                <Link
                  key={subItem.to}
                  to={subItem.to}
                  onClick={onItemClick}
                  className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  {SubIcon && <SubIcon size={16} />}
                  <span
                    className={`transition-all duration-300 ease-in-out ${
                      collapsed
                        ? "opacity-0 scale-95 -translate-x-2 w-0 overflow-hidden"
                        : "opacity-100 scale-100 translate-x-0"
                    }`}
                  >
                    {subItem.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.to}
      onClick={onItemClick}
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transform scale-[1.02]"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:transform hover:scale-[1.01]"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span
          className={`transition-all duration-300 ease-in-out ${
            collapsed
              ? "opacity-0 scale-95 -translate-x-2 w-0 overflow-hidden"
              : "opacity-100 scale-100 translate-x-0"
          }`}
        >
          {item.name}
        </span>
      </div>
      {!collapsed && item.badge && (
        <span
          className={`px-2 py-0.5 text-xs rounded-full font-medium transition-colors duration-200 ${
            isActive
              ? "bg-white/20 text-white"
              : item.badge === "New"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export default MenuItem;