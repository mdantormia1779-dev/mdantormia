"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Download,
  Eye,
  RefreshCw,
  AlertCircle,
  FileCheck,
  ArrowLeft,
  Sparkles,
  Printer,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Code,
  FolderGit2,
  GraduationCap,
  Languages,
  User,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import CvTemplate from "@/app/components/CvTemplate/CvTemplate";
import { defaultCvData } from "@/lib/defaultCvData";

export default function ManageCvPage() {
  const [activeTab, setActiveTab] = useState("builder"); // 'builder' or 'upload'
  const [currentCv, setCurrentCv] = useState(null);
  const [downloadCount, setDownloadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewKey, setPreviewKey] = useState(Date.now());
  const [zoomScale, setZoomScale] = useState(85); // Preview zoom percentage

  // CV Builder Form State
  const [cvData, setCvData] = useState(defaultCvData);

  // Accordion section open/collapse states
  const [openSections, setOpenSections] = useState({
    personal: true,
    objective: true,
    experience: true,
    skills: true,
    projects: true,
    education: true,
    languages: true,
  });

  const fileInputRef = useRef(null);
  const cvPrintRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Fetch current CV info and download count
  const fetchCvData = async () => {
    try {
      setLoading(true);
      const [cvRes, statsRes] = await Promise.all([
        fetch("/api/cv"),
        fetch("/api/stats"),
      ]);

      const cvJson = await cvRes.json();
      if (cvJson.success && cvJson.data) {
        setCurrentCv(cvJson.data);
        if (cvJson.data.cvData) {
          setCvData(cvJson.data.cvData);
        }
      }

      const statsData = await statsRes.json();
      if (statsData.success) {
        setDownloadCount(statsData.cvDownloads || 0);
      }
    } catch (err) {
      console.error("Failed to fetch CV data:", err);
      toast.error("Failed to load CV data from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCvData();
  }, []);

  // Save structured CV template data to DB
  const handleSaveCvTemplate = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("CV template saved to database! 🎉");
        await fetchCvData();
      } else {
        toast.error(data.message || "Failed to save CV template");
      }
    } catch (err) {
      toast.error(err.message || "Network error while saving CV");
    } finally {
      setSaving(false);
    }
  };

  // Reset CV template to default
  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset the CV template to default values?")) {
      setCvData(defaultCvData);
      toast.info("Reset to default template. Click 'Save CV Changes' to persist.");
    }
  };

  // Print CV handler
  const handlePrint = () => {
    window.print();
  };

  // Personal info field updater
  const handlePersonalChange = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  // Skills field updater
  const handleSkillChange = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }));
  };

  // Experience handlers
  const handleAddExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: `exp-${Date.now()}`,
          role: "New Role",
          typeOrCompany: "Full-Time / Remote",
          description: "Key responsibilities and achievements.",
        },
      ],
    }));
  };

  const handleUpdateExperience = (index, field, value) => {
    setCvData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    });
  };

  const handleDeleteExperience = (index) => {
    setCvData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  // Project handlers
  const handleAddProject = () => {
    setCvData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: `proj-${Date.now()}`,
          name: "New Project",
          liveUrl: "",
          githubUrl: "",
          technologies: "React, Next.js, Node.js",
          highlights: ["Implemented core feature A", "Built scalable architecture B"],
        },
      ],
    }));
  };

  const handleUpdateProject = (index, field, value) => {
    setCvData((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleDeleteProject = (index) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleAddProjectHighlight = (projIndex) => {
    setCvData((prev) => {
      const updated = [...prev.projects];
      const highlights = updated[projIndex].highlights || [];
      updated[projIndex] = {
        ...updated[projIndex],
        highlights: [...highlights, "New key milestone / accomplishment"],
      };
      return { ...prev, projects: updated };
    });
  };

  const handleUpdateProjectHighlight = (projIndex, hIndex, value) => {
    setCvData((prev) => {
      const updated = [...prev.projects];
      const highlights = [...(updated[projIndex].highlights || [])];
      highlights[hIndex] = value;
      updated[projIndex] = { ...updated[projIndex], highlights };
      return { ...prev, projects: updated };
    });
  };

  const handleDeleteProjectHighlight = (projIndex, hIndex) => {
    setCvData((prev) => {
      const updated = [...prev.projects];
      const highlights = (updated[projIndex].highlights || []).filter((_, i) => i !== hIndex);
      updated[projIndex] = { ...updated[projIndex], highlights };
      return { ...prev, projects: updated };
    });
  };

  // Education handlers
  const handleAddEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `edu-${Date.now()}`,
          degree: "Degree / Diploma",
          institution: "University / Institute Name",
          year: "2020 - 2024",
        },
      ],
    }));
  };

  const handleUpdateEducation = (index, field, value) => {
    setCvData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const handleDeleteEducation = (index) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Languages handlers
  const handleAddLanguage = () => {
    setCvData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        { id: `lang-${Date.now()}`, name: "Language", proficiency: "Professional proficiency" },
      ],
    }));
  };

  const handleUpdateLanguage = (index, field, value) => {
    setCvData((prev) => {
      const updated = [...prev.languages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, languages: updated };
    });
  };

  const handleDeleteLanguage = (index) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  // Upload handler for static PDF
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF files (.pdf) are allowed ❌");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast.error("File size exceeds 15MB limit ❌");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    validateAndSetFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.warn("Please select a PDF file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("cvFile", selectedFile);

    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("CV uploaded and activated successfully! 🚀");
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        await fetchCvData();
        setPreviewKey(Date.now());
      } else {
        toast.error(data.message || "Failed to upload CV");
      }
    } catch (err) {
      toast.error(err.message || "Server connection error");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "Standard (PDF)";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Print Specific CSS to isolate only the CV sheet during window.print() */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 12mm;
          }
          html, body, main {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            height: auto !important;
          }
          /* Hide all surrounding admin headers, sidebars, buttons */
          header, nav, aside, footer, button, .no-print, [role="navigation"] {
            display: none !important;
          }
          /* Show only the CV paper */
          #printable-cv-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10 no-print">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <FileText className="text-indigo-400" size={24} />
              Interactive CV Builder & Management
            </h1>
            <p className="text-xs text-gray-400">
              Customize your CV template in real-time, print to A4 PDF, or upload an external PDF file.
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/cv"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all"
          >
            <ExternalLink size={14} />
            <span>Public CV Link</span>
          </Link>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-xs font-semibold transition-all shadow-sm"
          >
            <Printer size={14} />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={handleSaveCvTemplate}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            {saving ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Save CV Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 no-print">
        <button
          onClick={() => setActiveTab("builder")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "builder"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sparkles size={14} />
          <span>Interactive CV Builder & Template</span>
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "upload"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          }`}
        >
          <UploadCloud size={14} />
          <span>Direct PDF File Upload</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE CV BUILDER */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: EDITABLE FORM (7 Cols) */}
          <div className="lg:col-span-6 space-y-4 no-print">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                Edit CV Information
              </span>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-[11px] text-gray-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset to Default</span>
              </button>
            </div>

            {/* Accordion 1: Personal Info */}
            <div className="rounded-2xl bg-[#0b1120]/80 border border-white/10 overflow-hidden shadow-lg">
              <button
                type="button"
                onClick={() => toggleSection("personal")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <User size={16} className="text-indigo-400" />
                  <span>Personal & Contact Info</span>
                </div>
                {openSections.personal ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.personal && (
                <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.fullName || ""}
                        onChange={(e) => handlePersonalChange("fullName", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Md Antor Mia"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Title / Role
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.title || ""}
                        onChange={(e) => handlePersonalChange("title", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="MERN Stack Developer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.phone || ""}
                        onChange={(e) => handlePersonalChange("phone", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="+8801318964063"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={cvData.personalInfo.email || ""}
                        onChange={(e) => handlePersonalChange("email", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="mdantormia1779@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Location / City
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.location || ""}
                        onChange={(e) => handlePersonalChange("location", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Rangpur, Bangladesh"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        GitHub URL
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.github || ""}
                        onChange={(e) => handlePersonalChange("github", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        Portfolio URL
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.portfolio || ""}
                        onChange={(e) => handlePersonalChange("portfolio", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="https://mdantormia.vercel.app"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="text"
                        value={cvData.personalInfo.linkedin || ""}
                        onChange={(e) => handlePersonalChange("linkedin", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Career Objective */}
            <div className="rounded-2xl bg-[#0b1120]/80 border border-white/10 overflow-hidden shadow-lg">
              <button
                type="button"
                onClick={() => toggleSection("objective")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <FileText size={16} className="text-indigo-400" />
                  <span>Career Objective</span>
                </div>
                {openSections.objective ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.objective && (
                <div className="p-4 pt-0 space-y-2 border-t border-white/5">
                  <label className="text-[11px] font-semibold text-gray-300 block">
                    Summary / Objective Statement
                  </label>
                  <textarea
                    rows={3}
                    value={cvData.objective || ""}
                    onChange={(e) => setCvData((prev) => ({ ...prev, objective: e.target.value }))}
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                    placeholder="Enter your professional summary or objective..."
                  />
                </div>
              )}
            </div>

            {/* Accordion 3: Professional Experience */}
            <div className="rounded-2xl bg-[#0b1120]/80 border border-white/10 overflow-hidden shadow-lg">
              <button
                type="button"
                onClick={() => toggleSection("experience")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <Briefcase size={16} className="text-indigo-400" />
                  <span>Professional Experience ({cvData.experiences?.length || 0})</span>
                </div>
                {openSections.experience ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.experience && (
                <div className="p-4 pt-0 space-y-4 border-t border-white/5">
                  {cvData.experiences?.map((exp, idx) => (
                    <div key={exp.id || idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-400 uppercase">
                          Experience #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteExperience(idx)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove Experience"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <input
                            type="text"
                            value={exp.role || ""}
                            onChange={(e) => handleUpdateExperience(idx, "role", e.target.value)}
                            placeholder="Job Title / Role"
                            className="w-full px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={exp.typeOrCompany || ""}
                            onChange={(e) => handleUpdateExperience(idx, "typeOrCompany", e.target.value)}
                            placeholder="Company or Type (e.g. 2-Month Internship)"
                            className="w-full px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        value={exp.description || ""}
                        onChange={(e) => handleUpdateExperience(idx, "description", e.target.value)}
                        placeholder="Responsibilities and achievements description..."
                        className="w-full px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="w-full py-2 border border-dashed border-indigo-500/30 hover:border-indigo-500/60 rounded-xl text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-indigo-500/5 hover:bg-indigo-500/10"
                  >
                    <Plus size={14} />
                    <span>Add New Experience</span>
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 4: Technical Skills */}
            <div className="rounded-2xl bg-[#0b1120]/80 border border-white/10 overflow-hidden shadow-lg">
              <button
                type="button"
                onClick={() => toggleSection("skills")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <Code size={16} className="text-indigo-400" />
                  <span>Technical Skills</span>
                </div>
                {openSections.skills ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.skills && (
                <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                      Frontend Skills
                    </label>
                    <textarea
                      rows={2}
                      value={cvData.skills?.frontend || ""}
                      onChange={(e) => handleSkillChange("frontend", e.target.value)}
                      placeholder="React.js, Next.js, Tailwind CSS, TypeScript, etc."
                      className="w-full px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                      Backend Skills
                    </label>
                    <textarea
                      rows={2}
                      value={cvData.skills?.backend || ""}
                      onChange={(e) => handleSkillChange("backend", e.target.value)}
                      placeholder="Node.js, Express.js, MongoDB, PostgreSQL, Prisma, etc."
                      className="w-full px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                      Programming Languages
                    </label>
                    <input
                      type="text"
                      value={cvData.skills?.programming || ""}
                      onChange={(e) => handleSkillChange("programming", e.target.value)}
                      placeholder="JavaScript, TypeScript, Python"
                      className="w-full px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                      Tools & Platforms
                    </label>
                    <input
                      type="text"
                      value={cvData.skills?.tools || ""}
                      onChange={(e) => handleSkillChange("tools", e.target.value)}
                      placeholder="Git, GitHub, VS Code, Responsive Design"
                      className="w-full px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 5: Projects */}
            <div className="rounded-2xl bg-[#0b1120]/80 border border-white/10 overflow-hidden shadow-lg">
              <button
                type="button"
                onClick={() => toggleSection("projects")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <FolderGit2 size={16} className="text-indigo-400" />
                  <span>Key Projects ({cvData.projects?.length || 0})</span>
                </div>
                {openSections.projects ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {openSections.projects && (
                <div className="p-4 pt-0 space-y-4 border-t border-white/5">
                  {cvData.projects?.map((proj, idx) => (
                    <div key={proj.id || idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-400 uppercase">
                          Project #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(idx)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove Project"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-1">
                          <label className="text-[10px] text-gray-400 block mb-0.5">Project Title</label>
                          <input
                            type="text"
                            value={proj.name || ""}
                            onChange={(e) => handleUpdateProject(idx, "name", e.target.value)}
                            placeholder="Project Name"
                            className="w-full px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-0.5">Live Demo URL</label>
                          <input
                            type="text"
                            value={proj.liveUrl || ""}
                            onChange={(e) => handleUpdateProject(idx, "liveUrl", e.target.value)}
                            placeholder="https://..."
                            className="w-full px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 block mb-0.5">GitHub / Source URL</label>
                          <input
                            type="text"
                            value={proj.githubUrl || ""}
                            onChange={(e) => handleUpdateProject(idx, "githubUrl", e.target.value)}
                            placeholder="https://github.com/..."
                            className="w-full px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-gray-400 block mb-0.5">Technologies Used</label>
                        <input
                          type="text"
                          value={proj.technologies || ""}
                          onChange={(e) => handleUpdateProject(idx, "technologies", e.target.value)}
                          placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL..."
                          className="w-full px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      {/* Bullet Highlights */}
                      <div className="space-y-1.5 pt-1">
                        <label className="text-[10px] text-gray-400 font-semibold block">
                          Key Features / Accomplishment Bullet Points:
                        </label>
                        {proj.highlights?.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-1.5">
                            <span className="text-gray-500 text-xs">•</span>
                            <input
                              type="text"
                              value={highlight}
                              onChange={(e) => handleUpdateProjectHighlight(idx, hIdx, e.target.value)}
                              placeholder="Key bullet point description..."
                              className="flex-1 px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteProjectHighlight(idx, hIdx)}
                              className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => handleAddProjectHighlight(idx)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1 font-medium"
                        >
                          <Plus size={11} />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddProject}
                    className="w-full py-2 border border-dashed border-indigo-500/30 hover:border-indigo-500/60 rounded-xl text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all bg-indigo-500/5 hover:bg-indigo-500/10"
                  >
                    <Plus size={14} />
                    <span>Add New Project</span>
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 6: Education & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education */}
              <div className="rounded-2xl bg-[#0b1120]/80 border border-white/10 p-4 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <GraduationCap size={15} className="text-indigo-400" />
                    <span>Education</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <Plus size={11} /> Add
                  </button>
                </div>

                {cvData.education?.map((edu, idx) => (
                  <div key={edu.id || idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={edu.degree || ""}
                        onChange={(e) => handleUpdateEducation(idx, "degree", e.target.value)}
                        placeholder="Degree / Certificate"
                        className="w-full px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteEducation(idx)}
                        className="ml-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={edu.institution || ""}
                      onChange={(e) => handleUpdateEducation(idx, "institution", e.target.value)}
                      placeholder="School / College / Institute"
                      className="w-full px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="rounded-2xl bg-[#0b1120]/80 border border-white/10 p-4 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Languages size={15} className="text-indigo-400" />
                    <span>Languages</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <Plus size={11} /> Add
                  </button>
                </div>

                {cvData.languages?.map((lang, idx) => (
                  <div key={lang.id || idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={lang.name || ""}
                      onChange={(e) => handleUpdateLanguage(idx, "name", e.target.value)}
                      placeholder="e.g. English"
                      className="w-1/2 px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      value={lang.proficiency || ""}
                      onChange={(e) => handleUpdateLanguage(idx, "proficiency", e.target.value)}
                      placeholder="e.g. Fluent"
                      className="w-1/2 px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteLanguage(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIVE A4 PREVIEW (6 Cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-20 space-y-3">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#0b1120]/80 border border-white/10 shadow-lg no-print">
              <div className="flex items-center gap-2">
                <Eye size={15} className="text-indigo-400" />
                <span className="text-xs font-bold text-white">Live A4 CV Preview</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Real-time
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.max(60, z - 10))}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={13} />
                </button>
                <span className="text-[11px] font-mono text-gray-300 w-9 text-center">
                  {zoomScale}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((z) => Math.min(110, z + 10))}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={13} />
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-[11px] font-bold transition-all shadow-md ml-2"
                >
                  <Printer size={12} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* A4 Sheet Container */}
            <div className="overflow-auto max-h-[82vh] p-4 rounded-2xl bg-gray-950/70 border border-white/10 flex justify-center shadow-inner">
              <div
                style={{
                  transform: `scale(${zoomScale / 100})`,
                  transformOrigin: "top center",
                  marginBottom: `calc((100% - ${zoomScale}%) * -2.5)`,
                }}
                className="transition-transform duration-150"
              >
                <CvTemplate data={cvData} printableRef={cvPrintRef} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIRECT PDF FILE UPLOAD */}
      {activeTab === "upload" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
          {/* Left Column: Current Active CV Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                  Active CV Details
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 size={12} /> Active on Site
                </span>
              </div>

              {/* File Icon & Info */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 shadow-md shadow-red-500/10">
                  <FileText size={32} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate" title={currentCv?.fileName}>
                    {currentCv?.fileName || "Antor_CV.pdf"}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                    <span>{formatFileSize(currentCv?.fileSize)}</span>
                    <span>•</span>
                    <span>PDF Document</span>
                  </div>
                  {currentCv?.uploadedAt && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      Uploaded: {new Date(currentCv.uploadedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Total Downloads Counter */}
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-indigo-300 font-medium">Total CV Downloads</p>
                  <p className="text-2xl font-black text-white mt-0.5">{downloadCount.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/30">
                  <Download size={20} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="/api/cv/download"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-500/20 hover:scale-[1.02]"
                >
                  <Download size={14} />
                  <span>Download CV</span>
                </a>

                <a
                  href={`/api/cv/preview?v=${previewKey}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs transition-all hover:scale-[1.02]"
                >
                  <Eye size={14} />
                  <span>Open in Tab</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Upload Box (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleUpload}
              className="p-6 rounded-3xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-6 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-400">
                    Upload New CV / Resume
                  </span>
                  <span className="text-[11px] text-indigo-400 font-medium flex items-center gap-1">
                    <Sparkles size={12} /> Replaces live CV immediately
                  </span>
                </div>

                {/* Drag and Drop Box */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] ${
                    dragActive
                      ? "border-indigo-400 bg-indigo-500/10 scale-[0.99]"
                      : selectedFile
                      ? "border-emerald-500/50 bg-emerald-500/[0.04]"
                      : "border-white/15 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.04]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <FileCheck size={36} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white max-w-xs truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-emerald-400 mt-0.5">
                          {formatFileSize(selectedFile.size)} • Ready to upload
                        </p>
                      </div>
                      <span className="text-[11px] text-gray-400 underline mt-2 hover:text-white">
                        Click to choose a different file
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <UploadCloud size={36} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Click to browse or drag & drop your PDF
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Accepts only PDF format (.pdf) up to 15MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Information Note */}
                <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200/90 leading-relaxed">
                    Uploading a new PDF replaces the file downloaded by visitors from both the <strong>Navbar Header</strong> and the <strong>Hero Banner</strong>.
                  </p>
                </div>
              </div>

              {/* Submit Upload Button */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={!selectedFile || uploading}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all duration-200 shadow-lg ${
                    !selectedFile || uploading
                      ? "bg-white/10 text-gray-500 cursor-not-allowed border border-white/5"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/25 hover:scale-[1.02]"
                  }`}
                >
                  {uploading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Uploading & Activating...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      <span>Upload & Activate CV</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
