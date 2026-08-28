"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaCode,
  FaLaptopCode,
  FaRocket,
  FaGraduationCap,
  FaDownload,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import gsap from "gsap";

const AboutPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-page-hero", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".about-page-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    {
      icon: <FaUser className="text-cyan-400" />,
      title: "Who I Am",
      desc: "A passionate Frontend & MERN Developer from Bangladesh focused on crafting modern, lightning-fast digital products.",
    },
    {
      icon: <FaGraduationCap className="text-indigo-400" />,
      title: "Education",
      desc: "Currently pursuing a Diploma in Computer Science & Technology at Habiganj Polytechnic Institute.",
    },
    {
      icon: <FaLaptopCode className="text-purple-400" />,
      title: "Core Stack",
      desc: "High proficiency in React, Next.js 15, JavaScript ES6+, Tailwind CSS, Node.js, and MongoDB.",
    },
    {
      icon: <FaRocket className="text-pink-400" />,
      title: "My Vision",
      desc: "Creating high-impact scalable web platforms and continuously growing into an industry-leading Full Stack Engineer.",
    },
  ];

  const principles = [
    {
      title: "Clean & Maintainable Code",
      desc: "Writing modular, self-documenting code with reusable components and organized architecture.",
    },
    {
      title: "Performance & SEO Focused",
      desc: "Optimizing Core Web Vitals, server-side rendering with Next.js, and lightweight asset delivery.",
    },
    {
      title: "Pixel-Perfect Responsive UI",
      desc: "Ensuring every layout shines seamlessly across mobile phones, tablets, laptops, and ultra-wide screens.",
    },
    {
      title: "Continuous Learning & Growth",
      desc: "Constantly mastering new tools, frameworks, and modern web development best practices.",
    },
  ];

  return (
    <div ref={containerRef} className="py-16 md:py-24 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="about-page-hero inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <FaUser className="text-xs" />
            Full Biography
          </div>
          <h1 className="about-page-hero text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Driven by Passion,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Powered by Code
            </span>
          </h1>
          <p className="about-page-hero text-gray-400 text-base sm:text-lg leading-relaxed">
            Get to know more about my background, development philosophy, and journey as a software developer.
          </p>
        </div>

        {/* HERO BIO CARD */}
        <div className="about-page-hero bg-[#0b1120]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl mb-16 relative overflow-hidden">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-indigo-500/30 p-2 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 shadow-2xl">
                <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#030712]">
                  <Image
                    src="/antor.png"
                    alt="Md Antor Mia"
                    fill
                    priority
                    sizes="(max-width: 768px) 220px, 250px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Hi, Im <span className="text-cyan-400">Md Antor Mia</span>
              </h2>

              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                I am a dedicated Frontend and MERN Stack Developer based in Bangladesh. My journey in web development started with curiosity and has grown into a relentless drive to craft user-centric digital experiences that solve real-world problems.
              </p>

              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Over the past few years, I have built numerous interactive web applications, gained hands-on industrial internship experience at JEVXO Software, and sharpened my abilities in modern full-stack workflows.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="/antor.pdf"
                  download
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold text-sm text-white shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <FaDownload /> Download Resume
                </a>

                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2"
                >
                  <FiSend className="text-cyan-400" /> Let’s Talk
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* MILESTONE CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {milestones.map((card, idx) => (
            <div
              key={idx}
              className="about-page-card bg-[#0b1120]/60 backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CORE DEVELOPMENT PRINCIPLES */}
        <div className="about-page-hero bg-[#0b1120]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10">
            My Core <span className="text-indigo-400">Development Philosophy</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-all flex items-start gap-4"
              >
                <FaCheckCircle className="text-indigo-400 text-xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{p.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
