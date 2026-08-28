"use client";

import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Education = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".edu-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-8">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
          <FaGraduationCap className="text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Academic <span className="text-cyan-400">Background</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">Foundational computer science studies</p>
        </div>
      </div>

      {/* Card */}
      <div className="edu-card bg-[#0b1120]/70 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
              Diploma Engineering
            </span>
            <h3 className="text-2xl font-bold text-white">
              Diploma in Computer Science & Technology
            </h3>
            <p className="text-base text-gray-300 font-medium mt-1">
              Habiganj Polytechnic Institute
            </p>
          </div>

          <div className="flex flex-col sm:items-start md:items-end gap-1 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-cyan-400" />
              <span>2024 - Present (Ongoing)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-cyan-400" />
              <span>Habiganj, Sylhet, Bangladesh</span>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed py-6 border-b border-white/5 relative z-10">
          Building a rigorous understanding of computer programming, software engineering fundamentals, data structures, algorithm design, and modern full-stack web architectures.
        </p>

        {/* Focus pillars */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              Core Focus
            </span>
            <span className="text-sm font-semibold text-white">
              Software & Web Engineering
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Key Studies
            </span>
            <span className="text-sm font-semibold text-white">
              Data Structures & Algorithms
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Practical Goal
            </span>
            <span className="text-sm font-semibold text-white">
              Full-Stack Application Design
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;