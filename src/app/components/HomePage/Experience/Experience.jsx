"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

const Experience = () => {
  return (
    <section className="p-4 md:p-8 lg:p-0container mx-auto py-16 text-white">

      {/* Title */}
      <div className="flex items-center gap-3 mb-12">
        <div className="p-3 bg-purple-500/10 rounded-xl">
          <FaBriefcase className="text-2xl text-purple-400" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold">
          Professional <span className="text-purple-500">Experience</span>
        </h2>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/50 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 md:p-8 shadow-lg"
      >
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-purple-400">
            MERN Stack Developer Intern
          </h3>
          <p className="text-gray-300 mt-1">
            JEVXO Software Company (Remote)
          </p>
          <p className="text-sm text-gray-400">
            Rajshahi Hi-Tech Park, Rajshahi, Bangladesh
          </p>
          <span className="inline-block mt-2 text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">
            Duration: 2 Months
          </span>
        </div>

        {/* Responsibilities */}
        <ul className="space-y-3 text-gray-300 text-sm md:text-base">
          <li>✅ Completed structured training in modern full stack technologies following company roadmap</li>
          <li>✅ Gained hands-on experience with TypeScript, Redux Toolkit, React Hook Form, Yup, Mongoose, Prisma ORM, and shadcn/ui</li>
          <li>✅ Built and maintained responsive UI using React.js, Next.js, and Tailwind CSS</li>
          <li>✅ Developed and integrated REST APIs using Node.js and Express.js</li>
          <li>✅ Worked with MongoDB (Mongoose) and explored SQL using Prisma ORM</li>
          <li>✅ Implemented form handling and validation using React Hook Form and Yup</li>
          <li>✅ Managed application state using Redux Toolkit</li>
          <li>✅ Collaborated in team environment, participated in code reviews and planning</li>
          <li>✅ Practiced Git workflow (branching, commits, pull requests)</li>
          <li>✅ Improved debugging, problem-solving, and real-world development skills</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default Experience;