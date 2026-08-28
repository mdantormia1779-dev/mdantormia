"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";
import gsap from "gsap";

const NotFound = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".not-found-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
      });

      gsap.to(".badge-404", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] flex items-center justify-center text-white px-4 py-20 relative"
    >
      <div className="text-center max-w-lg mx-auto space-y-6">
        
        {/* BIG 404 BADGE */}
        <div className="badge-404 relative inline-block">
          <h1 className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(99,102,241,0.3)]">
            404
          </h1>
        </div>

        {/* TITLE */}
        <h2 className="not-found-item text-2xl sm:text-3xl font-extrabold text-white">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="not-found-item text-gray-400 text-sm sm:text-base leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* BUTTON */}
        <div className="not-found-item pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <FaHome /> Go Back Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;