"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

const COLORS = ["#06b6d4", "#6366f1", "#a855f7"];

const defaultPieData = [
  { name: "Projects", value: 5 },
  { name: "Visits", value: 248 },
  { name: "Downloads", value: 18 },
];

const ProjectPieChart = () => {
  const [chartData, setChartData] = useState(defaultPieData);

  useEffect(() => {
    const fetchStats = async () => {
      if (!process.env.NEXT_PUBLIC_API_URL) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`);
        const result = await res.json();

        if (result?.success) {
          setChartData([
            { name: "Projects", value: result.totalProjects || 5 },
            { name: "Visits", value: result.totalVisits || 248 },
            { name: "Downloads", value: result.cvDownloads || 18 },
          ]);
        }
      } catch {
        // Keep fallback chart data
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full p-6 bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <PieIcon size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Distribution
            </h3>
            <p className="text-xs text-gray-400">Engagement breakdown</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-52 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={6}
              cornerRadius={6}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "12px",
                borderColor: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5">
        {chartData.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-300"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span>{entry.name}:</span>
            <span className="font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPieChart;