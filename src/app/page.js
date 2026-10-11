"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Banner from "./components/HomePage/Banner/Banner";
import About from "./components/HomePage/About/About";
import Skill from "./components/HomePage/Skill/Skill";
import Project from "./components/Project/Project";
import Experience from "./components/HomePage/Experience/Experience";

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1.0] 
    }
  }
};

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="overflow-hidden bg-[#07192d] text-white space-y-12 md:space-y-20">
      {/* 1. Banner Section (Using animate instead of whileInView to prevent initial load shift) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Banner />
      </motion.div>

      {/* 2. About Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <About />
      </motion.section>

      {/* 3. Skill Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Skill />
      </motion.section>

      {/* 4. Experience Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Experience />
      </motion.section>

      {/* 5. Project Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <Project />
      </motion.section>
    </div>
  );
}