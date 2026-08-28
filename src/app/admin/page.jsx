"use client";

import React from "react";
import Link from "next/link";
import Overview from "../components/AdimDashboard/Overview/Overview";
import DashboardChart from "../components/AdimDashboard/DashboardChart/DashboardChart";
import ProjectPieChart from "../components/AdimDashboard/PieChart/PieChart";
import { FolderPlus, FolderKanban, Globe, ArrowUpRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Quick Navigation Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/createproject"
          className="p-4 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500 text-white shadow-md shadow-indigo-500/30">
              <FolderPlus size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Create New Project</p>
              <p className="text-[11px] text-gray-400">Publish a new showcase item</p>
            </div>
          </div>
          <ArrowUpRight size={16} className="text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <Link
          href="/admin/manageproject"
          className="p-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500 text-white shadow-md shadow-purple-500/30">
              <FolderKanban size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Manage Projects</p>
              <p className="text-[11px] text-gray-400">Edit, update, or remove projects</p>
            </div>
          </div>
          <ArrowUpRight size={16} className="text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>

        <Link
          href="/"
          target="_blank"
          className="p-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500 text-white shadow-md shadow-cyan-500/30">
              <Globe size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">View Live Website</p>
              <p className="text-[11px] text-gray-400">Preview changes on live site</p>
            </div>
          </div>
          <ArrowUpRight size={16} className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Main Overview Statistics */}
      <Overview />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex">
          <DashboardChart />
        </div>
        <div className="lg:col-span-4 flex">
          <ProjectPieChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
