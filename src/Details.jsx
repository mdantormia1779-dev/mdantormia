import React from 'react';
import Skill from './Header/Body/Skill';
import { motion } from 'framer-motion';

function Details() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-5 bg-gray-900 text-white">
      
      {/* Left Side: Profile & Skills */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-6"
      >
        {/* Profile Image */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left ml-0 md:ml-12">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg mb-2">
            <img
              src="/mdantormia/antor.png"
              alt="Md Antor Mia"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-2">
            Md Antor Mia
          </h1>
        </div>

        {/* Skills Icons */}
        <div className="flex flex-wrap gap-4 ml-0 md:ml-12">
          <Skill />
        </div>
      </motion.div>

      {/* Right Side: About & Info */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-1/2 space-y-6"
      >
        <div>
          <h1 className="text-4xl font-bold">About Me</h1>
          <h2 className="text-2xl text-gray-400 mt-2">Developer & Web Enthusiast</h2>
        </div>

        <p className="text-lg leading-relaxed text-gray-300">
          Hi, I am a passionate front-end developer specializing in building modern, responsive web applications using <span className="text-white font-semibold">HTML, CSS, Tailwind CSS, JavaScript, React, Framer Motion</span>, and <span className="text-white font-semibold">Shadcn UI</span>. I craft smooth user experiences with clean, maintainable code and pixel-perfect designs.
        </p>

        {/* Availability */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-4 text-sm font-medium text-green-400"
        >
          <div className="bg-gray-800 px-4 py-2 rounded-full">✅ Available for Freelance</div>
          <div className="bg-gray-800 px-4 py-2 rounded-full">🌍 Remote Work</div>
        </motion.div>

        {/* Experience Boxes */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6"
        >
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center hover:bg-gray-700 transition">
            <p className="text-3xl font-bold text-white">2+</p>
            <p className="text-sm text-gray-400">Years of Experience</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center hover:bg-gray-700 transition">
            <p className="text-3xl font-bold text-white">3+</p>
            <p className="text-sm text-gray-400">Projects Completed</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center hover:bg-gray-700 transition">
            <p className="text-3xl font-bold text-white">∞</p>
            <p className="text-sm text-gray-400">Learning Every Day</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Details;
