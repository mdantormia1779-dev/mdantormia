"use client";

import React, { useEffect, useRef } from "react";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaLaptopCode } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-reveal",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
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

  const experiences = [
    {
      badge: "Professional Internship",
      role: "Frontend Developer Intern",
      company: "JEVXO Software",
      duration: "2-Month Internship",
      location: "Remote / Bangladesh",
      responsibilities: [
        "Built responsive dashboards and reusable UI components using React.js and Next.js.",
        "Implemented modern UI styling with Tailwind CSS and ShadCN UI.",
        "Ensured code maintainability and version control using Git and GitHub workflows.",
      ],
      tools: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "Git & GitHub"],
    },
    {
      badge: "Project-Based Experience",
      role: "MERN-Stack & Next.js Developer",
      company: "Smart Attendance System (SaaS Platform)",
      duration: "Project-Based Development",
      location: "Full-Stack Architecture",
      responsibilities: [
        "Developed an enterprise Smart Attendance System using Next.js, TypeScript, Prisma, and PostgreSQL.",
        "Integrated advanced features including AI Face Recognition, Liveness Verification, and GPS Geofencing attendance tracking.",
        "Engineered secure authentication systems and mobile application bridges via React Native.",
      ],
      tools: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL", "React Native", "Face Recognition", "JWT"],
    },
  ];

  return (
    <section ref={containerRef} className="py-6 sm:py-6 text-white relative bg-[#07192d] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 pb-16 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="exp-reveal text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2.5 backdrop-blur-md">
            <FaBriefcase className="text-xs text-cyan-400" />
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Work <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
            Real-world software engineering internship and high-impact full-stack project contributions.
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative pl-5 sm:pl-8 border-l-2 border-cyan-500/30 space-y-8">
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* TIMELINE NODE DOT */}
              <div className="absolute -left-[25px] sm:-left-[37px] top-6 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#07192d] shadow-[0_0_12px_#38bdf8]" />

              {/* EXPERIENCE CARD */}
              <div className="exp-reveal bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 transition-all duration-300 group">
                
                {/* CARD HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-cyan-500/20">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2 backdrop-blur-md">
                      <FaLaptopCode className="text-cyan-400 text-xs" /> {exp.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-base font-semibold text-cyan-300 mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-start md:items-end gap-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-cyan-400" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaMapMarkerAlt className="text-cyan-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* RESPONSIBILITIES LIST */}
                <div className="py-5 space-y-2.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                    Key Contributions & Learnings
                  </h4>
                  <div className="grid md:grid-cols-1 gap-2.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <FaCheckCircle className="text-cyan-400 text-xs mt-1 shrink-0" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TECH STACK BADGES */}
                <div className="pt-4 border-t border-cyan-500/20">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Technologies Applied
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-lg bg-cyan-950/50 border border-cyan-500/20 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;