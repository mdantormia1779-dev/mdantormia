"use client";

import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

const DeleteProjectModal = ({
  isOpen,
  onClose,
  onConfirm,
  project,
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#0b1120] border border-red-500/20 p-6 sm:p-8 rounded-3xl w-full max-w-md relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
        >
          <X size={20} />
        </button>

        {/* Danger Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
            <AlertTriangle className="text-red-400" size={32} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-white mb-2">
          Delete Project
        </h2>

        {/* Message */}
        <p className="text-gray-400 text-center mb-6 text-xs sm:text-sm leading-relaxed">
          Are you sure you want to permanently remove{" "}
          <span className="text-white font-semibold underline decoration-red-500/50">
            {project.name}
          </span>
          ? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/20"
          >
            <Trash2 size={14} /> Delete Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;