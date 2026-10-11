"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaPhoneAlt,
  FaUser,
  FaCheck,
  FaCopy,
  FaDownload,
  FaArrowRight,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdWork } from "react-icons/md";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const containerRef = useRef(null);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
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

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const highlights = [
    "Expert in React.js, Next.js, TypeScript & Tailwind CSS UI design",
    "Full-Stack Development with Node.js, Prisma ORM, MongoDB & PostgreSQL",
    "AI Face Recognition, Liveness Verification & GPS Geofencing implementations",
    "E-Commerce solutions with Redux Toolkit, GSAP animations & Payment integration",
  ];

  return (
    <section
      ref={containerRef}
      className="pb-6 sm:pt-6 sm:pb-6 text-white relative bg-[#07192d]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 pb-16">
        {/* SECTION HEADER */}
        <div className="about-reveal text-center md:text-left mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2.5 backdrop-blur-md">
            <FaUser className="text-xs text-cyan-400" />
            Discover My Story
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
            Motivated MERN Stack & Full-Stack Developer turning complex business challenges into scalable, performant, and responsive web & mobile applications.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT BENTO: DETAILED BIO & HIGHLIGHTS */}
          <div className="about-reveal lg:col-span-7 bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-cyan-950/50 relative overflow-hidden">
            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-2.5 text-cyan-300 font-semibold text-base sm:text-lg">
                <FaBriefcase className="text-cyan-400" />
                <h3>Full-Stack & MERN Stack Developer</h3>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Hi, I am <span className="text-white font-bold">Md Antor Mia</span>. I specialize in building modern, scalable web and mobile applications using{" "}
                <span className="text-cyan-300 font-semibold">React.js</span>,{" "}
                <span className="text-sky-300 font-semibold">Next.js</span>,{" "}
                <span className="text-indigo-300 font-semibold">TypeScript</span>,{" "}
                <span className="text-emerald-300 font-semibold">Node.js</span>, and modern database tools like Prisma, PostgreSQL, and MongoDB.
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                I have hands-on experience as a <span className="text-cyan-200 font-medium">Frontend Developer Intern</span> building responsive dashboards, as well as developing complex projects like an AI-powered Smart Attendance System (with GPS Geofencing) and Full-Stack E-Commerce platforms.
              </p>

              {/* HIGHLIGHT BULLETS */}
              <div className="pt-1 space-y-2">
                {highlights.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0 border border-emerald-500/30">
                      <FaCheck className="text-[10px]" />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-6 mt-6 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 relative z-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                <span>Read Full Biography</span>
                <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/api/cv/download"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-white text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95"
              >
                <FaDownload className="text-xs text-cyan-400" />
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT BENTO: QUICK INFO & CONTACT CARD */}
          <div className="about-reveal lg:col-span-5 bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-cyan-950/50 relative overflow-hidden">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 pb-2 border-b border-cyan-500/20">
                <FaCode className="text-cyan-400" /> Personal Overview
              </h3>

              <div className="space-y-2.5">
                {[
                  { icon: FaUser, label: "Name", value: "Md Antor Mia", copyable: false },
                  { icon: MdEmail, label: "Email", value: "mdantormia1779@gmail.com", copyable: true },
                  { icon: FaPhoneAlt, label: "Phone", value: "+8801318964063", copyable: true },
                  { icon: FaLocationDot, label: "Location", value: "Rangpur, Bangladesh", copyable: false },
                  { icon: MdWork, label: "Experience", value: "Frontend Intern @ JEVXO Software", copyable: false },
                  { icon: FaGraduationCap, label: "Education", value: "Diploma in CST (Habiganj Poly.)", copyable: false },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const isCopied = copiedKey === item.label;

                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/15 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] text-slate-400 font-medium">{item.label}</p>
                          <p className="text-xs sm:text-sm font-semibold text-white truncate">{item.value}</p>
                        </div>
                      </div>

                      {item.copyable && (
                        <button
                          onClick={() => handleCopy(item.value, item.label)}
                          className="p-1.5 rounded-lg bg-cyan-900/40 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-cyan-500/20 transition-colors shrink-0 cursor-pointer"
                          title="Copy to clipboard"
                        >
                          {isCopied ? <FaCheck className="text-emerald-400 text-xs" /> : <FaCopy className="text-xs" />}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STATUS CHIP */}
            <div className="mt-4 p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-center backdrop-blur-md">
              <p className="text-xs text-cyan-200 font-medium">
                Seeking Full-Stack / MERN Stack Opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;