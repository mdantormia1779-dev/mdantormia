import React from 'react'
import { motion } from "framer-motion"

function Skill() {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-4 mt-6 justify-center md:justify-start"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {[
        { src: "html5.svg", alt: "HTML", bg: "from-orange-500 to-red-500" },
        { src: "css.svg", alt: "CSS", bg: "from-blue-500 to-blue-700" },
        { src: "javascript.svg", alt: "JavaScript", bg: "from-yellow-400 to-yellow-500" },
        { src: "tailwindcss.svg", alt: "Tailwind CSS", bg: "from-cyan-400 to-blue-500" },
        { src: "react.svg", alt: "React", bg: "from-sky-400 to-indigo-500" },
        { src: "github.svg", alt: "GitHub", bg: "from-white to-gray-800" }
      ].map((tech, index) => (
        <div
          key={index}
          className={`
            w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${tech.bg} 
            flex items-center justify-center shadow-lg
            transition-transform duration-300
            hover:scale-110 cursor-pointer
            touch-none
          `}
        >
          <img src={tech.src} alt={tech.alt} className="w-6 h-6 md:w-8 md:h-8 drop-shadow" />
        </div>
      ))}
    </motion.div>
  )
}

export default Skill;
