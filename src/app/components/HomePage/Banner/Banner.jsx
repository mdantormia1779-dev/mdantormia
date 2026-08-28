"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaDownload, FaFacebook, FaGithub, FaLinkedin, FaReact, FaNodeJs } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import gsap from "gsap";

const Banner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snappy and instant hero entrance (no long delay or blank flashes)
      gsap.fromTo(
        ".hero-anim",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-avatar",
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Light orbit animations
      gsap.to(".orbit-badge-1", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-badge-2", {
        y: 8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-badge-3", {
        y: -7,
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-badge-4", {
        y: 7,
        duration: 2.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    // Non-blocking download trigger
    const link = document.createElement("a");
    link.href = "/antor.pdf";
    link.download = "Antor_CV.pdf";
    link.click();

    // Track silently in background
    if (process.env.NEXT_PUBLIC_API_URL) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/downloads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ downloadType: "CV" }),
      }).catch(() => {});
    }
  };

  return (
    <div ref={containerRef} className="relative pt-4 pb-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[65vh]">
          
          {/* LEFT COLUMN: HERO DETAILS */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* AVAILABLE BADGE */}
            <div className="hero-anim inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-200 tracking-wide">
                Available for New Projects & Roles
              </span>
            </div>

            {/* NAME TITLE */}
            <div className="hero-anim space-y-1.5">
              <p className="text-gray-400 font-medium text-base sm:text-lg tracking-wide">
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
                Md Antor{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Mia
                </span>
              </h1>
            </div>

            {/* ROLE TYPEWRITER */}
            <div className="hero-anim flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-2xl lg:text-3xl font-bold text-gray-200 min-h-[36px]">
              <span className="text-indigo-400">Creative</span>
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
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 underline decoration-indigo-500/40 decoration-2 underline-offset-4"
              />
            </div>

            {/* BIO DESCRIPTION */}
            <p className="hero-anim text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              I build lightning-fast, visually captivating, and responsive web applications. Turning complex ideas into seamless digital products with clean code.
            </p>

            {/* ACTION CTA BUTTONS */}
            <div className="hero-anim flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleDownload}
                className="group relative px-6 sm:px-7 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/25 overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-transform duration-200 group-hover:scale-105" />
                <span className="relative flex items-center gap-2">
                  <FaDownload className="text-xs transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Download CV
                </span>
              </button>

              <Link
                href="/project"
                className="px-6 sm:px-7 py-3 rounded-xl font-semibold text-sm sm:text-base text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 transition-all duration-200 flex items-center gap-2 hover:text-white shadow-md active:scale-95 group"
              >
                <span>View Projects</span>
                <FiArrowRight className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* SOCIAL CONNECT PILLS */}
            <div className="hero-anim pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 text-xs sm:text-sm text-gray-400">
              <span className="font-medium text-gray-300">Connect with me:</span>
              <div className="flex items-center gap-2.5">
                {[
                  {
                    icon: FaGithub,
                    link: "https://github.com/mdantormia1779-dev",
                    label: "GitHub",
                    hover: "hover:border-white hover:text-white",
                  },
                  {
                    icon: FaLinkedin,
                    link: "www.linkedin.com/in/mdantormia",
                    label: "LinkedIn",
                    hover: "hover:border-cyan-400 hover:text-cyan-400",
                  },
                  {
                    icon: FaFacebook,
                    link: "https://www.facebook.com/md.antormia.1779",
                    label: "Facebook",
                    hover: "hover:border-indigo-400 hover:text-indigo-400",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-200 hover:scale-110 ${item.hover}`}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PROFILE AVATAR & ORBIT BADGES */}
          <div className="hero-avatar lg:col-span-5 flex justify-center items-center relative py-4">
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[350px] md:h-[350px]">
              
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 blur-xl opacity-30 pointer-events-none" />
              
              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f1d] relative border-4 border-[#030712]">
                  <Image
                    src="/antor.png"
                    alt="Md Antor Mia - Developer"
                    fill
                    priority
                    sizes="(max-width: 768px) 260px, 350px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* ORBIT BADGE 1: React */}
              <div className="orbit-badge-1 absolute -top-3 -left-3 sm:top-2 sm:-left-4 px-3 py-1.5 rounded-xl bg-[#0b1120]/95 backdrop-blur-md border border-cyan-500/30 shadow-md flex items-center gap-1.5 z-20">
                <FaReact className="text-cyan-400 text-lg" />
                <span className="text-xs font-bold text-white">React.js</span>
              </div>

              {/* ORBIT BADGE 2: Next.js */}
              <div className="orbit-badge-2 absolute -top-3 -right-3 sm:top-3 sm:-right-3 px-3 py-1.5 rounded-xl bg-[#0b1120]/95 backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5 z-20">
                <RiNextjsFill className="text-white text-lg" />
                <span className="text-xs font-bold text-white">Next.js</span>
              </div>

              {/* ORBIT BADGE 3: Node.js */}
              <div className="orbit-badge-3 absolute -bottom-3 -left-3 sm:bottom-3 sm:-left-3 px-3 py-1.5 rounded-xl bg-[#0b1120]/95 backdrop-blur-md border border-emerald-500/30 shadow-md flex items-center gap-1.5 z-20">
                <FaNodeJs className="text-emerald-400 text-lg" />
                <span className="text-xs font-bold text-white">Node.js</span>
              </div>

              {/* ORBIT BADGE 4: MongoDB */}
              <div className="orbit-badge-4 absolute -bottom-3 -right-3 sm:bottom-2 sm:-right-4 px-3 py-1.5 rounded-xl bg-[#0b1120]/95 backdrop-blur-md border border-green-500/30 shadow-md flex items-center gap-1.5 z-20">
                <SiMongodb className="text-green-500 text-lg" />
                <span className="text-xs font-bold text-white">MongoDB</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
