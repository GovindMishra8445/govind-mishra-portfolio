// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Skills from "./components/Skills";
// import Projects from "./components/Projects";
// import Experience from "./components/Experience";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import ThemeToggle from "./components/ThemeToggle";
// import ProjectDetails from "./components/ProjectDetails";
// import ScrollToTop from "./components/ScrollToTop";
// import BackToTop from "./components/BackToTop";
// import LoadingScreen from "./components/LoadingScreen";
// import SocialSidebar from "./components/SocialSidebar";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProjectsAdmin from "./pages/Admin/ProjectsAdmin";
// import Login from "./pages/Admin/Login";
// import AdminDashboard from "./admin/AdminDashboard";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//   }, []);

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <ThemeProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//           <ScrollToTop />
//           <Navbar />
//           <SocialSidebar />
//           <BackToTop />
//           <Routes>
//           <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin/login" element={<Login />} />
//             <Route
//               path="/admin/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <ProjectsAdmin />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/"
//               element={
//                 <>
//                   <Hero />
//                   <About />
//                   <Skills />
//                   <Projects />
//                   <Experience />
//                   <Contact />
//                 </>
//               }
//             />
//             <Route path="/project/:id" element={<ProjectDetails />} />
//           </Routes>
//           <Footer />
//           {/* <ThemeToggle /> */}
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import PortfolioLayout from "./layouts/PortfolioLayout";
import AdminLayout from "./layouts/AdminLayout";

// Portfolio Pages
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";

// Admin Pages
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import SkillsAdmin from "./pages/Admin/SkillsAdmin";
import ExperienceAdmin from "./pages/Admin/ExperienceAdmin";
import AllProjects from "./pages/Admin/AllProjects";
import FrontendProjects from "./pages/Admin/FrontendProjects";
import BackendProjects from "./pages/Admin/BackendProjects";
import FullStackProjects from "./pages/Admin/FullStackProjects";
import AppFrontendProjects from "./pages/Admin/AppFrontendProjects";
import AppBackendProjects from "./pages/Admin/AppBackendProjects";
import AppFullStackProjects from "./pages/Admin/AppFullStackProjects";

// Firebase
import { db } from "./firebase"; // Adjust path as per your project
import { collection, onSnapshot } from "firebase/firestore";
import ComingSoon from "./components/ComingSoon";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    // Loading delay for first load
    if (!sessionStorage.getItem("firstLoadDone")) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("firstLoadDone", "true");
      }, 1500);
    } else {
      setLoading(false);
    }

    // Fetch project count from Firebase
    const unsubscribe = onSnapshot(collection(db, "projects"), (snap) => {
      setProjectCount(snap.docs.length);
    }, (error) => {
      console.error("Error fetching project count:", error);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Portfolio Layout */}
          <Route element={<PortfolioLayout />}>
            <Route index element={<Home />} />
            <Route path="project/:id" element={<ProjectDetails />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Dashboard Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout projectCount={projectCount} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Projects */}
            <Route path="allprojects" element={<AllProjects />} />
            <Route path="projects/frontend" element={<FrontendProjects />} />
            <Route path="projects/backend" element={<BackendProjects />} />
            <Route path="projects/fullstack" element={<FullStackProjects />} />
            <Route path="projects/app-frontend" element={<AppFrontendProjects />} />
            <Route path="projects/app-backend" element={<AppBackendProjects />} />
            <Route path="projects/app-fullstack" element={<AppFullStackProjects />} />

            {/* Other Admin Pages */}
            <Route path="admin/coming-soon" element={<ComingSoon/>} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="experience" element={<ExperienceAdmin />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}