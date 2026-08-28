"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaArrowUp, FaHeart } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import gsap from "gsap";

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
      color: "hover:text-white hover:border-white/40",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/md-antor-mia-antor/",
      color: "hover:text-cyan-400 hover:border-cyan-500/40",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://www.facebook.com/share/17QnUSneqa/",
      color: "hover:text-indigo-400 hover:border-indigo-500/40",
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#020617]/90 backdrop-blur-xl text-gray-300 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-24 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-tight">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/25">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center font-extrabold text-white text-lg">
                  A
                </div>
              </div>
              <span className="text-white font-extrabold text-2xl">
                Md Antor Mia<span className="text-cyan-400">.</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
              Frontend & MERN Stack Developer building scalable, performant, and beautifully animated web applications.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for full-time & freelance projects
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 group-hover:bg-cyan-400 group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <p className="text-sm text-gray-400">
              Have a project in mind or want to say hi? Feel free to reach out!
            </p>

            <a
              href="mailto:mdantormia1779@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:bg-white/10 transition-all text-sm group"
            >
              <FaEnvelope className="text-indigo-400 group-hover:scale-110 transition-transform" />
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
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 ${item.color}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Md Antor Mia. Made with{" "}
            <FaHeart className="text-rose-500 inline text-xs" /> using Next.js & GSAP.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-all duration-300 group"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-xs group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;