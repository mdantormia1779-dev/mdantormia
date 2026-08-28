"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderPlus,
  FolderKanban,
  Globe,
  X,
  ShieldCheck,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard Overview",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Create Project",
      path: "/admin/createproject",
      icon: <FolderPlus size={18} />,
    },
    {
      name: "Manage Projects",
      path: "/admin/manageproject",
      icon: <FolderKanban size={18} />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-[#0b1120]/95 lg:bg-[#0b1120]/75 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Top Branding & Mobile Close */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center font-extrabold text-white text-base">
                  A
                </div>
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white leading-tight">
                  Admin Panel
                </h2>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-400 flex items-center gap-1">
                  <ShieldCheck size={12} /> Super Admin
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Menu */}
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 px-3 mb-2">
              Navigation
            </p>
            <ul className="space-y-1.5">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path;

                return (
                  <li key={index}>
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 font-semibold"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className={isActive ? "text-white" : "text-gray-400"}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-gray-300 hover:text-white transition-all text-xs font-medium group"
          >
            <span className="flex items-center gap-2">
              <Globe size={15} className="text-cyan-400" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] text-gray-500 group-hover:text-gray-300">
              ↗
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
