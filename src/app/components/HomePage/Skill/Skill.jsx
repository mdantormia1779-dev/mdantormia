"use client";

import React from "react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNode,
  FaReact,
  FaCheckCircle
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiBetterauth,
  SiExpress,
  SiFigma,
  SiMongodb,
  SiTailwindcss,
  SiRedux,
  SiTypescript,
  SiPrisma,
  SiReacthookform,
  SiShadcnui,
  SiDaisyui,
  SiMysql,
  SiPython
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { MdVerified } from "react-icons/md";
import { motion } from "framer-motion";
import Education from "../Education/Education";

// 🎨 Color system
const colors = {
  blue: "text-blue-400 border-blue-500/20",
  green: "text-green-400 border-green-500/20",
  pink: "text-pink-400 border-pink-500/20",
  purple: "text-purple-400 border-purple-500/20",
  yellow: "text-yellow-400 border-yellow-500/20",
};

const Skill = () => {
  return (
    <div className="p-4 md:p-8">
      <section className="container mx-auto py-12 text-white border-b border-white/10">

        {/* Title */}
        <div className="flex items-center justify-center md:justify-start gap-3 mb-12">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <IoSettings className="text-3xl text-blue-400 animate-spin-slow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            My <span className="text-blue-500">Skills</span>
          </h1>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Frontend */}
          <SkillCard title="Frontend" color="blue">
            <SkillItem icon={<FaHtml5 className="text-orange-500 icon" />} name="HTML" />
            <SkillItem icon={<FaCss3Alt className="text-blue-500 icon" />} name="CSS" />
            <SkillItem icon={<FaJs className="text-yellow-400 icon" />} name="JavaScript" />
            <SkillItem icon={<FaReact className="text-cyan-400 icon" />} name="React.js" />
            <SkillItem icon={<RiNextjsFill className="icon" />} name="Next.js" />
            <SkillItem icon={<SiTailwindcss className="text-sky-400 icon" />} name="Tailwind CSS" />
          </SkillCard>

          {/* Backend */}
          <SkillCard title="Backend" color="green">
            <SkillItem icon={<FaNode className="text-green-400 icon" />} name="Node.js" />
            <SkillItem icon={<SiExpress className="icon" />} name="Express.js" />
            <SkillItem icon={<SiBetterauth className="text-indigo-400 icon" />} name="Better Auth" />
          </SkillCard>

          {/* Database */}
          <SkillCard title="Database & Auth" color="purple">
            <SkillItem icon={<SiMongodb className="text-green-500 icon" />} name="MongoDB" />
            <SkillItem icon={<SiPrisma className="text-blue-400 icon" />} name="Prisma ORM" />
            <SkillItem icon={<SiMysql className="text-blue-500 icon" />} name="SQL" />
          </SkillCard>

          {/* State */}
          <SkillCard title="State & Validation" color="yellow">
            <SkillItem icon={<SiRedux className="text-purple-500 icon" />} name="Redux Toolkit" />
            <SkillItem icon={<SiReacthookform className="text-pink-500 icon" />} name="React Hook Form" />
            <SkillItem icon={<MdVerified className="text-green-400 icon" />} name="Yup Validation" />
          </SkillCard>

          {/* Tools */}
          <SkillCard title="Tools" color="pink">
            <SkillItem icon={<FaGitAlt className="text-orange-600 icon" />} name="Git & GitHub" />
            <SkillItem icon={<VscVscode className="text-blue-500 icon" />} name="VS Code" />
            <SkillItem icon={<SiFigma className="text-pink-500 icon" />} name="Figma" />
          </SkillCard>

          {/* Languages */}
          <SkillCard title="Languages" color="blue">
            <SkillItem icon={<FaJs className="text-yellow-400 icon" />} name="JavaScript" />
            <SkillItem icon={<SiTypescript className="text-blue-500 icon" />} name="TypeScript" />
            <SkillItem icon={<SiPython className="text-yellow-300 icon" />} name="Python" />
          </SkillCard>

        </div>

        <div className="mt-12">
          <Education />
        </div>
      </section>
    </div>
  );
};

// 🔥 Card
const SkillCard = ({ title, color, children }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`bg-gray-900/50 backdrop-blur-md border rounded-2xl p-6 shadow-lg transition ${colors[color]}`}
  >
    <h2 className={`text-xl font-bold mb-5 ${colors[color]}`}>
      {title}
    </h2>
    <div className="space-y-3">{children}</div>
  </motion.div>
);

// ✨ Item
const SkillItem = ({ icon, name }) => (
  <div className="flex items-center gap-3 hover:translate-x-1 transition">
    {icon}
    <span className="text-sm font-medium text-gray-300">{name}</span>
  </div>
);

export default Skill;