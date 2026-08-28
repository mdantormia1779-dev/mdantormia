"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UploadCloud, FolderPlus, Sparkles, ExternalLink, Layers, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

const ErrorMsg = ({ msg }) => (
  <p className="text-red-400 text-xs mt-1 ml-1">{msg}</p>
);

const CreateProject = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    category: "Full Stack",
    description: "",
    tech: "",
    github: "",
    live: "",
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.image) tempErrors.image = "Project image is required";
    if (!formData.name) tempErrors.name = "Project name is required";
    if (!formData.description) tempErrors.description = "Description is required";
    if (!formData.tech) tempErrors.tech = "Tech stack is required (e.g. React, Next.js)";
    if (!formData.github) tempErrors.github = "GitHub repository link is required";
    if (!formData.live) tempErrors.live = "Live preview URL is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "852d1dae776be32b40e694f48fea8d19";
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        { method: "POST", body: formDataImg }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
        setErrors((prev) => ({ ...prev, image: "" }));
        toast.success("Image uploaded successfully! 🎉");
      } else {
        toast.error("Upload failed! You can also paste an image URL directly.");
      }
    } catch {
      toast.error("Image upload failed! Please check connection.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    const finalData = {
      ...formData,
      tech: formData.tech.split(",").map((t) => t.trim()),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Project published successfully! 🚀");
        setFormData({
          image: "",
          name: "",
          category: "Full Stack",
          description: "",
          tech: "",
          github: "",
          live: "",
        });
      } else {
        toast.error(data.message || "Failed to save project.");
      }
    } catch (error) {
      toast.error(error.message || "Server connection error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const techList = formData.tech
    ? formData.tech.split(",").map((t) => t.trim()).filter(Boolean)
    : ["React", "Next.js", "Tailwind CSS"];

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
            Create New Project
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Publish a new project with live preview to showcase on your portfolio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORM COLUMN */}
        <div className="lg:col-span-7 bg-[#0b1120]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Image Upload Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 ml-1">
                Project Image
              </label>
              <label className="cursor-pointer group block">
                <div
                  className={`relative border-2 border-dashed ${
                    errors.image ? "border-red-500" : "border-white/10"
                  } group-hover:border-indigo-500 transition-all rounded-2xl p-6 text-center bg-[#030712]/60`}
                >
                  {formData.image ? (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden">
                      <Image
                        src={formData.image}
                        alt="preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-indigo-400 transition py-4">
                      <UploadCloud size={36} />
                      <p className="text-xs sm:text-sm font-semibold">
                        Click to upload project cover image
                      </p>
                      <p className="text-[11px] text-gray-500">
                        PNG, JPG, WebP supported
                      </p>
                    </div>
                  )}
                  {uploading && (
                    <p className="text-indigo-400 mt-2 text-xs font-semibold animate-pulse">
                      Uploading image to server...
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && handleImageUpload(e.target.files[0])
                  }
                />
              </label>
              {errors.image && <ErrorMsg msg={errors.image} />}

              {/* Direct image URL input option */}
              <div className="pt-1">
                <input
                  type="text"
                  name="image"
                  placeholder="Or paste direct image URL (https://...)"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full text-xs p-2.5 rounded-xl bg-[#030712]/80 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Title & Category Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 ml-1">
                  Project Title
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Modern E-Commerce Platform"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#030712]/80 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                {errors.name && <ErrorMsg msg={errors.name} />}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 ml-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#030712]/80 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Full Stack">Full Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Next.js">Next.js</option>
                  <option value="MERN Stack">MERN Stack</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 ml-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Briefly describe the key features, architecture, and purpose of this project..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded-xl bg-[#030712]/80 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              />
              {errors.description && <ErrorMsg msg={errors.description} />}
            </div>

            {/* Tech Stack */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 ml-1">
                Tech Stack (Comma Separated)
              </label>
              <input
                type="text"
                name="tech"
                placeholder="Next.js 15, React, MongoDB, Tailwind CSS"
                value={formData.tech}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-[#030712]/80 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              {errors.tech && <ErrorMsg msg={errors.tech} />}
            </div>

            {/* GitHub and Live Links */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 ml-1">
                  GitHub URL
                </label>
                <input
                  type="text"
                  name="github"
                  placeholder="https://github.com/..."
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#030712]/80 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                {errors.github && <ErrorMsg msg={errors.github} />}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 ml-1">
                  Live Demo URL
                </label>
                <input
                  type="text"
                  name="live"
                  placeholder="https://myproject.vercel.app"
                  value={formData.live}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#030712]/80 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                {errors.live && <ErrorMsg msg={errors.live} />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || uploading}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Publishing Project...</span>
              ) : (
                <>
                  <FolderPlus size={16} />
                  <span>Publish Project to Portfolio</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* LIVE PREVIEW COLUMN */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 px-1 text-gray-300 font-bold text-sm">
            <Sparkles size={16} className="text-cyan-400" />
            <span>Live Card Preview</span>
          </div>

          <div className="bg-[#0b1120]/75 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            <div>
              {/* Preview Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-[#030712]">
                    <Layers size={36} className="mb-1 text-gray-700" />
                    <span className="text-xs font-semibold">Image Preview</span>
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#030712]/80 backdrop-blur-md text-cyan-300 border border-white/15 font-medium">
                    {formData.category}
                  </span>
                </div>
              </div>

              {/* Preview Details */}
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-white line-clamp-1">
                  {formData.name || "Your Project Name"}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                  {formData.description ||
                    "Your project description will appear here on your portfolio card."}
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {techList.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-300 border border-white/5 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Footer */}
            <div className="p-5 pt-0 border-t border-white/5 mt-auto flex items-center justify-between gap-4">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <FaGithub size={14} /> Code
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                Live Demo <ExternalLink size={12} />
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateProject;
