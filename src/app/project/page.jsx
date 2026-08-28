"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaFolderOpen, FaSearch } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Card, { fallbackProjects, sortProjectsByRecent } from "../components/Card.jsx/Card";
import Link from "next/link";
import gsap from "gsap";

const ProjectPage = () => {
  const [projectData, setProjectData] = useState(sortProjectsByRecent(fallbackProjects));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!process.env.NEXT_PUBLIC_API_URL) return;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjectData(sortProjectsByRecent(data.data));
        } else if (Array.isArray(data) && data.length > 0) {
          setProjectData(sortProjectsByRecent(data));
        }
      } catch {
        // Silently use fallback projects
      }
    };

    fetchProjects();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-page-header",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const rawProjects =
    projectData.length > 0 ? sortProjectsByRecent(projectData) : fallbackProjects;

  const filteredProjects = rawProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" ||
      project.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      project.tech?.some((t) =>
        t.toLowerCase().includes(selectedCategory.toLowerCase())
      );

    const matchesSearch =
      project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech?.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Full Stack", "Frontend", "Next.js"];

  return (
    <div ref={containerRef} className="py-12 md:py-20 text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="project-page-header inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <FaFolderOpen className="text-xs" />
            Complete Portfolio
          </div>
          <h1 className="project-page-header text-3xl sm:text-5xl md:text-6xl font-black tracking-tight">
            All Creative <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="project-page-header text-gray-400 text-sm sm:text-base">
            Explore web applications, frontend architectures, client projects, and full-stack software.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="project-page-header mb-10 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-xl">
          
          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by name, tech (React, MongoDB)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#030712]/80 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* CATEGORIES */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length > 0 ? (
          <div className="w-full">
            <Card projectData={filteredProjects} category="All" />
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0b1120]/40 rounded-3xl border border-white/5 p-8">
            <FaFolderOpen className="text-4xl text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-300 mb-1">No Projects Match Your Search</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-5">
              Try searching with different keywords or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs sm:text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CALL TO ACTION */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-900/30 via-[#0b1120] to-cyan-900/30 border border-white/10 text-center space-y-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Have a project in mind or need a custom build?
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">
            Let&apos;s team up to build an exceptional digital product that delivers real value.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <FiSend /> Get in Touch
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectPage;
