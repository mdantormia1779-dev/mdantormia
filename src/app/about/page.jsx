"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaUser,
  FaLaptopCode,
  FaRocket,
  FaGraduationCap,
  FaDownload,
  FaCheckCircle,
  FaBriefcase,
  FaCode,
  FaServer,
  FaMobileAlt,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import gsap from "gsap";

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-page-anim",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    {
      icon: <FaUser className="text-cyan-400" />,
      title: "Who I Am",
      desc: "A dedicated MERN & Full-Stack Developer from Bangladesh building high-performance, user-centric web & mobile applications.",
    },
    {
      icon: <FaGraduationCap className="text-sky-300" />,
      title: "Education",
      desc: "Diploma in Computer Science & Technology at Habiganj Polytechnic Institute.",
    },
    {
      icon: <FaLaptopCode className="text-emerald-400" />,
      title: "Core Stack",
      desc: "Proficient in React.js, Next.js 15, TypeScript, Tailwind CSS, Node.js, Prisma ORM, MongoDB & PostgreSQL.",
    },
    {
      icon: <FaRocket className="text-indigo-400" />,
      title: "My Goal",
      desc: "To contribute to real-world impactful software projects while growing into an industry-leading Full-Stack Engineer.",
    },
  ];

  const highlights = [
    {
      icon: <FaBriefcase className="text-cyan-400" />,
      title: "Frontend Intern @ JEVXO Software",
      desc: "Built responsive dashboards and reusable UI components using React, Next.js, TypeScript, Tailwind CSS, and Git workflows.",
    },
    {
      icon: <FaMobileAlt className="text-emerald-400" />,
      title: "Smart AI Attendance System",
      desc: "Developed full-stack platform & React Native mobile app with AI Face Recognition, Liveness Check, and GPS Geofencing.",
    },
    {
      icon: <FaServer className="text-sky-300" />,
      title: "Modern E-Commerce Engine",
      desc: "Engineered single-vendor full-stack e-commerce with Redux Toolkit, Prisma, PostgreSQL, GSAP, live order tracking, and revenue analytics.",
    },
  ];

  const principles = [
    {
      title: "Clean & Maintainable Code Architecture",
      desc: "Writing modular, self-documenting code using TypeScript, reusable components, and standard folder structures.",
    },
    {
      title: "Performance & SEO Optimization",
      desc: "Optimizing Core Web Vitals, server-side rendering (SSR/SSG) in Next.js, and lightweight asset delivery.",
    },
    {
      title: "Pixel-Perfect Responsive UI/UX",
      desc: "Ensuring layouts render seamlessly across mobile phones, tablets, laptops, and ultra-wide screens.",
    },
    {
      title: "Continuous Learning & Engineering Growth",
      desc: "Constantly mastering new full-stack tools, ORMs, state management, and modern web engineering best practices.",
    },
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div
      ref={containerRef}
      className="py-12 md:py-20 bg-[#07192d] text-white relative overflow-hidden min-h-screen"
    >
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="about-page-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <FaUser className="text-xs text-cyan-400" />
            Full Professional Biography
          </div>
          <h1 className="about-page-anim text-3xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Driven by Passion,{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Powered by Code
            </span>
          </h1>
          <p className="about-page-anim text-slate-300 text-sm sm:text-base leading-relaxed">
            Get to know my engineering background, technical expertise, and journey as a MERN & Full-Stack Developer.
          </p>
        </div>

        {/* HERO BIO CARD (NO IMAGE - MODERN TECH BANNER) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/50 mb-12 relative overflow-hidden"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Md Antor <span className="text-cyan-400">Mia</span>
                </h2>
                <p className="text-cyan-300 font-semibold text-sm sm:text-base mt-1">
                  MERN Stack & Full-Stack Software Developer
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open for Full-Time & Freelance Roles
              </div>
            </div>

            <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
              Motivated <span className="text-cyan-300 font-semibold">MERN Stack Developer</span> with hands-on experience in building responsive, scalable, and user-friendly web and mobile applications. I hold a Diploma in Computer Science & Technology from Habiganj Polytechnic Institute and have honed my engineering skills through real-world projects and industrial internships[cite: 1, 2].
            </p>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm md:text-base">
              Having completed a 2-month internship as a <span className="text-white font-semibold">Frontend Developer at JEVXO Software</span>, I excel at building clean dashboard interfaces, complex state management, and modern API integrations using <span className="text-sky-300 font-medium">Next.js, React, TypeScript, Prisma ORM, Tailwind CSS,</span> and <span className="text-indigo-300 font-medium">Node.js</span>[cite: 1, 2].
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="/api/cv/download"
                download
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600 font-bold text-xs sm:text-sm text-white shadow-lg shadow-cyan-950/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FaDownload /> Download Resume
              </a>

              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 font-semibold text-xs sm:text-sm text-cyan-200 hover:text-white transition-all flex items-center gap-2 shadow-md backdrop-blur-md active:scale-95"
              >
                <FiSend className="text-cyan-400" /> Let’s Talk
              </Link>
            </div>
          </div>
        </motion.div>

        {/* MILESTONE CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
        >
          {milestones.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-[#091d34]/70 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 rounded-3xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">{card.title}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* KEY HIGHLIGHTS & EXPERIENCE BENTO */}
        <div className="about-page-anim mb-12">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white text-center mb-8 flex items-center justify-center gap-2">
            <FaCode className="text-cyan-400" /> Key Engineering Achievements
          </h3>

          <div className="grid md:grid-cols-3 gap-5">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-[#091d34]/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CORE DEVELOPMENT PRINCIPLES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/50"
        >
          <h3 className="text-xl sm:text-2xl font-extrabold text-white text-center mb-8">
            My Core <span className="text-cyan-400">Development Philosophy</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/15 hover:border-cyan-500/30 transition-all flex items-start gap-3.5"
              >
                <FaCheckCircle className="text-cyan-400 text-lg mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutPage;