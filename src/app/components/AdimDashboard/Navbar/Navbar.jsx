"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Menu, LogOut, ShieldCheck, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = ({ onToggleSidebar }) => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch {
      router.push("/login");
    }
  };

  return (
    <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile menu button & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-[11px] text-gray-400 hidden sm:block">
            Welcome back to your administration portal
          </p>
        </div>
      </div>

      {/* Right: User Profile & Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User Card */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
          {user?.image ? (
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-indigo-500/40">
              <Image
                src={user.image}
                alt="user"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
            </div>
          )}

          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-white truncate max-w-[120px]">
              {user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-gray-400 truncate max-w-[120px]">
              {user?.email || "admin@portfolio.dev"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95"
          title="Sign Out"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
