"use client";

import React, { useEffect, useRef } from "react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNode,
  FaReact,
  FaLayerGroup,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiBetterauth,
  SiExpress,
  SiFigma,
  SiMongodb,
  SiTailwindcss,
  SiRedux,
  SiTypescript,
  SiPrisma,
  SiReacthookform,
  SiMysql,
  SiPython,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { MdVerified, MdLayers } from "react-icons/md";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Education from "../Education/Education";

const skillCategories = [
  {
    title: "Frontend Development",
    accent: "from-cyan-500/25 to-sky-500/25 border-cyan-500/40 text-cyan-300",
    skills: [
      { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js 15", icon: <RiNextjsFill className="text-white" /> },
      { name: "JavaScript (ES6+)", icon: <FaJs className="text-yellow-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS3 / DaisyUI", icon: <FaCss3Alt className="text-blue-500" /> },
    ],
  },
  {
    title: "Backend & Authentication",
    accent: "from-emerald-500/25 to-teal-500/25 border-emerald-500/40 text-emerald-300",
    skills: [
      { name: "Node.js", icon: <FaNode className="text-emerald-400" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
      { name: "Better Auth", icon: <SiBetterauth className="text-indigo-400" /> },
      { name: "REST APIs", icon: <MdVerified className="text-teal-400" /> },
    ],
  },
  {
    title: "Database & ORM",
    accent: "from-indigo-500/25 to-purple-500/25 border-indigo-500/40 text-indigo-300",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "Prisma ORM", icon: <SiPrisma className="text-cyan-300" /> },
      { name: "MySQL / SQL", icon: <SiMysql className="text-blue-400" /> },
      { name: "Mongoose", icon: <SiMongodb className="text-emerald-500" /> },
    ],
  },
  {
    title: "State & Architecture",
    accent: "from-sky-500/25 to-indigo-500/25 border-sky-500/40 text-sky-300",
    skills: [
      { name: "Redux Toolkit", icon: <SiRedux className="text-purple-400" /> },
      { name: "React Hook Form", icon: <SiReacthookform className="text-pink-400" /> },
      { name: "Yup Validation", icon: <MdVerified className="text-emerald-400" /> },
      { name: "Component Systems", icon: <MdLayers className="text-amber-400" /> },
    ],
  },
  {
    title: "Tools & Workflow",
    accent: "from-blue-500/25 to-cyan-500/25 border-blue-500/40 text-blue-300",
    skills: [
      { name: "Git & GitHub", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "VS Code", icon: <VscVscode className="text-blue-400" /> },
      { name: "Figma UI/UX", icon: <SiFigma className="text-pink-500" /> },
      { name: "Vercel / Deployment", icon: <RiNextjsFill className="text-white" /> },
    ],
  },
  {
    title: "Languages & Concepts",
    accent: "from-cyan-500/25 to-teal-500/25 border-cyan-500/40 text-cyan-300",
    skills: [
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "Python Basics", icon: <SiPython className="text-yellow-300" /> },
      { name: "Responsive Design", icon: <FaLayerGroup className="text-indigo-400" /> },
    ],
  },
];

const Skill = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-2 sm:py-2 text-white relative bg-[#07192d] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 pb-16 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2.5 backdrop-blur-md">
            <FaLayerGroup className="text-xs text-cyan-400" />
            Technical Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Skills & <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
            A comprehensive toolbox of modern technologies I use to build scalable web products.
          </p>
        </div>

        {/* SKILLS CATEGORIES GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="skill-card-item group bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/60 rounded-3xl p-6 shadow-xl shadow-cyan-950/40 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-cyan-500/20">
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                  {category.title}
                </h3>
                <span className={`text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 border font-medium ${category.accent}`}>
                  {category.skills.length} Tech
                </span>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 gap-2.5">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/15 hover:border-cyan-400/40 hover:bg-cyan-900/30 transition-all duration-200"
                  >
                    <span className="text-base shrink-0">{skill.icon}</span>
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* INTEGRATED EDUCATION COMPONENT */}
        <div className="mt-14">
          <Education />
        </div>

      </section>
    </div>
  );
};

export default Skill;