"use client";

import React, { useEffect, useState } from "react";
import { Edit, Trash2, Search, ExternalLink, FolderKanban, ArrowLeft, Plus } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import EditProjectModal from "@/app/components/AdimDashboard/EditProjectModal/EditProjectModal";
import DeleteProjectModal from "@/app/components/AdimDashboard/DeleteProjectModal/DeleteProjectModal";
import { fallbackProjects, sortProjectsByRecent } from "@/app/components/Card.jsx/Card";

const ManageProject = () => {
  const [projects, setProjects] = useState(sortProjectsByRecent(fallbackProjects));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch Projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      if (!process.env.NEXT_PUBLIC_API_URL) return;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(sortProjectsByRecent(data.data));
        } else if (Array.isArray(data) && data.length > 0) {
          setProjects(sortProjectsByRecent(data));
        }
      } catch {
        // Keep fallback projects
      }
    };
    fetchProjects();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "852d1dae776be32b40e694f48fea8d19";
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formDataImg,
        }
      );
      const data = await res.json();

      if (data.success) {
        setEditingProject((prev) => ({ ...prev, image: data.data.url }));
        toast.success("Image updated! 🎉");
      }
    } catch {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const { _id, ...rest } = editingProject;
      const now = new Date().toISOString();

      const techArray =
        typeof rest.tech === "string"
          ? rest.tech.split(",").map((t) => t.trim())
          : rest.tech;

      const updatedPayload = {
        ...rest,
        tech: techArray,
        updatedAt: now,
      };

      if (process.env.NEXT_PUBLIC_API_URL) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPayload),
          }
        );
        const data = await res.json();
        if (!data.success) {
          toast.info("Updated in active session.");
        }
      }

      // Move updated project to the VERY TOP (index 0) of the list
      const updatedItem = {
        ...editingProject,
        ...updatedPayload,
      };

      setProjects((prev) =>
        sortProjectsByRecent([
          updatedItem,
          ...prev.filter((p) => p._id !== _id),
        ])
      );

      toast.success("Project updated and moved to first position! 🚀");
      setIsEditModalOpen(false);
      setEditingProject(null);
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      if (process.env.NEXT_PUBLIC_API_URL) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectToDelete._id}`,
          { method: "DELETE" }
        );
      }

      setProjects((prev) =>
        prev.filter((p) => p._id !== projectToDelete._id)
      );
      toast.success("Project deleted successfully! 🗑️");
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    } catch {
      toast.error("Delete failed!");
    }
  };

  const categories = ["All", "Full Stack", "Frontend", "Next.js"];

  const filteredProjects = projects.filter((project) => {
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

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Manage Projects
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Edit details, update tech stacks, or remove portfolio items (recently updated appear first)
          </p>
        </div>

        <Link
          href="/admin/createproject"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={16} /> Create Project
        </Link>
      </div>

      {/* SEARCH AND CATEGORY FILTER */}
      <div className="p-4 rounded-2xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#030712]/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p._id}
              className="bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 hover:border-indigo-500/30 rounded-3xl p-5 shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-900 mb-4">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600">
                      <FolderKanban size={32} />
                    </div>
                  )}
                  {p.category && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#030712]/80 backdrop-blur-md text-cyan-300 border border-white/15 font-medium">
                        {p.category}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-lg text-white line-clamp-1 mb-1.5">
                  {p.name}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
                  {p.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tech?.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white/[0.04] text-gray-300 px-2 py-0.5 rounded-md border border-white/5 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-3 border-t border-white/5 flex gap-2">
                <button
                  onClick={() => {
                    const techStr = Array.isArray(p.tech) ? p.tech.join(", ") : p.tech || "";
                    setEditingProject({ ...p, tech: techStr });
                    setIsEditModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 rounded-xl text-xs font-semibold border border-indigo-500/20 transition cursor-pointer"
                >
                  <Edit size={14} /> Edit
                </button>
                
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs transition"
                    title="Live Preview"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}

                <button
                  onClick={() => {
                    setProjectToDelete(p);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-xs transition cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0b1120]/40 rounded-3xl border border-white/5 p-8">
          <FolderKanban className="text-4xl text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-300 mb-1">No Projects Found</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-5">
            Try adjusting your search query or add a new project.
          </p>
          <Link
            href="/admin/createproject"
            className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-semibold inline-block"
          >
            Create New Project
          </Link>
        </div>
      )}

      {/* MODALS */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editingProject={editingProject}
        setEditingProject={setEditingProject}
        handleUpdate={handleUpdate}
        handleImageUpload={handleImageUpload}
        uploading={uploading}
      />

      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        project={projectToDelete}
      />
    </div>
  );
};

export default ManageProject;
