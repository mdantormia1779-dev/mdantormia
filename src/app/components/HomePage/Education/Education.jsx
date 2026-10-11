"use client";

import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Education = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-reveal",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
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
    <div ref={containerRef} className="pt-6">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-cyan-950/80 rounded-2xl border border-cyan-500/30 text-cyan-400 backdrop-blur-md">
          <FaGraduationCap className="text-xl" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Academic <span className="text-cyan-400">Background</span>
          </h2>
          <p className="text-xs text-slate-300">Foundational computer science studies</p>
        </div>
      </div>

      {/* Card */}
      <div className="edu-reveal bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-cyan-950/40 transition-all duration-300 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-cyan-500/20 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2 backdrop-blur-md">
              Diploma Engineering
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Diploma in Computer Science & Technology
            </h3>
            <p className="text-sm text-cyan-200 font-medium mt-0.5">
              Habiganj Polytechnic Institute
            </p>
          </div>

          <div className="flex flex-col sm:items-start md:items-end gap-1.5 text-xs text-slate-300">
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

        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed py-5 border-b border-cyan-500/15 relative z-10 font-normal">
          Building a rigorous understanding of computer programming, software engineering fundamentals, data structures, algorithm design, and modern full-stack web architectures.
        </p>

        {/* Focus pillars */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
              Core Focus
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              Software & Web Engineering
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 block mb-0.5">
              Key Studies
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              Full Stack Developer
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
              Practical Goal
            </span>
            <span className="text-xs sm:text-sm font-semibold text-white">
              Full-Stack Application Design
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;