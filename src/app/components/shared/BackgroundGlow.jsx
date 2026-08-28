"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const BackgroundGlow = () => {
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);

  useEffect(() => {
    // Subtle GSAP floating mesh background animation
    const ctx = gsap.context(() => {
      gsap.to(orb1.current, {
        x: 60,
        y: 40,
        scale: 1.15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2.current, {
        x: -50,
        y: -30,
        scale: 1.2,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      gsap.to(orb3.current, {
        x: 40,
        y: -40,
        scale: 1.1,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-grid-pattern">
      {/* Orb 1: Indigo */}
      <div
        ref={orb1}
        className="absolute -top-32 -left-32 w-96 h-96 md:w-[550px] md:h-[550px] bg-indigo-600/15 rounded-full blur-[140px]"
      />

      {/* Orb 2: Cyan */}
      <div
        ref={orb2}
        className="absolute top-1/3 -right-32 w-96 h-96 md:w-[500px] md:h-[500px] bg-cyan-500/15 rounded-full blur-[130px]"
      />

      {/* Orb 3: Purple */}
      <div
        ref={orb3}
        className="absolute -bottom-32 left-1/4 w-96 h-96 md:w-[600px] md:h-[600px] bg-purple-600/15 rounded-full blur-[150px]"
      />
    </div>
  );
};

export default BackgroundGlow;
