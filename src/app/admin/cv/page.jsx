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
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ManageCvPage() {
  const [currentCv, setCurrentCv] = useState(null);
  const [downloadCount, setDownloadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewKey, setPreviewKey] = useState(Date.now());
  const fileInputRef = useRef(null);

  // Fetch current CV info and download count
  const fetchCvData = async () => {
    try {
      setLoading(true);
      const [cvRes, statsRes] = await Promise.all([
        fetch("/api/cv"),
        fetch("/api/stats"),
      ]);

      const cvData = await cvRes.json();
      if (cvData.success && cvData.data) {
        setCurrentCv(cvData.data);
      }

      const statsData = await statsRes.json();
      if (statsData.success) {
        setDownloadCount(statsData.cvDownloads || 0);
      }
    } catch (err) {
      console.error("Failed to fetch CV data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCvData();
  }, []);

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
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
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
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <FileText className="text-indigo-400" size={24} />
              Manage & Upload CV
            </h1>
            <p className="text-xs text-gray-400">
              Upload a new CV/Resume PDF to update the download link across the website.
            </p>
          </div>
        </div>

        <button
          onClick={fetchCvData}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-medium transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-indigo-400" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Grid: Current Status & Upload Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                href={`/antor.pdf?v=${previewKey}`}
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

      {/* Live PDF Preview section */}
      <div className="p-6 rounded-3xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye size={18} className="text-indigo-400" />
            <h2 className="text-sm font-bold text-white">Live CV Document Preview</h2>
          </div>
          <span className="text-[11px] text-gray-400">
            Preview of active /antor.pdf
          </span>
        </div>

        <div className="w-full h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-gray-900/60 flex items-center justify-center">
          <iframe
            key={previewKey}
            src={`/antor.pdf?v=${previewKey}#toolbar=0`}
            className="w-full h-full border-0 rounded-2xl"
            title="CV Document Preview"
          />
        </div>
      </div>
    </div>
  );
}
