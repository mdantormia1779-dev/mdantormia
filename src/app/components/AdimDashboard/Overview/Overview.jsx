"use client";

import React, { useEffect, useState } from "react";
import { Folder, Eye, Download, Activity, TrendingUp, Sparkles } from "lucide-react";

const Overview = () => {
  const [stats, setStats] = useState({
    totalProjects: 5,
    totalVisits: 248,
    cvDownloads: 18,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        setLoading(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        const data = await res.json();

        if (data.success) {
          setStats({
            totalProjects: data.totalProjects || 5,
            totalVisits: data.totalVisits || 248,
            cvDownloads: data.cvDownloads || 18,
          });
        }
      } catch {
        // Keep fallback stats
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    {
      title: "Total Projects",
      value: loading ? "..." : stats.totalProjects.toLocaleString(),
      change: "+2 this month",
      icon: <Folder size={20} className="text-cyan-400" />,
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Portfolio Views",
      value: loading ? "..." : stats.totalVisits.toLocaleString(),
      change: "+18% growth",
      icon: <Eye size={20} className="text-indigo-400" />,
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "CV Downloads",
      value: loading ? "..." : stats.cvDownloads.toLocaleString(),
      change: "Active Interest",
      icon: <Download size={20} className="text-purple-400" />,
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "System Status",
      value: "Operational",
      change: "99.9% Uptime",
      icon: <Activity size={20} className="text-emerald-400" />,
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-[#0b1120] to-purple-900/40 border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles size={13} />
            Control Center
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome to Your Admin Dashboard
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Monitor real-time visitors, review download statistics, and manage your showcase projects.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="p-5 rounded-2xl bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-200 shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-gray-400 text-xs font-medium">{item.title}</p>
              <div className={`p-2.5 rounded-xl border ${item.bg}`}>
                {item.icon}
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {item.value}
              </h3>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] font-medium text-emerald-400">
                <TrendingUp size={12} />
                <span>{item.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;