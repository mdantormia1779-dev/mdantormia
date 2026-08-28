"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import Card from "../Card.jsx/Card";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fetchProjects = async () => {
      try {
        if (process.env.NEXT_PUBLIC_API_URL) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/projects`
          );
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            setProjectData(result.data);
          } else if (Array.isArray(result)) {
            setProjectData(result);
          }
        }
      } catch (error) {
        console.log("Using showcase fallback projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    const ctx = gsap.context(() => {
      gsap.from(".project-section-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = ["All", "Full Stack", "Frontend", "Next.js"];

  return (
    <section ref={containerRef} className="py-20 text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-20">
        
        {/* HEADER & FILTER */}
        <div className="project-section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
              <FaFolderOpen className="text-xs" />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Recent <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-2">
              A curated collection of web applications, client portals, and open-source software experiments.
            </p>
          </div>

          {/* CATEGORY TABS & VIEW ALL */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}

            <Link
              href="/project"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition-all ml-2 group"
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
        <div className="mt-12 text-center lg:hidden">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25"
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