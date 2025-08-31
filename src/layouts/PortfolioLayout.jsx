import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialSidebar from "../components/SocialSidebar";
import BackToTop from "../components/BackToTop";
import ScrollToTop from "../components/ScrollToTop";
import { Outlet } from "react-router-dom";

export default function PortfolioLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <SocialSidebar />
      <BackToTop />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}
