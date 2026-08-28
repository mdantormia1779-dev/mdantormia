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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Education from "../Education/Education";

const skillCategories = [
  {
    title: "Frontend Development",
    accent: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-cyan-400",
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
    accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    skills: [
      { name: "Node.js", icon: <FaNode className="text-emerald-400" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
      { name: "Better Auth", icon: <SiBetterauth className="text-indigo-400" /> },
      { name: "REST APIs", icon: <MdVerified className="text-teal-400" /> },
    ],
  },
  {
    title: "Database & ORM",
    accent: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "Prisma ORM", icon: <SiPrisma className="text-cyan-300" /> },
      { name: "MySQL / SQL", icon: <SiMysql className="text-blue-400" /> },
      { name: "Mongoose", icon: <SiMongodb className="text-emerald-500" /> },
    ],
  },
  {
    title: "State & Architecture",
    accent: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    skills: [
      { name: "Redux Toolkit", icon: <SiRedux className="text-purple-400" /> },
      { name: "React Hook Form", icon: <SiReacthookform className="text-pink-400" /> },
      { name: "Yup Validation", icon: <MdVerified className="text-emerald-400" /> },
      { name: "Component Systems", icon: <MdLayers className="text-amber-400" /> },
    ],
  },
  {
    title: "Tools & Workflow",
    accent: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400",
    skills: [
      { name: "Git & GitHub", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "VS Code", icon: <VscVscode className="text-blue-400" /> },
      { name: "Figma UI/UX", icon: <SiFigma className="text-pink-500" /> },
      { name: "Vercel / Deployment", icon: <RiNextjsFill className="text-white" /> },
    ],
  },
  {
    title: "Languages & Concepts",
    accent: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-14 sm:py-16 text-white relative">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-16">
        
        {/* SECTION HEADER */}
        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2.5">
            <FaLayerGroup className="text-xs" />
            Technical Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Skills & <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-1.5">
            A comprehensive toolbox of modern technologies I use to build scalable web products.
          </p>
        </div>

        {/* SKILLS CATEGORIES GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card-item group bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                  {category.title}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-white/5 border ${category.accent}`}>
                  {category.skills.length} Tech
                </span>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 gap-2">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-150"
                  >
                    <span className="text-base shrink-0">{skill.icon}</span>
                    <span className="text-xs font-medium text-gray-300 truncate">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* INTEGRATED EDUCATION COMPONENT */}
        <div className="mt-12">
          <Education />
        </div>

      </section>
    </div>
  );
};

export default Skill;