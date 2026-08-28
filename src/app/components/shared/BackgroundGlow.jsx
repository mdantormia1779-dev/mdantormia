"use client";

import React from "react";

const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-grid-pattern">
      {/* Top Left Glow: Indigo */}
      <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[100px] transform-gpu will-change-transform" />

      {/* Middle Right Glow: Cyan */}
      <div className="absolute top-1/4 -right-24 w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] transform-gpu will-change-transform" />

      {/* Bottom Center Glow: Purple */}
      <div className="absolute -bottom-24 left-1/3 w-72 h-72 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] bg-purple-600/10 rounded-full blur-[90px] sm:blur-[110px] transform-gpu will-change-transform" />
    </div>
  );
};

export default BackgroundGlow;
