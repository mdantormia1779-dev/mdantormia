"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDownload, FaBars, FaTimes } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import gsap from "gsap";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [mobileOpen]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/api/cv/download";
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/project" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 pt-3 pb-2 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div
        className={`container mx-auto transition-all duration-300 rounded-2xl ${
          scrolled
            ? "bg-[#07192d]/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 px-4 sm:px-6 py-2.5"
            : "bg-[#07192d]/50 backdrop-blur-md border border-cyan-500/15 px-4 sm:px-6 py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* LOGO BRANDING */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-2xl font-black tracking-tight"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-indigo-500 p-[2px] transition-transform duration-300 group-hover:rotate-6 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#07192d] rounded-[10px] flex items-center justify-center font-black text-white text-lg sm:text-xl">
                A
              </div>
            </div>
            <span className="text-white font-extrabold text-xl sm:text-2xl tracking-wide">
              Antor<span className="text-cyan-400 animate-pulse">.</span>
            </span>
          </Link>

          {/* DESKTOP NAV LINKS (CENTER PILL) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#07192d]/80 border border-cyan-500/20 rounded-xl p-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/20"
                      : "text-slate-300 hover:text-white hover:bg-cyan-500/10"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5 rounded-xl hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/20"
            >
              <FiSend className="text-cyan-400" /> Hire Me
            </Link>

            <button
              onClick={handleDownload}
              className="group relative px-5 py-2 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-lg shadow-cyan-950/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600 transition-all duration-300 group-hover:opacity-95" />
              <span className="relative flex items-center gap-2">
                <FaDownload className="text-xs transition-transform group-hover:-translate-y-0.5" />
                Download CV
              </span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-slate-200 hover:text-white focus:outline-none transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-3 p-4 rounded-xl bg-[#07192d]/98 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl space-y-3"
          >
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                        : "text-slate-300 hover:bg-cyan-950/50 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-cyan-500/20 flex flex-col gap-2">
              <button
                onClick={() => {
                  handleDownload();
                  setMobileOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/40 active:scale-95 transition-transform"
              >
                <FaDownload /> Download CV
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 rounded-lg border border-cyan-500/30 text-center text-sm font-medium text-cyan-300 hover:bg-cyan-950/50 transition flex items-center justify-center gap-2"
              >
                <FiSend className="text-cyan-400" /> Hire Me
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;