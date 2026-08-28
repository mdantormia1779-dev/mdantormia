"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaDownload, FaFacebook, FaGithub, FaLinkedin, FaCode, FaReact, FaNodeJs } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import { FiSend, FiArrowRight, FiSparkles } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import gsap from "gsap";

const Banner = () => {
  const containerRef = useRef(null);
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Left Content Stagger In
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Hero Right Avatar & Badges Entrance
      gsap.from(heroRightRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        ease: "back.out(1.7)",
        delay: 0.2,
      });

      // Floating Tech Badges Continuous Animation
      gsap.to(".orbit-badge-1", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orbit-badge-2", {
        y: 14,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(".orbit-badge-3", {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      gsap.to(".orbit-badge-4", {
        y: 12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.7,
      });

      // Stats Entrance
      gsap.from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/downloads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ downloadType: "CV" }),
      });
    } catch (error) {
      console.log("Download counter failed", error);
    }

    const link = document.createElement("a");
    link.href = "/antor.pdf";
    link.download = "Antor_CV.pdf";
    link.click();
  };

  const stats = [
    { number: "15+", label: "Projects Completed" },
    { number: "10+", label: "Modern Tech Mastered" },
    { number: "100%", label: "Code Dedication" },
    { number: "24/7", label: "Quick Communication" },
  ];

  return (
    <div ref={containerRef} className="relative pt-6 pb-16 md:py-20 overflow-hidden">
      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
          {/* LEFT COLUMN: HERO DETAILS */}
          <div ref={heroLeftRef} className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* AVAILABLE BADGE */}
            <div className="hero-anim inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-200 tracking-wide">
                Available for New Projects & Roles
              </span>
            </div>

            {/* NAME TITLE */}
            <div className="hero-anim space-y-2">
              <p className="text-gray-400 font-medium text-lg tracking-wide">
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none">
                Md Antor{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(99,102,241,0.3)]">
                  Mia
                </span>
              </h1>
            </div>

            {/* ROLE TYPEWRITER */}
            <div className="hero-anim flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-3xl font-bold text-gray-200 min-h-[40px]">
              <span className="text-indigo-400">Creative</span>
              <TypeAnimation
                sequence={[
                  "Frontend Developer",
                  2200,
                  "React & Next.js Engineer",
                  2200,
                  "MERN Stack Developer",
                  2200,
                  "UI/UX Implementation Specialist",
                  2200,
                ]}
                wrapper="span"
                speed={45}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 underline decoration-indigo-500/40 decoration-2 underline-offset-4"
              />
            </div>

            {/* BIO DESCRIPTION */}
            <p className="hero-anim text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              I build lightning-fast, visually captivating, and responsive web applications. Turning complex design and architectural ideas into seamless digital experiences with clean code.
            </p>

            {/* ACTION CTA BUTTONS */}
            <div className="hero-anim flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleDownload}
                className="group relative px-7 py-3.5 rounded-xl font-bold text-white shadow-xl shadow-indigo-500/25 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-transform duration-300 group-hover:scale-105" />
                <span className="relative flex items-center gap-2.5 text-sm sm:text-base">
                  <FaDownload className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Download CV
                </span>
              </button>

              <Link
                href="/project"
                className="px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 flex items-center gap-2 hover:text-white shadow-lg active:scale-95 group"
              >
                <span>View Projects</span>
                <FiArrowRight className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* SOCIAL CONNECT PILLS */}
            <div className="hero-anim pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
              <span className="font-medium text-gray-300">Connect with me:</span>
              <div className="flex items-center gap-3">
                {[
                  {
                    icon: FaGithub,
                    link: "https://github.com/mdantormia1779-dev",
                    label: "GitHub",
                    hover: "hover:border-white hover:text-white",
                  },
                  {
                    icon: FaLinkedin,
                    link: "https://www.linkedin.com/in/md-antor-mia-antor/",
                    label: "LinkedIn",
                    hover: "hover:border-cyan-400 hover:text-cyan-400",
                  },
                  {
                    icon: FaFacebook,
                    link: "https://www.facebook.com/share/17QnUSneqa/",
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
                      className={`w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${item.hover}`}
                    >
                      <Icon size={19} />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D AVATAR & FLOATING ORBIT SATELLITES */}
          <div ref={heroRightRef} className="lg:col-span-5 flex justify-center items-center relative py-6">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[380px] md:h-[380px]">
              
              {/* Outer Pulsing Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 blur-2xl opacity-40 animate-pulse pointer-events-none" />
              
              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full p-[4px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f1d] relative border-4 border-[#030712]">
                  <Image
                    src="/antor.png"
                    alt="Md Antor Mia - Developer"
                    fill
                    priority
                    sizes="(max-width: 768px) 280px, 380px"
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* SATELLITE TECH BADGE 1: React (Top Left) */}
              <div className="orbit-badge-1 absolute -top-4 -left-4 sm:top-2 sm:-left-6 px-3.5 py-2 rounded-2xl bg-[#0b1120]/90 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 flex items-center gap-2 z-20">
                <FaReact className="text-cyan-400 text-xl animate-spin-slow" />
                <span className="text-xs font-bold text-white">React.js</span>
              </div>

              {/* SATELLITE TECH BADGE 2: Next.js (Top Right) */}
              <div className="orbit-badge-2 absolute -top-4 -right-4 sm:top-4 sm:-right-4 px-3.5 py-2 rounded-2xl bg-[#0b1120]/90 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/40 flex items-center gap-2 z-20">
                <RiNextjsFill className="text-white text-xl" />
                <span className="text-xs font-bold text-white">Next.js 15</span>
              </div>

              {/* SATELLITE TECH BADGE 3: Node.js (Bottom Left) */}
              <div className="orbit-badge-3 absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-4 px-3.5 py-2 rounded-2xl bg-[#0b1120]/90 backdrop-blur-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/20 flex items-center gap-2 z-20">
                <FaNodeJs className="text-emerald-400 text-xl" />
                <span className="text-xs font-bold text-white">Node.js</span>
              </div>

              {/* SATELLITE TECH BADGE 4: MongoDB (Bottom Right) */}
              <div className="orbit-badge-4 absolute -bottom-4 -right-4 sm:bottom-2 sm:-right-6 px-3.5 py-2 rounded-2xl bg-[#0b1120]/90 backdrop-blur-xl border border-green-500/30 shadow-lg shadow-green-500/20 flex items-center gap-2 z-20">
                <SiMongodb className="text-green-500 text-xl" />
                <span className="text-xs font-bold text-white">MongoDB</span>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM STATS COUNTER BAR */}
        <div ref={statsRef} className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 text-center group hover:bg-white/[0.04]"
              >
                <h3 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
