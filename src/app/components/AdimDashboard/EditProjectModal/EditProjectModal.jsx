"use client";

import React from "react";
import Image from "next/image";
import { X, UploadCloud, Save } from "lucide-react";

const EditProjectModal = ({
  isOpen,
  onClose,
  editingProject,
  setEditingProject,
  handleUpdate,
  handleImageUpload,
  uploading,
}) => {
  if (!isOpen || !editingProject) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#0b1120] border border-white/10 p-6 sm:p-8 rounded-3xl w-full max-w-xl relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          Edit Project
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          
          {/* Image Preview & Upload */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">
              Project Image
            </label>
            <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-900 border border-white/10">
              <Image
                src={editingProject.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"}
                alt="preview"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <label className="flex-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 flex items-center justify-center gap-2 cursor-pointer transition">
                <UploadCloud size={14} className="text-indigo-400" />
                <span>Upload New File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && handleImageUpload(e.target.files[0])
                  }
                  className="hidden"
                />
              </label>

              <input
                type="text"
                value={editingProject.image || ""}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, image: e.target.value })
                }
                placeholder="Or paste image URL"
                className="flex-1 p-2 rounded-xl bg-[#030712] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {uploading && (
              <p className="text-indigo-400 text-xs font-semibold animate-pulse">
                Uploading new image...
              </p>
            )}
          </div>

          {/* Name & Category */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Project Name</label>
              <input
                type="text"
                value={editingProject.name || ""}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, name: e.target.value })
                }
                className="w-full p-2.5 bg-[#030712] rounded-xl text-white text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">Category</label>
              <select
                value={editingProject.category || "Full Stack"}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    category: e.target.value,
                  })
                }
                className="w-full p-2.5 bg-[#030712] rounded-xl text-white text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Next.js">Next.js</option>
                <option value="MERN Stack">MERN Stack</option>
              </select>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={editingProject.tech || ""}
              onChange={(e) =>
                setEditingProject({ ...editingProject, tech: e.target.value })
              }
              placeholder="React, Next.js, MongoDB"
              className="w-full p-2.5 bg-[#030712] rounded-xl text-white text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs text-gray-400">Description</label>
            <textarea
              rows={3}
              value={editingProject.description || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  description: e.target.value,
                })
              }
              className="w-full p-2.5 bg-[#030712] rounded-xl text-white text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* GitHub & Live URLs */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-400">GitHub Link</label>
              <input
                type="text"
                value={editingProject.github || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    github: e.target.value,
                  })
                }
                className="w-full p-2.5 bg-[#030712] rounded-xl text-white text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400">Live Demo Link</label>
              <input
                type="text"
                value={editingProject.live || ""}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, live: e.target.value })
                }
                className="w-full p-2.5 bg-[#030712] rounded-xl text-white text-xs sm:text-sm border border-white/10 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 rounded-xl text-xs font-bold text-white transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <Save size={14} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
