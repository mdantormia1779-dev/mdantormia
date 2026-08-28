"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaUser, FaCheck, FaCopy, FaDownload, FaArrowRight, FaCode, FaRocket } from "react-icons/fa";
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
    "Clean, modular & reusable React / Next.js code",
    "Modern UI/UX implementation with Tailwind CSS & GSAP",
    "RESTful API design and database modeling with MongoDB",
    "Performance optimization & responsive mobile-first layouts",
  ];

  return (
    <section ref={containerRef} className="py-14 sm:py-16 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-16">
        
        {/* SECTION HEADER */}
        <div className="about-reveal text-center md:text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2.5">
            <FaUser className="text-xs" />
            Discover My Story
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            About <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-1.5">
            Passionate frontend engineer turning real-world business challenges into seamless web applications.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT BENTO: DETAILED BIO */}
          <div className="about-reveal lg:col-span-7 bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-2.5 text-cyan-400 font-semibold text-base sm:text-lg">
                <h3>Frontend Developer & Digital Creator</h3>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Hi, I am <span className="text-white font-bold">Md Antor Mia</span>. I specialize in building modern, high-performance web applications using <span className="text-cyan-300 font-semibold">React</span>, <span className="text-indigo-300 font-semibold">Next.js</span>, <span className="text-white font-semibold">Tailwind CSS</span>, and modern JavaScript.
              </p>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Whether creating interactive dashboards, responsive landing pages, or full-stack web platforms, I focus on delivering clean code, intuitive UI/UX design, and smooth animations that keep users engaged.
              </p>

              {/* HIGHLIGHT BULLETS */}
              <div className="pt-1 space-y-2">
                {highlights.map((point, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                      <FaCheck className="text-[10px]" />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                <span>Read Full Biography</span>
                <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/antor.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-medium transition-all"
              >
                <FaDownload className="text-xs text-indigo-400" />
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT BENTO: QUICK INFO & CONTACT CARD */}
          <div className="about-reveal lg:col-span-5 bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                <FaCode className="text-indigo-400" /> Quick Details
              </h3>

              <div className="space-y-3">
                {[
                  { icon: FaUser, label: "Name", value: "Md Antor Mia", copyable: false },
                  { icon: MdEmail, label: "Email", value: "mdantormia1779@gmail.com", copyable: true },
                  { icon: FaPhoneAlt, label: "Phone", value: "01318964063", copyable: true },
                  { icon: FaLocationDot, label: "Location", value: "Gaibandha, Bangladesh", copyable: false },
                  { icon: MdWork, label: "Experience", value: "Intern @ JEVXO Software", copyable: false },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  const isCopied = copiedKey === item.label;

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] text-gray-400 font-medium">{item.label}</p>
                          <p className="text-xs sm:text-sm font-semibold text-white truncate">{item.value}</p>
                        </div>
                      </div>

                      {item.copyable && (
                        <button
                          onClick={() => handleCopy(item.value, item.label)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-gray-400 hover:text-indigo-300 transition-colors shrink-0"
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
            <div className="mt-5 p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 text-center">
              <p className="text-xs text-indigo-300 font-medium">
                 Actively seeking frontend and full-stack software roles
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;