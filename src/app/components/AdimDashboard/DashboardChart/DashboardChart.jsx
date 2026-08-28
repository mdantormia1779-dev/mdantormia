"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] p-3 border border-indigo-500/30 shadow-2xl rounded-xl backdrop-blur-xl">
        <p className="text-xs font-semibold text-gray-300 mb-1">{label}</p>
        <p className="text-sm font-bold text-cyan-400">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const defaultData = [
  { name: "Projects", value: 5 },
  { name: "Site Visits", value: 248 },
  { name: "CV Downloads", value: 18 },
];

const DashboardChart = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (!process.env.NEXT_PUBLIC_API_URL) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`);
        const result = await res.json();

        if (result.success) {
          setData([
            { name: "Projects", value: result.totalProjects || 5 },
            { name: "Site Visits", value: result.totalVisits || 248 },
            { name: "CV Downloads", value: result.cvDownloads || 18 },
          ]);
        }
      } catch {
        // Keep fallback data
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full p-6 bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <BarChart3 size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Platform Analytics
            </h3>
            <p className="text-xs text-gray-400">Activity and engagement summary</p>
          </div>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
          Live Data
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#1f2937"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#818cf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;