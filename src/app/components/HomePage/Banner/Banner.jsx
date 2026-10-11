"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import {
  FaDownload,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
  FaCode,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiMongodb, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FiArrowRight, FiTerminal } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import gsap from "gsap";

const Banner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous floating/ambient pulse animation for background glow orbs
      gsap.to(".bg-glow-left", {
        x: "random(-35, 35)",
        y: "random(-35, 35)",
        scale: 1.15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".bg-glow-right", {
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Interactive subtle floating animation for right code card tech badges
      gsap.to(".tech-badge-float", {
        y: -5,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.25,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/api/cv/download";
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Framer Motion Animation Stagger Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative pt-12 md:pt-16 pb-8 md:pb-12 overflow-hidden bg-[#07192d] text-white"
    >
      {/* BACKGROUND DOT PATTERN */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* GSAP ANIMATED BACKGROUND RADIAL GLOWS */}
      <div className="bg-glow-left absolute -top-24 -left-24 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="bg-glow-right absolute top-1/2 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[65vh]">
          {/* LEFT COLUMN: HERO DETAILS WITH FRAMER MOTION */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* AVAILABLE BADGE */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-md shadow-inner">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-cyan-200 tracking-wide">
                  Available for New Projects & Roles
                </span>
              </div>
            </motion.div>

            {/* NAME TITLE */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <p className="text-cyan-300/80 font-medium text-base sm:text-lg tracking-wide">
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
                Md Antor{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  Mia
                </span>
              </h1>
            </motion.div>

            {/* ROLE TYPEWRITER */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-2xl lg:text-3xl font-bold text-gray-200 min-h-[36px]"
            >
              <span className="text-cyan-400">Creative</span>
              <TypeAnimation
                sequence={[
                  "Frontend Developer",
                  1600,
                  "React & Next.js Engineer",
                  1600,
                  "MERN Stack Developer",
                  1600,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 underline decoration-cyan-500/40 decoration-2 underline-offset-4"
              />
            </motion.div>

            {/* BIO DESCRIPTION */}
            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              I build lightning-fast, visually captivating, and responsive web
              applications. Turning complex ideas into seamless digital
              products with clean code.
            </motion.p>

            {/* ACTION CTA BUTTONS WITH MOTION HOVER */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="group relative px-6 sm:px-7 py-3 rounded-xl font-bold text-white shadow-lg shadow-cyan-900/40 overflow-hidden cursor-pointer text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 transition-transform duration-200 group-hover:scale-105" />
                <span className="relative flex items-center gap-2">
                  <FaDownload className="text-xs transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Download CV
                </span>
              </motion.button>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/project"
                  className="px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm sm:text-base text-cyan-100 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center gap-2 shadow-md group backdrop-blur-md"
                >
                  <span>View Projects</span>
                  <FiArrowRight className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* SOCIAL CONNECT PILLS */}
            <motion.div
              variants={itemVariants}
              className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 text-xs sm:text-sm text-slate-400"
            >
              <span className="font-medium text-slate-300">Connect with me:</span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    icon: FaGithub,
                    link: "https://github.com/mdantormia1779-dev",
                    label: "GitHub",
                    hover:
                      "hover:border-cyan-400 hover:text-white hover:bg-cyan-950/80",
                  },
                  {
                    icon: FaLinkedin,
                    link: "https://www.linkedin.com/in/mdantormia",
                    label: "LinkedIn",
                    hover:
                      "hover:border-sky-400 hover:text-sky-300 hover:bg-cyan-950/80",
                  },
                  {
                    icon: FaFacebook,
                    link: "https://www.facebook.com/md.antormia.1779",
                    label: "Facebook",
                    hover:
                      "hover:border-indigo-400 hover:text-indigo-300 hover:bg-cyan-950/80",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={i}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-center text-slate-300 transition-colors duration-200 ${item.hover}`}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: MODERN CODE / TECH CARD */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="w-full max-w-md bg-[#0a192f]/80 rounded-2xl border border-cyan-500/30 shadow-2xl backdrop-blur-xl overflow-hidden relative"
            >
              {/* Code Window Header */}
              <div className="px-4 py-3 bg-[#0d223a] border-b border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-cyan-300/70 font-mono">
                  <FiTerminal size={13} />
                  <span>developer.config.ts</span>
                </div>
                <div className="w-12" />
              </div>

              {/* Code Editor Body */}
              <div className="p-5 font-mono text-xs sm:text-sm space-y-3 leading-relaxed text-slate-300">
                <div>
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-cyan-300">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">name</span>:{" "}
                  <span className="text-emerald-300">&quot;Md Antor Mia&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">role</span>:{" "}
                  <span className="text-emerald-300">
                    &quot;Full Stack Developer&quot;
                  </span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">status</span>:{" "}
                  <span className="text-amber-300">
                    &quot;Open for Opportunities&quot;
                  </span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">coreTech</span>: [
                  <div className="pl-4 text-emerald-300 grid grid-cols-2 gap-1 py-1">
                    <span>&quot;React.js&quot;,</span>
                    <span>&quot;Next.js&quot;,</span>
                    <span>&quot;Node.js&quot;,</span>
                    <span>&quot;MongoDB&quot;</span>
                  </div>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">passionateAbout</span>:{" "}
                  <span className="text-purple-300">
                    &quot;Clean Code & Fast UI&quot;
                  </span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Interactive Tech Badge Bar */}
              <div className="px-5 py-4 bg-[#091627] border-t border-cyan-500/20">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400/80 mb-2.5 flex items-center gap-1.5">
                  <FaCode /> Primary Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="tech-badge-float inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/90 border border-cyan-500/40 text-xs text-cyan-300">
                    <FaReact className="text-cyan-400" /> React
                  </span>
                  <span className="tech-badge-float inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white">
                    <RiNextjsFill /> Next.js
                  </span>
                  <span className="tech-badge-float inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300">
                    <FaNodeJs className="text-emerald-400" /> Node
                  </span>
                  <span className="tech-badge-float inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-950/80 border border-green-500/40 text-xs text-green-300">
                    <SiMongodb className="text-green-400" /> MongoDB
                  </span>
                  <span className="tech-badge-float inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-500/40 text-xs text-sky-300">
                    <SiTailwindcss className="text-sky-400" /> Tailwind
                  </span>
                  <span className="tech-badge-float inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-500/40 text-xs text-blue-300">
                    <SiTypescript className="text-blue-400" /> TypeScript
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;