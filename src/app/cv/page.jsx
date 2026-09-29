"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, Sparkles, RefreshCw } from "lucide-react";
import CvTemplate from "@/app/components/CvTemplate/CvTemplate";
import { defaultCvData } from "@/lib/defaultCvData";
import { printCvDocument } from "@/lib/printCv";

export default function PublicCvPage() {
  const [cvData, setCvData] = useState(defaultCvData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCv() {
      try {
        const res = await fetch("/api/cv");
        const json = await res.json();
        if (json.success && json.data?.cvData) {
          setCvData(json.data.cvData);
        }
      } catch (err) {
        console.error("Failed to load CV data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCv();
  }, []);

  const handlePrint = () => {
    printCvDocument(cvData);
  };

  return (
    <div className="min-h-screen bg-[#030712] py-8 sm:py-12 px-4 sm:px-6 relative">
      {/* Top Action Bar (Hidden during printing) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b1120]/80 backdrop-blur-xl border border-white/10 shadow-2xl no-print">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="/api/cv/download"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all"
          >
            <Download size={14} />
            <span>Download Original PDF</span>
          </a>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/25 hover:scale-[1.02]"
          >
            <Printer size={14} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main CV Document Area */}
      <div className="max-w-4xl mx-auto flex justify-center pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-400 gap-3">
            <RefreshCw size={24} className="animate-spin text-indigo-400" />
            <p className="text-xs">Loading CV document...</p>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <CvTemplate data={cvData} />
          </div>
        )}
      </div>
    </div>
  );
}
