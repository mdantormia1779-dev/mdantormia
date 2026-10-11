"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa";
import Card, { fallbackProjects, sortProjectsByRecent } from "../Card.jsx/Card";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Project = () => {
  const [projectData, setProjectData] = useState(sortProjectsByRecent(fallbackProjects));
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fast background fetch with timeout and sorting
    const fetchProjects = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const response = await fetch(
          `${apiUrl}/projects`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        const result = await response.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setProjectData(sortProjectsByRecent(result.data));
        } else if (Array.isArray(result) && result.length > 0) {
          setProjectData(sortProjectsByRecent(result));
        }
      } catch {
        // Silently use fallback projects
      }
    };

    fetchProjects();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-section-reveal",
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

  const categories = ["All", "Full Stack", "Frontend", "Next.js"];

  return (
    <section ref={containerRef} className="py-6 sm:py-6 text-white relative bg-[#07192d] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-cyan-500/20 pb-16 relative z-10">
        
        {/* HEADER & FILTER */}
        <div className="project-section-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2.5 backdrop-blur-md">
              <FaFolderOpen className="text-xs text-cyan-400" />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Recent <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mt-1.5 font-normal">
              A curated collection of web applications, client portals, and open-source software experiments.
            </p>
          </div>

          {/* CATEGORY TABS & VIEW ALL */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-950/60"
                    : "bg-cyan-950/40 text-slate-300 hover:text-white hover:bg-cyan-900/50 border border-cyan-500/20"
                }`}
              >
                {cat}
              </button>
            ))}

            <Link
              href="/project"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-xs sm:text-sm font-semibold text-cyan-200 hover:text-white transition-all ml-1 group backdrop-blur-md"
            >
              <span>Explore All</span>
              <FaArrowRight className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="w-full">
          <Card projectData={projectData} limit={3} category={activeCategory} />
        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mt-10 text-center lg:hidden">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-cyan-950/50 active:scale-95 transition-transform"
          >
            <span>View All Projects</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Project;