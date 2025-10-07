import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Skill from './Skill';
import Connect from './Connect';
import Modal from '../../Modal';
import ContactModal from '../../ContactModal';

// ✅ Resume ডাউনলোড ফাংশন
const handleDownload = () => {
  const pdfUrl = 'resume.pdf';
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'resumemdantormia.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ✅ Framer Motion ভ্যারিয়েন্ট
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // ✅ মোবাইল চেক
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className=' bg-black mt-15  flex flex-col w-screen lg:flex-row fixed left-0' // ✅ responsive flex
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* বাঁ পাশে */}
      <div
        className=' lg:w-8/4 h-auto  lg:h-[560px] bg-[#D7D7D7] flex flex-col justify-center text-black px-6 py-10 lg:px-10 '
        style={{
          clipPath: isMobile ? 'none' : 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
        }}
      >
        <motion.div className="text-left md:ml-1  lg:mr-10" variants={container}>
          <motion.h1 className='text-base lg:text-xl text-gray-700 mb-1' variants={item}>
            Hi, I am
          </motion.h1>

          <motion.h2 className='text-3xl md:text-5xl font-bold mb-2' variants={item}>
            Md Antor Mia
          </motion.h2>

          <motion.h4 className='text-lg md:text-2xl font-semibold text-gray-800 mb-4' variants={item}>
            Front-End Developer
          </motion.h4>

          {/* স্কিল */}
          <motion.div variants={item}>
            <Skill />
          </motion.div>

          {/* বাটন */}
          <motion.div className='mt-10 flex flex-col sm:flex-row gap-4' variants={item}>
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-2 bg-white text-black font-semibold rounded-full shadow-md transition-all duration-300"
            >
              Resume
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-md transition-all duration-300 inline-block text-center"
            >
              <ContactModal Name='Contact' />
            </motion.div>
          </motion.div>

          {/* কানেক্ট */}
          <motion.div className="mt-10 flex justify-center md:justify-start flex-wrap gap-4 " variants={item}>
            <Connect />
          </motion.div>
        </motion.div>
      </div>

      {/* ডান পাশে */}
      <motion.div
        className=' h-auto md:h-[560px]  bg-black text-white flex flex-col justify-center px-6 py-10 md:px-10 md:ml-10'
        variants={container}
      >
        <motion.h3 className='text-2xl md:text-3xl font-semibold mb-2' variants={item}>
          Front-End Developer
        </motion.h3>

        <motion.p className='text-gray-300 mb-4 text-sm md:text-base ' variants={item}>
          As a front-end developer, I specialize in responsive web design and interactive UI development using technologies like HTML, CSS, JavaScript, React, and Tailwind CSS. I focus on mobile-first layouts, engaging animations, and performance-optimized interfaces that enhance user engagement.
        </motion.p>

        {/* টেক স্ট্যাক */}
        <motion.div className='flex flex-wrap gap-2 md:gap-3 mb-6' variants={item}>
          {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'].map((tech, index) => (
            <span
              key={index}
              className='bg-white text-black px-3 py-1 rounded text-sm font-medium'
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Project Modal */}
        <motion.div className='w-max bg-white text-black px-3 py-1 rounded text-sm font-medium' variants={item}>
          <Modal Name='View Project' />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
