"use client";

import Image from "next/image";
import React from "react";
import { FaGithub, FaFolder } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export const fallbackProjects = [
  {
    _id: "p1",
    name: "DevSphere - Developer Community Platform",
    description:
      "A full-stack social platform for developers featuring technical article publishing, interactive code snippets, bookmarking, and discussion threads.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    category: "Full Stack",
    tech: ["Next.js 15", "React", "MongoDB", "Tailwind CSS", "Better Auth"],
    github: "https://github.com/mdantormia1779-dev",
    live: "https://mdantormia.vercel.app",
    featured: true,
    updatedAt: "2026-08-28T18:00:00.000Z",
  },
  {
    _id: "p2",
    name: "ShopVibe - Modern E-Commerce Platform",
    description:
      "Modern e-commerce store with product filtering, cart drawer, checkout workflow, Stripe payment gateway, and responsive dashboard.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    category: "Full Stack",
    tech: ["React.js", "Node.js", "Express.js", "Redux Toolkit", "MongoDB"],
    github: "https://github.com/mdantormia1779-dev",
    live: "https://mdantormia.vercel.app",
    featured: true,
    updatedAt: "2026-08-27T12:00:00.000Z",
  },
  {
    _id: "p3",
    name: "TaskSync - Team Task Management Dashboard",
    description:
      "Collaborative task management tool with drag-and-drop kanban boards, priority tagging, analytics chart reporting, and real-time status updates.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    category: "Frontend",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "DaisyUI"],
    github: "https://github.com/mdantormia1779-dev",
    live: "https://mdantormia.vercel.app",
    featured: true,
    updatedAt: "2026-08-26T10:00:00.000Z",
  },
  {
    _id: "p4",
    name: "PulseUI - SaaS Landing & Component System",
    description:
      "Ultra-modern SaaS landing page with dark glassmorphic design, smooth GSAP animations, pricing calculators, and responsive interactive elements.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    category: "Frontend",
    tech: ["React.js", "GSAP", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/mdantormia1779-dev",
    live: "https://mdantormia.vercel.app",
    featured: false,
    updatedAt: "2026-08-25T08:00:00.000Z",
  },
  {
    _id: "p5",
    name: "LearnNest - Educational Course Hub",
    description:
      "Online learning platform allowing students to browse curated video tutorials, track quiz progress, download notes, and receive certificates.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    category: "Full Stack",
    tech: ["Next.js", "MongoDB", "Express", "Node.js", "Tailwind"],
    github: "https://github.com/mdantormia1779-dev",
    live: "https://mdantormia.vercel.app",
    featured: false,
    updatedAt: "2026-08-24T06:00:00.000Z",
  },
];

export const sortProjectsByRecent = (projects = []) => {
  if (!Array.isArray(projects)) return [];
  return [...projects].sort((a, b) => {
    // 1. Compare updatedAt timestamp
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    if (dateA && dateB && dateA !== dateB) {
      return dateB - dateA;
    }

    // 2. Compare createdAt timestamp
    const createA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const createB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (createA && createB && createA !== createB) {
      return createB - createA;
    }

    // 3. Fallback to MongoDB ObjectId creation time comparison (hex string)
    if (
      typeof a._id === "string" &&
      typeof b._id === "string" &&
      a._id.length === 24 &&
      b._id.length === 24
    ) {
      return b._id.localeCompare(a._id);
    }

    return 0;
  });
};

const Card = ({ projectData = [], limit, category = "All" }) => {
  // Always sort so updated & new projects appear FIRST
  const rawList =
    Array.isArray(projectData) && projectData.length > 0
      ? sortProjectsByRecent(projectData)
      : fallbackProjects;

  const filtered =
    category === "All"
      ? rawList
      : rawList.filter(
          (p) =>
            p.category?.toLowerCase() === category.toLowerCase() ||
            p.tech?.some((t) =>
              t.toLowerCase().includes(category.toLowerCase())
            )
        );

  const displayData = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayData.map((project, index) => (
        <div
          key={project.id || project._id || index}
          className="project-card group bg-[#091d34]/80 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-400/60 rounded-3xl overflow-hidden shadow-xl shadow-cyan-950/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-950/80 flex flex-col justify-between"
        >
          <div>
            {/* PROJECT PREVIEW IMAGE */}
            <div className="relative h-52 w-full overflow-hidden bg-[#07192d]">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.name || "Project"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#07192d] text-slate-500">
                  <FaFolder size={48} />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#091d34] via-transparent to-transparent opacity-80" />

              {/* Category Pill */}
              {project.category && (
                <div className="absolute top-4 left-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#07192d]/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-medium shadow-md">
                    {project.category}
                  </span>
                </div>
              )}
            </div>

            {/* CONTENT AREA */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
                {project.name}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-5 font-normal">
                {project.description}
              </p>

              {/* TECH BADGES */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech?.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/50 text-slate-200 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS FOOTER */}
          <div className="p-6 pt-2 border-t border-cyan-500/20 mt-auto flex items-center justify-between gap-4">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <FaGithub size={16} />
                <span>Code</span>
              </a>
            ) : (
              <span className="text-xs text-slate-500">Source Private</span>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-200 hover:text-white border border-cyan-500/30 text-sm font-semibold transition-all group/live shadow-sm backdrop-blur-md"
              >
                <span>Live Demo</span>
                <FiArrowUpRight className="text-base text-cyan-400 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;