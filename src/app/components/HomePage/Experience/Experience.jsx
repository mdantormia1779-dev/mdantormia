"use client";

import React, { useEffect, useRef } from "react";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-reveal",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
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

  const responsibilities = [
    "Completed structured training in modern full-stack web technologies following industrial roadmaps.",
    "Built hands-on proficiency in TypeScript, Redux Toolkit, React Hook Form, Yup validation, and shadcn/ui.",
    "Engineered and maintained responsive, high-performance web components using React.js and Next.js.",
    "Integrated secure REST APIs using Node.js, Express.js, and MongoDB / Mongoose.",
    "Explored relational database modeling with Prisma ORM and SQL.",
    "Practiced professional Git workflows including agile task tracking, feature branching, and pull request reviews.",
  ];

  const tools = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Redux Toolkit",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Prisma ORM",
    "Tailwind CSS",
    "Git",
  ];

  return (
    <section ref={containerRef} className="py-14 sm:py-16 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-16">
        
        {/* SECTION HEADER */}
        <div className="exp-reveal text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2.5">
            <FaBriefcase className="text-xs" />
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Work <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-1.5">
            Real-world software engineering experience and collaborative project contributions.
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative pl-5 sm:pl-8 border-l-2 border-purple-500/30 space-y-6">
          
          {/* TIMELINE NODE DOT */}
          <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#030712] shadow-[0_0_10px_#a855f7]" />

          {/* EXPERIENCE CARD */}
          <div className="exp-reveal bg-[#0b1120]/75 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:border-purple-500/40 transition-all duration-200">
            
            {/* CARD HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold mb-1.5">
                  Internship
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  MERN Stack Developer Intern
                </h3>
                <p className="text-base font-medium text-purple-300 mt-0.5">
                  JEVXO Software Company
                </p>
              </div>

              <div className="flex flex-col sm:items-start md:items-end gap-1 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-purple-400" />
                  <span>Duration: 2 Months</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-purple-400" />
                  <span>Rajshahi Hi-Tech Park, Bangladesh (Remote)</span>
                </div>
              </div>
            </div>

            {/* RESPONSIBILITIES LIST */}
            <div className="py-5 space-y-2.5 relative z-10">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Key Contributions & Learnings
              </h4>
              <div className="grid md:grid-cols-2 gap-2.5">
                {responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <FaCheckCircle className="text-purple-400 text-xs mt-1 shrink-0" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TECH STACK BADGES */}
            <div className="pt-5 border-t border-white/10 relative z-10">
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                Technologies Applied
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((tool, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-purple-300 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;