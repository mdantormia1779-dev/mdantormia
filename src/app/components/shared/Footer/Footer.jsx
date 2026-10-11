"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaArrowUp, FaHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "All Projects", href: "/project" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      href: "https://github.com/mdantormia1779-dev",
      color: "hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-950/60",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/mdantormia",
      color: "hover:text-sky-300 hover:border-sky-400/50 hover:bg-cyan-950/60",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://www.facebook.com/md.antormia.1779",
      color: "hover:text-indigo-300 hover:border-indigo-400/50 hover:bg-cyan-950/60",
    },
  ];

  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#07192d] backdrop-blur-xl text-slate-300 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-2xl font-black tracking-tight">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-indigo-500 p-[2px] shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#07192d] rounded-[10px] flex items-center justify-center font-black text-white text-lg sm:text-xl">
                  A
                </div>
              </div>
              <span className="text-white font-extrabold text-2xl tracking-wide">
                Md Antor Mia<span className="text-cyan-400 animate-pulse">.</span>
              </span>
            </Link>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md font-normal">
              Frontend & MERN Stack Developer building scalable, performant, and beautifully animated web applications.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-xs font-medium backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for full-time & freelance projects
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-cyan-300 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Get in Touch
            </h3>
            <p className="text-sm text-slate-300">
              Have a project in mind or want to say hi? Feel free to reach out!
            </p>

            <a
              href="mailto:mdantormia1779@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-cyan-900/50 transition-all text-sm group"
            >
              <FaEnvelope className="text-cyan-400 group-hover:scale-110 transition-transform" />
              mdantormia1779@gmail.com
            </a>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={`w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-center text-slate-300 transition-all duration-300 hover:scale-110 ${item.color}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Md Antor Mia. Made with{" "}
            <FaHeart className="text-rose-500 inline text-xs" /> using Next.js & GSAP.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 text-slate-300 hover:text-cyan-200 border border-cyan-500/30 transition-all duration-300 group cursor-pointer"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-xs group-hover:-translate-y-1 transition-transform text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;