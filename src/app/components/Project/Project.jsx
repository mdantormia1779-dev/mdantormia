"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa";
import Card, { fallbackProjects } from "../Card.jsx/Card";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Project = () => {
  const [projectData, setProjectData] = useState(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fast background fetch with timeout
    const fetchProjects = async () => {
      if (!process.env.NEXT_PUBLIC_API_URL) return;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        const result = await response.json();
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          setProjectData(result.data);
        } else if (Array.isArray(result) && result.length > 0) {
          setProjectData(result);
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
    <section ref={containerRef} className="py-14 sm:py-16 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-16">
        
        {/* HEADER & FILTER */}
        <div className="project-section-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2.5">
              <FaFolderOpen className="text-xs" />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Recent <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-1.5">
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
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}

            <Link
              href="/project"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition-all ml-1 group"
            >
              <span>Explore All</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-md"
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