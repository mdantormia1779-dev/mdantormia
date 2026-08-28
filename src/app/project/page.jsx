"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaFolderOpen, FaSearch, FaFilter } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Card, { fallbackProjects } from "../components/Card.jsx/Card";
import Link from "next/link";
import gsap from "gsap";

const ProjectPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (process.env.NEXT_PUBLIC_API_URL) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/projects`
          );
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            setProjectData(data.data);
          } else if (Array.isArray(data)) {
            setProjectData(data);
          }
        }
      } catch (error) {
        console.log("Using fallback projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    const ctx = gsap.context(() => {
      gsap.from(".project-page-header", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const rawProjects =
    projectData.length > 0 ? projectData : fallbackProjects;

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
    <div ref={containerRef} className="py-16 md:py-24 text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="project-page-header inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <FaFolderOpen className="text-xs" />
            Complete Portfolio
          </div>
          <h1 className="project-page-header text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            All Creative <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="project-page-header text-gray-400 text-base sm:text-lg">
            Explore web applications, frontend architectures, client projects, and full-stack software.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="project-page-header mb-12 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-xl">
          
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
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
          <div className="text-center py-20 bg-[#0b1120]/40 rounded-3xl border border-white/5 p-8">
            <FaFolderOpen className="text-5xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-300 mb-2">No Projects Match Your Search</h3>
            <p className="text-sm text-gray-500 mb-6">
              Try searching with different keywords like &quot;React&quot;, &quot;Next.js&quot;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* CALL TO ACTION */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900/30 via-[#0b1120] to-cyan-900/30 border border-white/10 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a project in mind or need a custom build?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Let&apos;s team up to build an exceptional digital product that delivers real value.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold shadow-xl shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all"
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
