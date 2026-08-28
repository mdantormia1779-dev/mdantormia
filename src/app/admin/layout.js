"use client";

import React, { useState } from "react";
import Navbar from "../components/AdimDashboard/Navbar/Navbar";
import Sidebar from "../components/AdimDashboard/Sidebar/Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#030712] text-gray-100 overflow-hidden font-sans">
      {/* Sidebar: Desktop fixed & Mobile responsive drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        {/* Navbar */}
        <header className="sticky top-0 z-30 bg-[#0b1120]/80 backdrop-blur-xl border-b border-white/10">
          <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#030712] via-[#080d1a] to-[#030712]">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}