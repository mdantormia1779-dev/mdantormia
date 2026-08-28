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
      if (window.scrollY > 20) {
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
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [mobileOpen]);

  const handleDownload = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/downloads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ downloadType: "CV" }),
      });
    } catch (error) {
      console.log("Download tracking:", error);
    }

    const link = document.createElement("a");
    link.href = "/antor.pdf";
    link.download = "Antor_CV.pdf";
    link.click();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/project" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30 py-3"
          : "bg-transparent border-b border-white/5 py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-black tracking-tight"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-indigo-500/25">
            <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center font-extrabold text-white text-lg">
              A
            </div>
          </div>
          <span className="text-white font-extrabold text-xl">
            Antor<span className="text-cyan-400">.</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white bg-indigo-500/20 border border-indigo-500/40 shadow-sm shadow-indigo-500/20"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FiSend className="text-cyan-400" /> Hire Me
          </Link>
          <button
            onClick={handleDownload}
            className="group relative px-5 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-300 group-hover:opacity-90" />
            <span className="relative flex items-center gap-2">
              <FaDownload className="text-xs transition-transform group-hover:-translate-y-0.5" />
              Download CV
            </span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-white focus:outline-none transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden mt-2 mx-4 p-5 rounded-2xl bg-[#0b1120]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-4"
        >
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-500/20 text-cyan-300 border border-indigo-500/30"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                handleDownload();
                setMobileOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <FaDownload /> Download CV
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 rounded-xl border border-indigo-400/40 text-center text-sm font-medium text-indigo-300 hover:bg-indigo-500/10 transition"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
