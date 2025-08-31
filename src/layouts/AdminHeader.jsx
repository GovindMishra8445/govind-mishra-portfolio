
// import React, { useState } from "react";
// import { FiMenu, FiSearch, FiBell, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";

// export default function AdminHeader({ setSidebarOpen }) {
//   const [user] = useAuthState(auth);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
//       {/* Left Section */}
//       <div className="flex items-center gap-4">
//         <button 
//           className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
//           onClick={() => setSidebarOpen(true)}
//         >
//           <FiMenu size={20} className="text-gray-600 dark:text-gray-300" />
//         </button>
        
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-sm">A</span>
//           </div>
//           <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
//             Admin Dashboard
//           </h1>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Search Bar - Hidden on mobile */}
//         <div className="hidden md:flex items-center relative">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>
//         </div>

//         {/* Search Button - Mobile only */}
//         <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
//           <FiSearch size={18} className="text-gray-600 dark:text-gray-300" />
//         </button>

//         {/* Notifications */}
//         <div className="relative">
//           <button 
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
//             onClick={() => setShowNotifications(!showNotifications)}
//           >
//             <FiBell size={18} className="text-gray-600 dark:text-gray-300" />
//             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//               0
//             </span>
//           </button>
//         </div>

//         {/* Settings */}
//         <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
//           <FiSettings size={18} className="text-gray-600 dark:text-gray-300" />
//         </button>

//         {/* Profile Menu */}
//         <div className="relative">
//           <button 
//             className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//             onClick={() => setShowProfileMenu(!showProfileMenu)}
//           >
//             <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
//               <span className="text-white font-medium text-sm">
//                 {user?.email?.charAt(0).toUpperCase() || 'A'}
//               </span>
//             </div>
//             <div className="hidden sm:block text-left">
//               <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                 {user?.displayName || 'Admin'}
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 {user?.email || 'admin@example.com'}
//               </div>
//             </div>
//           </button>

//           {/* Profile Dropdown */}
//           {showProfileMenu && (
//             <>
//               <div 
//                 className="fixed inset-0 z-10" 
//                 onClick={() => setShowProfileMenu(false)}
//               />
//               <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 py-1">
//                 <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
//                   <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                     {user?.displayName || 'Admin User'}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {user?.email || 'admin@example.com'}
//                   </div>
//                 </div>
                
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <FiUser size={16} />
//                   Profile
//                 </button>
                
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <FiSettings size={16} />
//                   Settings
//                 </button>
                
//                 <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
//                   <button 
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
//                   >
//                     <FiLogOut size={16} />
//                     Sign Out
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }



// import React, { useState } from "react";
// import { FiMenu, FiSearch, FiBell, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";

// export default function AdminHeader({ setSidebarOpen }) {
//   const [user] = useAuthState(auth);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
//       {/* Left Section */}
//       <div className="flex items-center gap-4">
//         <button 
//           className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
//           onClick={() => setSidebarOpen(true)}
//         >
//           <FiMenu size={20} className="text-gray-600 dark:text-gray-300" />
//         </button>
        
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-sm">A</span>
//           </div>
//           <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
//             Admin Dashboard
//           </h1>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Search Bar - Hidden on mobile */}
//         <div className="hidden md:flex items-center relative">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//             />
//           </div>
//         </div>

//         {/* Search Button - Mobile only */}
//         <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
//           <FiSearch size={18} className="text-gray-600 dark:text-gray-300" />
//         </button>

//         {/* Notifications */}
//         <div className="relative">
//           <button 
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
//             onClick={() => setShowNotifications(!showNotifications)}
//           >
//             <FiBell size={18} className="text-gray-600 dark:text-gray-300" />
//             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//               0
//             </span>
//           </button>
//         </div>

//         {/* Settings */}
//         <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
//           <FiSettings size={18} className="text-gray-600 dark:text-gray-300" />
//         </button>

//         {/* Profile Menu */}
//         <div className="relative">
//           <button 
//             className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//             onClick={() => setShowProfileMenu(!showProfileMenu)}
//           >
//             <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
//               <span className="text-white font-medium text-sm">
//                 {user?.email?.charAt(0).toUpperCase() || 'A'}
//               </span>
//             </div>
//             <div className="hidden sm:block text-left">
//               <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                 {user?.displayName || 'Admin'}
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 {user?.email || 'admin@example.com'}
//               </div>
//             </div>
//           </button>

//           {/* Profile Dropdown */}
//           {showProfileMenu && (
//             <>
//               <div 
//                 className="fixed inset-0 z-10" 
//                 onClick={() => setShowProfileMenu(false)}
//               />
//               <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 py-1">
//                 <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
//                   <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                     {user?.displayName || 'Admin User'}
//                   </div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     {user?.email || 'admin@example.com'}
//                   </div>
//                 </div>
                
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <FiUser size={16} />
//                   Profile
//                 </button>
                
//                 <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
//                   <FiSettings size={16} />
//                   Settings
//                 </button>
                
//                 <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
//                   <button 
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
//                   >
//                     <FiLogOut size={16} />
//                     Sign Out
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, Bell, Settings, User, LogOut, SkipBack  } from "lucide-react"; // Replaced Fi icons
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { menuItems } from "../lib/utils/menuItems";

export default function AdminHeader({ setSidebarOpen }) {
  const [user] = useAuthState(auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  // Find the active page name based on the current route
  const getActivePageName = () => {
    for (const item of menuItems) {
      if (item.to === location.pathname) {
        return item.name;
      }
      if (item.subItems) {
        const subItem = item.subItems.find(
          (sub) => sub.to === location.pathname
        );
        if (subItem) {
          return subItem.name;
        }
      }
    }
    return "Admin Dashboard";
  };

  const activePageName = getActivePageName();
  const activePageInitial = activePageName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{activePageInitial}</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {activePageName}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Search Button - Mobile only */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
          <Search size={18} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
        {/* Profile Menu */}
        <div className="relative">
          <button 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.displayName || 'Admin'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || 'admin@example.com'}
              </div>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 py-1">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.displayName || 'Admin User'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email || 'admin@example.com'}
                  </div>
                </div>
                
               <Link to={'/'}>
                 <button className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <SkipBack  size={16} />
                  Back Portfolio
                </button>
               </Link>
                <button className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <User size={16} />
                  Profile
                </button>
                
                <button className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Settings size={16} />
                  Settings
                </button>
                
                <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}