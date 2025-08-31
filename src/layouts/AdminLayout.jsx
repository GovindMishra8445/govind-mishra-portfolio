// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import AdminHeader from "./AdminHeader";
// import AdminFooter from "./AdminFooter";
// import { Outlet } from "react-router-dom";

// export default function AdminLayout({projectCount, children}) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
//       <Sidebar projectCount={projectCount} open={sidebarOpen} setOpen={setSidebarOpen} />

//       <div className="flex-1 flex flex-col">
//         <AdminHeader setSidebarOpen={setSidebarOpen} />
//         <main className="flex-1 p-4 md:p-6 overflow-auto">
//           <Outlet />
//         </main>
//         <AdminFooter />
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ projectCount }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        projectCount={projectCount}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
